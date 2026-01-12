import { getAssetPath } from '../../utils/paths'

export interface Brand {
  id: string
  displayName: string
  description: string
  logo: string
  primaryColor: string
  /** Button/CTA text color override for brand pages (catalog buttons). */
  buttonTextColor?: string
  parallaxBgColor: string
  parallaxFgColor: string
}

export interface BrandProduct {
  name: string
  article: string
  image: string
  price: string
  category: string
}

export type BrandProductsMap = Record<string, BrandProduct[]>

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const raw = hex.trim().replace(/^#/, '')
  if (raw.length === 3) {
    const r = parseInt(raw[0] + raw[0], 16)
    const g = parseInt(raw[1] + raw[1], 16)
    const b = parseInt(raw[2] + raw[2], 16)
    if ([r, g, b].some((n) => Number.isNaN(n))) return null
    return { r, g, b }
  }
  if (raw.length === 6) {
    const r = parseInt(raw.slice(0, 2), 16)
    const g = parseInt(raw.slice(2, 4), 16)
    const b = parseInt(raw.slice(4, 6), 16)
    if ([r, g, b].some((n) => Number.isNaN(n))) return null
    return { r, g, b }
  }
  return null
}

function srgbToLinear(c: number): number {
  const v = c / 255
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
}

function relativeLuminance({ r, g, b }: { r: number; g: number; b: number }): number {
  const R = srgbToLinear(r)
  const G = srgbToLinear(g)
  const B = srgbToLinear(b)
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

function contrastRatio(l1: number, l2: number): number {
  const L1 = Math.max(l1, l2)
  const L2 = Math.min(l1, l2)
  return (L1 + 0.05) / (L2 + 0.05)
}

/**
 * Returns a readable text color (black/white) for a given background hex color.
 * Keeps brand CTA buttons readable regardless of brand.primaryColor.
 */
export function getContrastingTextColor(backgroundHex: string): '#000000' | '#FFFFFF' {
  const rgb = hexToRgb(backgroundHex)
  if (!rgb) return '#FFFFFF'
  const bgL = relativeLuminance(rgb)
  const whiteContrast = contrastRatio(bgL, 1)
  const blackContrast = contrastRatio(bgL, 0)
  return blackContrast >= whiteContrast ? '#000000' : '#FFFFFF'
}

export const brandsData: Brand[] = [
  {
    id: 'fit',
    displayName: 'FIT',
    description:
      'Появление торговой марки в 2003 году дало мощный импульс развитию компании и обеспечило устойчивый рост продаж. FIT – это оптимальное сочетание цены и качества. Наш ассортимент — это единая экосистема решений: от ручного и электроинструмента до оснастки, крепежа и систем хранения. Такой подход позволяет решать любые задачи — от масштабного строительства до точечного ремонта.',
    logo: getAssetPath('logo/fit-logo-clean.svg'),
    primaryColor: '#FDB913',
    parallaxBgColor: '#004A4E',
    parallaxFgColor: '#002F3A',
  },
  {
    id: 'cutop',
    displayName: 'CUTOP',
    description:
      'Продукция бренда — профессиональная и промышленная оснастка для электроинструмента. Бренд использует самые передовые технологии производства и  предлагает готовые решения для работы с высокими нагрузками и сверхтвердыми материалами. Продукция CUTOP обеспечивает максимальную точность, увеличенный ресурс и безопасность при выполнении ответственных задач.',
    logo: getAssetPath('logo/brands/Cutop-CMYK.svg'),
    primaryColor: '#2A4998',
    buttonTextColor: '#FFFFFF',
    parallaxBgColor: '#2A4998',
    parallaxFgColor: '#FFFFFF',
  },
  {
    id: 'mos',
    displayName: 'MOS',
    description:
      'Бренд закрывает потребности бизнеса в удовлетворении спроса на продукцию в низком ценовом сегменте. MOS — разумный выбор для дома и мастерской. Доступные ручные инструменты и хозяйственные товары решают базовые задачи, сохраняя достойное качество без переплат.',
    logo: getAssetPath('logo/brands/MOS-CMYK.svg'),
    primaryColor: '#00AEEF',
    buttonTextColor: '#FFFFFF',
    parallaxBgColor: '#00AEEF',
    parallaxFgColor: '#FFFFFF',
  },
  {
    id: 'mastercolor',
    displayName: 'MASTER COLOR',
    description:
      'Master Color - профессиональный бренд товарной категории «малярно-штукатурный инструмент». Предлагает комплексные решения для профессиональной и бытовой отделки: от подготовки поверхностей до нанесения покрытий и защиты рабочей зоны. Каждый инструмент Master Color обеспечивает безупречный результат на всех этапах работ.',
    logo: getAssetPath('logo/brands/Master_Color_logo-1.svg'),
    primaryColor: '#0065A8',
    buttonTextColor: '#FFFFFF',
    parallaxBgColor: '#0065A8',
    parallaxFgColor: '#FFFFFF',
  },
  {
    id: 'kypc',
    displayName: 'КУРС',
    description:
      'Разработан для занятия ниши среднего ценового сегмента.КУРС — практичные решения для повседневных задач. Ручные инструменты, оснастка и хозяйственные товары сочетают доступность и надежность, помогая справляться с ремонтом и обслуживанием дома.',
    logo: getAssetPath('logo/brands/Kurs-CMYK.svg'),
    primaryColor: '#D81515',
    buttonTextColor: '#FFFFFF',
    parallaxBgColor: '#D81515',
    parallaxFgColor: '#FFFFFF',
  },
  {
    id: 'xbat',
    displayName: 'ХВАТ',
    description:
      'Бренд с говорящим названием! ХВАТ - специализированный бренд, который фокусируется на узком сегменте рынка - крепёж и сопутствующие товары для бытового и профессионального применения. Прочные, устойчивые к нагрузкам и долговечные решения для надежной фиксации, крепления и энергоснабжения.',
    logo: getAssetPath('logo/brands/Xbat-CMYK.svg'),
    primaryColor: '#1A1A1A',
    buttonTextColor: '#FFFFFF',
    parallaxBgColor: '#1A1A1A',
    parallaxFgColor: '#FFFFFF',
  },
]

export const brandProducts: BrandProductsMap = {
  fit: [
    { name: 'Дрель-Шуруповерт аккумуляторная', article: '79905', image: getAssetPath('img/fit/79905.webp'), price: '3 828.00 ₽', category: 'Электроинструмент' },
    { name: 'Перфоратор монтажный аккумуляторный', article: '79910', image: getAssetPath('img/fit/79910.webp'), price: '11 880.00 ₽', category: 'Электроинструмент' },
    { name: 'Шлифмашина угловая аккумуляторная', article: '79912', image: getAssetPath('img/fit/79912.webp'), price: '6 220.00 ₽', category: 'Электроинструмент' },
    { name: 'Пила дисковая циркулярная', article: '79920', image: getAssetPath('img/fit/79920.webp'), price: '7 425.00 ₽', category: 'Электроинструмент' },
  ],
  kypc: [
    { name: 'Тачка строительная КУРС', article: '77607', image: getAssetPath('img/kurs/77607.webp'), price: '3 590 ₽', category: 'Садовый инструмент' },
    { name: 'Кисть ОПТИМА', article: '00811', image: getAssetPath('img/kurs/00811.webp'), price: '2 790 ₽', category: 'Отделочный инструмент' },
    { name: 'Гвоздодер с изолированной ручкоЙ КУРС', article: '46913', image: getAssetPath('img/kurs/46913.webp'), price: '4 190 ₽', category: 'Столярный инструмент' },
    { name: 'Киянка резиновая КУРС', article: '45390', image: getAssetPath('img/kurs/45390.webp'), price: '3 290 ₽', category: 'Столярный инструмент' },
  ],
  mos: [
    { name: 'КИСТЬ ФЛЕЙЦЕВАЯ MOS', article: '00701', image: getAssetPath('img/mos/00701.webp'), price: '1 990 ₽', category: 'Отделочный инструмент' },
    { name: 'РУЛЕТКА MOS ', article: '16983', image: getAssetPath('img/mos/16983.webp'), price: '499 ₽', category: 'Измерительный инструмент' },
    { name: 'ДИСК ОТРЕЗНОЙ АЛМАЗНЫЙ MOS', article: '37201', image: getAssetPath('img/mos/37201.webp'), price: '690 ₽', category: 'Абразивно-шлифовальный инструмент' },
    { name: 'КЛЮЧ РАЗВОДНОЙ MOS', article: '70091', image: getAssetPath('img/mos/70091.webp'), price: '890 ₽', category: 'Сантехнический инструмент' },
  ],
  xbat: [
    { name: 'РЕМЕНЬ БАГАЖНЫЙ ХВАТ', article: '77-253', image: getAssetPath('img/xbat/77-253.webp'), price: '149 ₽', category: 'Инструмент автомобильный' },
    { name: 'НАБОР КРЕПЕЖА УНИВЕРСАЛЬНЫЙ ХВАТ', article: '20000', image: getAssetPath('img/xbat/20000.webp'), price: '189 ₽', category: 'Крепеж и крепежный инструмент' },
    { name: 'АНКЕРНЫЙ БОЛТ С ПОЛНЫМ КРЮКОМ ХВАТ', article: '26654', image: getAssetPath('img/xbat/26654.webp'), price: '590 ₽', category: 'Крепёж' },
    { name: 'ГЕНЕРАТОР ДИЗЕЛЬНЫЙ ХВАТ', article: 'KM7500DE', image: getAssetPath('img/xbat/KM7500DE.webp'), price: '249 ₽', category: 'Генератор' },
  ],
  cutop: [
    { name: 'ШУРУПОВЕРТ CUTOP e-profi', article: '01-884', image: getAssetPath('img/cutop/01-884.webp'), price: '190 ₽', category: 'Электроинструмент' },
    { name: 'РОФЕССИОНАЛЬНЫЙ ОТРЕЗНОЙ АЛМАЗНЫЙ ДИСК CUTOP', article: '73-419', image: getAssetPath('img/cutop/73-419-02 (2).webp'), price: '210 ₽', category: 'Абразивно-шлифовальный инструмент' },
    { name: 'КОРЩЕТКИ РУЧНЫЕ CUTOP profi', article: '82-547', image: getAssetPath('img/cutop/82-547.webp'), price: '990 ₽', category: 'Абразивно-шлифовальный инструмент' },
    { name: 'НАБОР БИТ В ПЛАСТИКОВОМ БОКСЕ CUTOP profi', article: '83-869', image: getAssetPath('img/cutop/83-869.webp'), price: '1 590 ₽', category: 'Слесарный инструмент' },
  ],
  mastercolor: [
    { name: 'КИСТЬ ФЛЕЙЦЕВАЯ Master Color 25 мм', article: '30-0011', image: getAssetPath('img/mc/30-0011.webp'), price: '250 ₽', category: 'Отделочный инструмент' },
    { name: 'РОЛИК Master Color 180мм', article: '30-0844', image: getAssetPath('img/mc/30-0844.webp'), price: '390 ₽', category: 'Отделочный инструмент' },
    { name: 'МАЛЯРНАЯ ЛЕНТА Master Color', article: '30-6412', image: getAssetPath('img/mc/30-6412.webp'), price: '290 ₽', category: 'Отделочный инструмент' },
    { name: 'ПРОФЕССИОНАЛЬНАЯ РАБОЧАЯ ОДЕЖДА Master Color', article: '30-8042', image: getAssetPath('img/mc/30-8042.webp'), price: '990 ₽', category: 'Отделочный инструмент' },
  ],
}

export function getBrandById(brandId: string) {
  return brandsData.find((b) => b.id === brandId) ?? null
}



