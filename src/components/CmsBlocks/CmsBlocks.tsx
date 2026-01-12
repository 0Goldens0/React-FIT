'use client'

import React from 'react'

type BlockNode =
  | {
      type: 'text'
      text: string
      bold?: boolean
      italic?: boolean
      underline?: boolean
      strikethrough?: boolean
      code?: boolean
    }
  | { type: 'link'; url: string; children?: BlockNode[] }
  | { type: 'paragraph'; children?: BlockNode[] }
  | { type: 'heading'; level?: number; children?: BlockNode[] }
  | { type: 'list'; format?: 'ordered' | 'unordered'; children?: BlockNode[] }
  | { type: 'list-item'; children?: BlockNode[] }
  | { type: 'quote'; children?: BlockNode[] }
  | { type: 'code'; children?: BlockNode[] }
  | { type: string; children?: BlockNode[]; [key: string]: any }

function renderInline(node: BlockNode, key: React.Key): React.ReactNode {
  if (node.type === 'text') {
    let out: React.ReactNode = node.text
    if (node.code) out = <code key={key}>{out}</code>
    if (node.bold) out = <strong key={key}>{out}</strong>
    if (node.italic) out = <em key={key}>{out}</em>
    if (node.underline) out = <u key={key}>{out}</u>
    if (node.strikethrough) out = <s key={key}>{out}</s>
    return out
  }

  if (node.type === 'link') {
    return (
      <a key={key} href={node.url} target="_blank" rel="noopener noreferrer">
        {renderChildren(node.children)}
      </a>
    )
  }

  return <React.Fragment key={key}>{renderChildren('children' in node ? node.children : undefined)}</React.Fragment>
}

function renderChildren(children?: BlockNode[]) {
  if (!children || children.length === 0) return null
  return children.map((c, idx) => renderInline(c, idx))
}

function renderBlock(node: BlockNode, key: React.Key): React.ReactNode {
  switch (node.type) {
    case 'paragraph':
      return <p key={key}>{renderChildren(node.children)}</p>
    case 'heading': {
      const lvl = Math.min(6, Math.max(1, Number(node.level || 2)))
      const tag = `h${lvl}` as keyof React.JSX.IntrinsicElements
      return React.createElement(tag, { key }, renderChildren(node.children))
    }
    case 'quote':
      return <blockquote key={key}>{renderChildren(node.children)}</blockquote>
    case 'code':
      return (
        <pre key={key}>
          <code>{renderChildren(node.children)}</code>
        </pre>
      )
    case 'list': {
      const ordered = node.format === 'ordered'
      const listTag = (ordered ? 'ol' : 'ul') as keyof React.JSX.IntrinsicElements
      const children = (node.children || []).map((c: BlockNode, i: number) => renderBlock(c, i))
      return React.createElement(listTag, { key }, children)
    }
    case 'list-item':
      return <li key={key}>{renderChildren(node.children)}</li>
    default:
      // Unknown block type (e.g. images inside blocks). Keep it non-breaking.
      return null
  }
}

export function CmsBlocks({ content }: { content: unknown }) {
  if (!content) return null
  if (!Array.isArray(content)) return null
  return <>{(content as BlockNode[]).map((n, idx) => renderBlock(n, idx))}</>
}


