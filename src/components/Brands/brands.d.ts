export interface Product {
    name: string
    article: string
    image: string
    price: string
    category: string
    description: string
  }

  export const brandProducts: Record<string, Product[]>