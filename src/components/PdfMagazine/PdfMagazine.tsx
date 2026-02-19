'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'

type PdfJsModule = typeof import('pdfjs-dist')
type PdfDocumentProxy = import('pdfjs-dist').PDFDocumentProxy

type PdfMagazineProps = {
  /** Public URL, e.g. `/pdfs/new-products/latest.pdf` */
  src: string
  title?: string
  initialPage?: number
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect
      if (!cr) return
      setSize({ width: cr.width, height: cr.height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return { ref, size }
}

async function loadPdfJs(): Promise<PdfJsModule> {
  const pdfjs = await import('pdfjs-dist')
  // pdf.worker for Vite/Next ESM build
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
  ).toString()
  return pdfjs
}

function PdfCanvas(props: {
  pdf: PdfDocumentProxy | null
  pdfjs: PdfJsModule | null
  page: number
  cssWidth: number
  zoom: number
  className?: string
  onRendered?: () => void
  onCanvas?: (canvas: HTMLCanvasElement | null) => void
  renderBoost?: number
}) {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const [isRendering, setIsRendering] = useState(false)
  const renderTaskRef = useRef<{ cancel?: () => void; promise?: Promise<unknown> } | null>(null)

  useEffect(() => {
    if (!props.pdf || !props.pdfjs || !ref.current) return
    if (!props.cssWidth) return
    let cancelled = false
    // Cancel previous render ASAP (important when navigating away / switching pages).
    try {
      renderTaskRef.current?.cancel?.()
    } catch {
      // ignore
    }
    setIsRendering(true)
    ;(async () => {
      try {
        const pageObj = await props.pdf!.getPage(props.page)
        if (cancelled) return

        const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
        const boost = Math.max(1, Math.min(3, Number(props.renderBoost ?? 1)))
        const viewport1 = pageObj.getViewport({ scale: 1 })
        const targetCssWidth = props.cssWidth * props.zoom
        const scale = (targetCssWidth * dpr * boost) / viewport1.width
        const viewport = pageObj.getViewport({ scale })

        const ctx = ref.current!.getContext('2d', { alpha: false })
        if (!ctx) return

        ref.current!.width = Math.floor(viewport.width)
        ref.current!.height = Math.floor(viewport.height)
        ref.current!.style.width = `${Math.floor(targetCssWidth)}px`
        ref.current!.style.height = `${Math.floor((viewport.height / viewport.width) * targetCssWidth)}px`

        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.clearRect(0, 0, ref.current!.width, ref.current!.height)

        const task = pageObj.render({ canvasContext: ctx, viewport })
        renderTaskRef.current = task
        await task.promise
        if (cancelled) return
        setIsRendering(false)
        props.onRendered?.()
      } catch (e: unknown) {
        // pdf.js throws on cancel; ignore cancels.
        const msg = String((e as Error)?.message || e || '')
        if (cancelled) return
        if (msg.toLowerCase().includes('cancel')) {
          return
        }
        setIsRendering(false)
      }
    })()
      .then(() => {
        if (cancelled) return
      })
      .catch(() => {
        // handled in async block
      })
    return () => {
      cancelled = true
      try {
        renderTaskRef.current?.cancel?.()
      } catch {
        // ignore
      }
    }
  }, [props.pdf, props.pdfjs, props.page, props.cssWidth, props.zoom, props.renderBoost])

  return (
    <div className={`pdf-mag__canvasWrap ${props.className ?? ''}`}>
      <canvas
        ref={(el) => {
          ref.current = el
          props.onCanvas?.(el)
        }}
        className="pdf-mag__canvas"
      />
      {isRendering && <div className="pdf-mag__canvasLoading">Рендер…</div>}
    </div>
  )
}

export function PdfMagazine({ src, title = 'Журнал новинок', initialPage = 1 }: PdfMagazineProps) {
  const { ref: containerRef, size } = useElementSize<HTMLDivElement>()
  const stageRef = useRef<HTMLDivElement | null>(null)
  const leftCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const rightCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const lensCanvasRef = useRef<HTMLCanvasElement | null>(null)

  const [pdfjs, setPdfjs] = useState<PdfJsModule | null>(null)
  const [pdf, setPdf] = useState<PdfDocumentProxy | null>(null)
  const [numPages, setNumPages] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [pageRatio, setPageRatio] = useState<number | null>(null) // height / width

  const [page, setPage] = useState(initialPage)
  const [zoom, setZoom] = useState(1)
  const [lensOn, setLensOn] = useState(false)
  const [lensVisible, setLensVisible] = useState(false)
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 })

  const LENS_RADIUS = 115
  const LENS_SCALE = 2.2
  const LENS_RENDER_BOOST = size.width < 560 ? 1.8 : 2.4
  const rafRef = useRef<number | null>(null)
  const lastPointerRef = useRef<{ clientX: number; clientY: number } | null>(null)

  const [isFullscreen, setIsFullscreen] = useState(false)
  useEffect(() => {
    const onFs = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onFs)
    return () => document.removeEventListener('fullscreenchange', onFs)
  }, [])

  // 2-page spread should appear on most desktop widths (as it was before).
  // Two-page spread is only safe when it fits. If user zooms in, switch to 1-page to avoid overlap.
  const canTwoPage = size.width >= 980 && zoom <= 1.001

  const leftPage = clamp(page, 1, Math.max(1, numPages))
  const rightPage = canTwoPage ? clamp(page + 1, 1, Math.max(1, numPages)) : null

  // Page width inside spread (leave room for padding + gap)
  const pageCssWidth = useMemo(() => {
    const w = size.width
    if (!w) return 0
    const inner = Math.max(320, w - 48)
    const widthLimited = canTwoPage ? Math.floor((inner - 18) / 2) : Math.floor(inner)
    // Keep it beautiful (big enough), but avoid absurdly huge pages on ultra-wide screens.
    const capped = canTwoPage ? Math.min(widthLimited, 720) : Math.min(widthLimited, w < 560 ? 420 : 1100)

    // Even in non-fullscreen, keep 100% zoom fitting into the fixed window height.
    if (pageRatio && size.height) {
      const h = Math.max(0, size.height - 24) // stage padding + breathing room
      const heightLimited = Math.floor(h / pageRatio)
      // When zoom === 1, this prevents a scrollbar just because the page is 1-2px taller.
      // For zoom > 1, we intentionally allow scrolling (handled by CSS class).
      if (zoom <= 1.001) return Math.max(220, Math.min(capped, heightLimited))
    }

    // In fullscreen, also limit by height so pages don't get cropped.
    if (isFullscreen && pageRatio && size.height) {
      const h = Math.max(0, size.height - 24) // stage padding + breathing room
      const heightLimited = Math.floor(h / pageRatio)
      return Math.max(220, Math.min(capped, heightLimited))
    }

    return capped
  }, [size.width, size.height, canTwoPage, isFullscreen, pageRatio, zoom])

  // If we switch into 2-page mode, align the left page to an odd number for nicer spreads.
  useEffect(() => {
    if (!canTwoPage) return
    setPage((p) => {
      const safe = clamp(p, 1, Math.max(1, numPages))
      if (safe <= 1) return safe
      return safe % 2 === 0 ? safe - 1 : safe
    })
  }, [canTwoPage, numPages])

  useEffect(() => {
    let cancelled = false
    setError(null)
    setPdf(null)
    setNumPages(0)
    setPageRatio(null)

    loadPdfJs()
      .then((m) => {
        if (cancelled) return
        setPdfjs(m)
        return m.getDocument({ url: src }).promise
      })
      .then((doc) => {
        if (!doc || cancelled) return
        setPdf(doc)
        setNumPages(doc.numPages)
        setPage((p) => clamp(p, 1, doc.numPages))
      })
      .catch((e) => {
        if (cancelled) return
        setError((e as Error)?.message || 'Не удалось загрузить PDF')
      })

    return () => {
      cancelled = true
    }
  }, [src])

  // Cache aspect ratio from the first page to fit by height in fullscreen.
  useEffect(() => {
    if (!pdf) return
    let cancelled = false
    pdf
      .getPage(1)
      .then((p) => {
        if (cancelled) return
        const vp = p.getViewport({ scale: 1 })
        const ratio = vp.width ? vp.height / vp.width : null
        if (ratio && Number.isFinite(ratio)) setPageRatio(ratio)
      })
      .catch(() => {
        // ignore
      })
    return () => {
      cancelled = true
    }
  }, [pdf])

  const canPrev = page > 1
  const canNext = page < numPages

  const step = canTwoPage ? 2 : 1
  const goPrev = () => setPage((p) => clamp(p - step, 1, Math.max(1, numPages)))
  const goNext = () => setPage((p) => clamp(p + step, 1, Math.max(1, numPages)))

  const toggleFullscreen = async () => {
    const el = containerRef.current
    if (!el) return
    if (!document.fullscreenElement) {
      await el.requestFullscreen().catch(() => {})
    } else {
      await document.exitFullscreen().catch(() => {})
    }
  }

  const updateLens = () => {
    rafRef.current = null
    if (!lensOn) return
    const stage = stageRef.current
    const lensCanvas = lensCanvasRef.current
    const last = lastPointerRef.current
    if (!stage || !lensCanvas || !last) return

    const stageRect = stage.getBoundingClientRect()
    const xRel = last.clientX - stageRect.left
    const yRel = last.clientY - stageRect.top

    // pick active canvas under pointer
    const left = leftCanvasRef.current
    const right = rightCanvasRef.current
    const pickCanvas = (c: HTMLCanvasElement | null) => {
      if (!c) return null
      const r = c.getBoundingClientRect()
      if (last.clientX >= r.left && last.clientX <= r.right && last.clientY >= r.top && last.clientY <= r.bottom) return c
      return null
    }
    const srcCanvas = pickCanvas(left) || pickCanvas(right)
    if (!srcCanvas) {
      setLensVisible(false)
      return
    }

    const srcRect = srcCanvas.getBoundingClientRect()
    const scaleX = srcCanvas.width / srcRect.width
    const scaleY = srcCanvas.height / srcRect.height
    const srcX = (last.clientX - srcRect.left) * scaleX
    const srcY = (last.clientY - srcRect.top) * scaleY

    // lens canvas setup
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
    const cssSize = LENS_RADIUS * 2
    lensCanvas.width = Math.floor(cssSize * dpr)
    lensCanvas.height = Math.floor(cssSize * dpr)
    lensCanvas.style.width = `${cssSize}px`
    lensCanvas.style.height = `${cssSize}px`

    const ctx = lensCanvas.getContext('2d')
    if (!ctx) return
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, lensCanvas.width, lensCanvas.height)

    // clip circle
    ctx.save()
    ctx.beginPath()
    ctx.arc(lensCanvas.width / 2, lensCanvas.height / 2, (LENS_RADIUS * dpr) - 2, 0, Math.PI * 2)
    ctx.closePath()
    ctx.clip()

    const srcW = (cssSize / LENS_SCALE) * scaleX
    const srcH = (cssSize / LENS_SCALE) * scaleY
    const sx = clamp(srcX - srcW / 2, 0, Math.max(0, srcCanvas.width - srcW))
    const sy = clamp(srcY - srcH / 2, 0, Math.max(0, srcCanvas.height - srcH))

    ctx.imageSmoothingEnabled = true
    // Best available quality when scaling the sampled area into the lens.
    // (Has effect in most Chromium-based browsers.)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(ctx as any).imageSmoothingQuality = 'high'
    ctx.drawImage(
      srcCanvas,
      sx,
      sy,
      srcW,
      srcH,
      0,
      0,
      lensCanvas.width,
      lensCanvas.height,
    )
    ctx.restore()

    // subtle glare
    const g = ctx.createRadialGradient(
      lensCanvas.width * 0.3,
      lensCanvas.height * 0.3,
      0,
      lensCanvas.width * 0.3,
      lensCanvas.height * 0.3,
      lensCanvas.width * 0.8,
    )
    g.addColorStop(0, 'rgba(255,255,255,0.10)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, lensCanvas.width, lensCanvas.height)

    // keep lens within stage bounds
    const leftPx = clamp(xRel - LENS_RADIUS, 0, Math.max(0, stageRect.width - cssSize))
    const topPx = clamp(yRel - LENS_RADIUS, 0, Math.max(0, stageRect.height - cssSize))
    setLensPos({ x: leftPx, y: topPx })
    setLensVisible(true)
  }

  const scheduleLens = () => {
    if (rafRef.current != null) return
    rafRef.current = window.requestAnimationFrame(updateLens)
  }

  useEffect(() => {
    return () => {
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section className={`pdf-mag ${isFullscreen ? 'is-fullscreen' : ''}`}>
      <div className="pdf-mag__topbar">
        <div className="pdf-mag__title">
          <div className="pdf-mag__titleMain">{title}</div>
          <div className="pdf-mag__titleSub">{src.includes('latest.pdf') ? 'Актуальный выпуск' : 'PDF выпуск'}</div>
        </div>

        <div className="pdf-mag__controls">
          <button className="pdf-mag__btn" onClick={goPrev} disabled={!canPrev} type="button">
            Назад
          </button>
          <button className="pdf-mag__btn" onClick={goNext} disabled={!canNext} type="button">
            Вперед
          </button>

          <div className="pdf-mag__pager">
            <input
              className="pdf-mag__pageInput"
              type="number"
              min={1}
              max={Math.max(1, numPages)}
              value={page}
              onChange={(e) => setPage(clamp(Number(e.target.value || 1), 1, Math.max(1, numPages)))}
            />
            <span className="pdf-mag__pagerSep">/</span>
            <span className="pdf-mag__pagerTotal">{numPages || '—'}</span>
          </div>

          <button
            className="pdf-mag__btn"
            type="button"
            onClick={() => setZoom((z) => clamp(Math.round((z - 0.1) * 10) / 10, 0.8, size.width < 560 ? 1.6 : 2))}
            disabled={zoom <= 0.8}
          >
            −
          </button>
          <div className="pdf-mag__zoom">{Math.round(zoom * 100)}%</div>
          <button
            className="pdf-mag__btn"
            type="button"
            onClick={() => setZoom((z) => clamp(Math.round((z + 0.1) * 10) / 10, 0.8, size.width < 560 ? 1.6 : 2))}
            disabled={zoom >= (size.width < 560 ? 1.6 : 2)}
          >
            +
          </button>

          <button
            className={`pdf-mag__btn ${lensOn ? 'is-active' : ''}`}
            type="button"
            onClick={() => {
              setLensOn((v) => {
                const next = !v
                // Lens works best at 100% without layout jumps.
                if (next) setZoom(1)
                if (!next) setLensVisible(false)
                return next
              })
            }}
          >
            <Search size={16} style={{ marginRight: 6, verticalAlign: 'text-bottom' }} />
            Лупа
          </button>

          <a className="pdf-mag__btn is-link" href={src} target="_blank" rel="noopener noreferrer">
            Скачать PDF
          </a>
          <button className="pdf-mag__btn" onClick={toggleFullscreen} type="button">
            {isFullscreen ? 'Окно' : 'На весь экран'}
          </button>
        </div>
      </div>

      <div
        ref={(el) => {
          containerRef.current = el
          stageRef.current = el
        }}
        className={`pdf-mag__stage ${zoom > 1.001 ? 'is-zoomed' : ''} ${lensOn ? 'is-lens' : ''}`}
        onPointerMove={(e) => {
          if (!lensOn) return
          lastPointerRef.current = { clientX: e.clientX, clientY: e.clientY }
          scheduleLens()
        }}
        onPointerLeave={() => {
          if (!lensOn) return
          setLensVisible(false)
        }}
      >
        {error && <div className="pdf-mag__error">{error}</div>}

        {!error && !pdf && <div className="pdf-mag__loading">Загрузка PDF…</div>}

        {!error && pdf && (
          <div className={`pdf-mag__spread ${canTwoPage ? 'is-two' : 'is-one'}`}>
            {lensOn && (
              <div
                className={`pdf-mag__lens ${lensVisible ? 'is-visible' : 'is-hidden'}`}
                style={{ left: lensPos.x, top: lensPos.y }}
                aria-hidden="true"
              >
                <canvas ref={lensCanvasRef} className="pdf-mag__lensCanvas" />
              </div>
            )}
            <button
              type="button"
              className="pdf-mag__sideBtn pdf-mag__sideBtn--left"
              onClick={goPrev}
              disabled={!canPrev}
              aria-label="Предыдущая страница"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              className="pdf-mag__sideBtn pdf-mag__sideBtn--right"
              onClick={goNext}
              disabled={!canNext}
              aria-label="Следующая страница"
            >
              <ChevronRight size={22} />
            </button>
            <AnimatePresence mode="wait">
              <motion.div
                // Do not remount on zoom changes (looks like a page switch).
                key={`spread-${leftPage}-${rightPage ?? 'x'}-${pageCssWidth}`}
                className="pdf-mag__spreadInner"
                initial={{ opacity: 0, rotateY: -10, x: 16 }}
                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                exit={{ opacity: 0, rotateY: 10, x: -16 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                <div className="pdf-mag__page pdf-mag__page--left">
                  <PdfCanvas
                    pdf={pdf}
                    pdfjs={pdfjs}
                    page={leftPage}
                    cssWidth={pageCssWidth}
                    zoom={zoom}
                    onCanvas={(c) => (leftCanvasRef.current = c)}
                    renderBoost={lensOn ? LENS_RENDER_BOOST : 1}
                  />
                  <div className="pdf-mag__pageNum">{leftPage}</div>
                </div>

                {canTwoPage && rightPage && rightPage !== leftPage && (
                  <div className="pdf-mag__page pdf-mag__page--right">
                    <PdfCanvas
                      pdf={pdf}
                      pdfjs={pdfjs}
                      page={rightPage}
                      cssWidth={pageCssWidth}
                      zoom={zoom}
                      onCanvas={(c) => (rightCanvasRef.current = c)}
                      renderBoost={lensOn ? LENS_RENDER_BOOST : 1}
                    />
                    <div className="pdf-mag__pageNum">{rightPage}</div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  )
}


