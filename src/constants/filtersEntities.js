import { FILTER_COMPONENTS_TYPES } from "constants/filterComponentsTypes"

export const filtersEntities = {
  bySizesPrice: {
    type: FILTER_COMPONENTS_TYPES.RANGE,
    title: 'Цена',
  },
  bySizes: {
    title: 'Размер',
    type: FILTER_COMPONENTS_TYPES.ITEMS,
  },
  byPacking: {
    title: 'Оформление букета',
    type: FILTER_COMPONENTS_TYPES.ITEMS,
  },
  byAvailability: {
    title: 'Наличие',
    type: FILTER_COMPONENTS_TYPES.ITEMS,
  },
  byShades: {
    title: 'Оттенок',
    type: FILTER_COMPONENTS_TYPES.ITEMS,
    openedDefault: false
  },
  byStability: {
    title: 'Стойкость',
    type: FILTER_COMPONENTS_TYPES.ITEMS,
    openedDefault: false
  },
  byColors: {
    title: 'Цвет композиции',
    type: FILTER_COMPONENTS_TYPES.COLORS_BUTTONS,
    openedDefault: false
  },
  byFlowers: {
    title: 'Состав букета',
    type: FILTER_COMPONENTS_TYPES.ITEMS,
    openedDefault: false
  }
}