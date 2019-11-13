import { FILTER_TYPES } from "constants/filterTypes"

// todo временные переменные, это должно быть получено через API
import { productColors } from "constants/productColors"
import { productShades } from "constants/productShades"
import { productSizes } from "constants/productSizes"
import { flowers } from "constants/flowers"
import { productPacking } from "constants/productPacking"
import { stability } from "constants/filter/stability"


export const filtersEntities = {
  bySizesPrice: {
    order: 0,
    type: FILTER_TYPES.RANGE,
    title: 'Цена',
    filterFunctionName: 'bySizesPrice',
    inititalRange: {
      min: 0,
      max: 5000
    },
    expandDefault: true,
    filtersToReset: ['sizes']
  },
  bySizes: {
    order: 1,
    title: 'Размер',
    type: FILTER_TYPES.ITEMS_OBJECTS,
    items: productSizes,
    expandDefault: true,
    filtersToReset: ['priceRange']
  },
  byPacking: {
    order: 2,
    title: 'Оформление букета',
    type: FILTER_TYPES.ITEMS_OBJECTS,
    items: productPacking,
    expandDefault: true
  },
  byAvailability: {
    order: 3,
    title: 'Наличие',
    type: FILTER_TYPES.ITEMS_OBJECTS,
    items: [{
      id: 0,
      name: 'Только в наличии'
    }],
    expandDefault: true
  },
  byShades: {
    order: 4,
    title: 'Оттенок',
    type: FILTER_TYPES.ITEMS_OBJECTS,
    items: productShades,
    expandDefault: false
  },
  byStability: {
    order: 5,
    title: 'Стойкость',
    type: FILTER_TYPES.ITEMS_OBJECTS,
    items: stability,
    expandDefault: false
  },
  byColors: {
    order: 6,
    title: 'Цвет композиции',
    type: FILTER_TYPES.COLORS_BUTTONS,
    items: productColors,
    expandDefault: false
  },
  byFlowers: {
    order: 7,
    title: 'Состав букета',
    type: FILTER_TYPES.ITEMS_OBJECTS,
    items: flowers,
    expandDefault: false
  }
}