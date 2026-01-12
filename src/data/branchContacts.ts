export type BranchContact = {
  /** Matches RussiaMap's regionalCenters[].id */
  cityId: string
  cityName: string
  regionCode: string

  phone: string
  email: string
  address: string

  /** Branch commercial director */
  directorName: string
  directorTitle: string

  /** Optional: if you later add real photos in /public */
  avatarUrl?: string
}

/**
 * Branch contacts for highlighted cities on the Russia map.
 *
 * TODO: replace placeholder director names/phones/emails/addresses with real branch data.
 */
export const branchContactsByCityId: Record<string, BranchContact> = {
  moskva: {
    cityId: 'moskva',
    cityName: 'Москва',
    regionCode: 'RU-MOW',
    phone: '8 (800) 511-12-33',
    email: 'info@instrument-fit.ru',
    address: 'Москва, Россия',
    directorName: 'Коммерческий директор (уточняется)',
    directorTitle: 'Коммерческий директор филиала',
  },
  spb: {
    cityId: 'spb',
    cityName: 'Санкт-Петербург',
    regionCode: 'RU-SPE',
    phone: '8 (800) 511-12-33',
    email: 'info@instrument-fit.ru',
    address: 'пр. Обуховской Обороны, 120',
    directorName: 'Коммерческий директор (уточняется)',
    directorTitle: 'Коммерческий директор филиала',
  },
  voronezh: {
    cityId: 'voronezh',
    cityName: 'Воронеж',
    regionCode: 'RU-VOR',
    phone: '8 (800) 511-12-33',
    email: 'info@instrument-fit.ru',
    address: 'ул. Димитрова, 148',
    directorName: 'Коммерческий директор (уточняется)',
    directorTitle: 'Коммерческий директор филиала',
  },
  nizhniy_novgorod: {
    cityId: 'nizhniy_novgorod',
    cityName: 'Нижний Новгород',
    regionCode: 'RU-NIZ',
    phone: '8 (800) 511-12-33',
    email: 'info@instrument-fit.ru',
    address: 'Адрес филиала (уточняется)',
    directorName: 'Коммерческий директор (уточняется)',
    directorTitle: 'Коммерческий директор филиала',
  },
  kazan: {
    cityId: 'kazan',
    cityName: 'Казань',
    regionCode: 'RU-TA',
    phone: '8 (800) 511-12-33',
    email: 'info@instrument-fit.ru',
    address: 'ул. Тихорецкая, 7',
    directorName: 'Коммерческий директор (уточняется)',
    directorTitle: 'Коммерческий директор филиала',
  },
  ekaterinburg: {
    cityId: 'ekaterinburg',
    cityName: 'Екатеринбург',
    regionCode: 'RU-SVE',
    phone: '8 (800) 511-12-33',
    email: 'info@instrument-fit.ru',
    address: 'Сибирский тракт, 12',
    directorName: 'Коммерческий директор (уточняется)',
    directorTitle: 'Коммерческий директор филиала',
  },
  pyatigorsk: {
    cityId: 'pyatigorsk',
    cityName: 'Пятигорск',
    regionCode: 'RU-KB',
    phone: '8 (800) 511-12-33',
    email: 'info@instrument-fit.ru',
    address: 'Черкесское шоссе, 25',
    directorName: 'Коммерческий директор (уточняется)',
    directorTitle: 'Коммерческий директор филиала',
  },
  arkhangelsk: {
    cityId: 'arkhangelsk',
    cityName: 'Архангельск',
    regionCode: 'RU-ARK',
    phone: '8 (800) 511-12-33',
    email: 'info@instrument-fit.ru',
    address: 'Адрес филиала (уточняется)',
    directorName: 'Коммерческий директор (уточняется)',
    directorTitle: 'Коммерческий директор филиала',
  },
  krasnodar: {
    cityId: 'krasnodar',
    cityName: 'Краснодар',
    regionCode: 'RU-KDA',
    phone: '8 (800) 511-12-33',
    email: 'info@instrument-fit.ru',
    address: 'Уральская улица, 126',
    directorName: 'Коммерческий директор (уточняется)',
    directorTitle: 'Коммерческий директор филиала',
  },
  rostov_na_donu: {
    cityId: 'rostov_na_donu',
    cityName: 'Ростов-на-Дону',
    regionCode: 'RU-ROS',
    phone: '8 (800) 511-12-33',
    email: 'info@instrument-fit.ru',
    address: 'Адрес филиала (уточняется)',
    directorName: 'Коммерческий директор (уточняется)',
    directorTitle: 'Коммерческий директор филиала',
  },
}

export const highlightedCityIds = new Set<string>([
  'ekaterinburg',
  'spb',
  'pyatigorsk',
  'arkhangelsk',
  'kazan',
  'krasnodar',
  'rostov_na_donu',
  'moskva',
  'voronezh',
  'nizhniy_novgorod',
])


