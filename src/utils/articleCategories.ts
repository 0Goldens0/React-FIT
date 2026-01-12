export const ARTICLE_CATEGORY_LABELS: Record<string, string> = {
  tools: 'Инструменты',
  logistics: 'Логистика',
  company: 'Компания',
  other: 'Другое',
}

export function formatArticleCategory(category: string | null | undefined): string {
  if (!category) return ''
  return ARTICLE_CATEGORY_LABELS[category] ?? category
}





