export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

import { getBrandCatalogData } from '../../../components/BrandCategoriesCatalog/brandsCategories'

const CMS_ORIGIN =
  process.env.NEXT_PUBLIC_CMS_URL?.replace(/\/+$/, '') ||
  process.env.CMS_URL?.replace(/\/+$/, '') ||
  'http://localhost:1337'

type Level3Items = string[]
type Level2Map = Record<string, Level3Items>
type Level1Map = Record<string, Level2Map>

type CatalogType = {
  title: string
  url?: string | null
}

type CatalogSubcategory = {
  title: string
  url?: string | null
  types: CatalogType[]
}

type CatalogCategory = {
  title: string
  subcategories: CatalogSubcategory[]
}

function catalogCategoriesToMap(catalogCategories: any): Level1Map {
  const out: Level1Map = {}
  if (!Array.isArray(catalogCategories)) return out

  const cats = catalogCategories
    .slice()
    .sort((a: any, b: any) => Number(a?.order ?? 0) - Number(b?.order ?? 0))

  for (const c of cats) {
    const catTitle = String(c?.title ?? '').trim()
    if (!catTitle) continue
    const subOut: Level2Map = {}

    const subs = Array.isArray(c?.subcategories) ? c.subcategories.slice() : []
    subs.sort((a: any, b: any) => Number(a?.order ?? 0) - Number(b?.order ?? 0))

    for (const s of subs) {
      const subTitle = String(s?.title ?? '').trim()
      if (!subTitle) continue
      const types = Array.isArray(s?.types) ? s.types.slice() : []
      types.sort((a: any, b: any) => Number(a?.order ?? 0) - Number(b?.order ?? 0))
      subOut[subTitle] = types
        .map((t: any) => String(t?.title ?? '').trim())
        .filter((x: string) => x.length > 0)
    }

    out[catTitle] = subOut
  }

  return out
}

function catalogCategoriesToStructured(catalogCategories: any): CatalogCategory[] {
  if (!Array.isArray(catalogCategories)) return []

  const cats = catalogCategories
    .slice()
    .sort((a: any, b: any) => Number(a?.order ?? 0) - Number(b?.order ?? 0))

  return cats
    .map((c: any) => {
      const title = String(c?.title ?? '').trim()
      if (!title) return null

      const subs = Array.isArray(c?.subcategories) ? c.subcategories.slice() : []
      subs.sort((a: any, b: any) => Number(a?.order ?? 0) - Number(b?.order ?? 0))

      const subcategories: CatalogSubcategory[] = subs
        .map((s: any) => {
          const st = String(s?.title ?? '').trim()
          if (!st) return null
          const url = (s?.url == null ? null : String(s.url).trim()) || null

          const typesRaw = Array.isArray(s?.types) ? s.types.slice() : []
          typesRaw.sort((a: any, b: any) => Number(a?.order ?? 0) - Number(b?.order ?? 0))
          const types: CatalogType[] = typesRaw
            .map((t: any) => {
              const title = String(t?.title ?? '').trim()
              const url = (t?.url == null ? null : String(t.url).trim()) || null
              return title ? { title, url } : null
            })
            .filter(Boolean) as CatalogType[]

          return { title: st, url, types }
        })
        .filter(Boolean) as CatalogSubcategory[]

      return { title, subcategories }
    })
    .filter(Boolean) as CatalogCategory[]
}

async function fetchBrandCatalogFromCms(params: {
  brandId: string
  wantDraft: boolean
}): Promise<{ catalogCategories: CatalogCategory[]; categories: Level1Map } | null> {
  const qs = new URLSearchParams()
  qs.set('filters[brandId][$eq]', params.brandId)
  qs.set('status', params.wantDraft ? 'draft' : 'published')
  qs.set('populate[catalogCategories][populate][subcategories][populate][types]', '*')

  const url = `${CMS_ORIGIN}/api/brands?${qs.toString()}`

  const headers: Record<string, string> = { Accept: 'application/json' }
  const token = process.env.CMS_API_TOKEN
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(url, { headers, cache: 'no-store' })
  if (!res.ok) return null
  const json = (await res.json()) as any
  const item = json?.data?.[0]
  if (!item) return null

  const structured = catalogCategoriesToStructured(item.catalogCategories)
  const categories = catalogCategoriesToMap(item.catalogCategories)
  return { catalogCategories: structured, categories }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const brandId = (searchParams.get('brandId') ?? '').trim()
    const status = searchParams.get('status')
    const preview = searchParams.get('preview') === '1'
    const wantDraft = preview && (status === 'draft' || status === 'modified')
    
    if (!brandId) {
      return Response.json(
        { error: 'Missing required query param: brandId' },
        { status: 400, headers: { 'Cache-Control': 'no-store' } },
      )
    }

    // Prefer CMS catalog (so it can be edited in admin). Fallback to TS data.
    const cms = await fetchBrandCatalogFromCms({ brandId, wantDraft })
    if (cms) {
      return Response.json(
        { brandId, brandKey: brandId, categories: cms.categories, catalogCategories: cms.catalogCategories },
        { status: 200, headers: { 'Cache-Control': 'no-store' } },
      )
    }

    const data = getBrandCatalogData(brandId)
    
    if (!data) {
      return Response.json(
        { brandId, brandKey: null, categories: {}, catalogCategories: [] },
        { status: 200, headers: { 'Cache-Control': 'no-store' } },
      )
    }

    // Fallback: build structured catalog from TS map (no urls).
    const catalogCategories: CatalogCategory[] = Object.entries(data.categories ?? {}).map(([catTitle, level2]) => ({
      title: catTitle,
      subcategories: Object.entries(level2 ?? {}).map(([subTitle, items]) => ({
        title: subTitle,
        url: null,
        types: (items ?? []).map((t) => ({ title: String(t), url: null })),
      })),
    }))

    return Response.json(
      { brandId, brandKey: brandId, categories: data.categories, catalogCategories },
      { status: 200, headers: { 'Cache-Control': 'no-store' } },
    )
  } catch (err) {
    return Response.json(
      { error: 'Failed to load brand categories' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } },
    )
  }
}


