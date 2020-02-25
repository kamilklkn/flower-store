import { FILTER_COMPONENTS_TYPES } from "constants/filterComponentsTypes"

export const filtersEntities = {
   bySizesPrice: {
      type: FILTER_COMPONENTS_TYPES.RANGE,
      title: 'Цена'
   },
   bySizes: {
      title: 'Размер',
      type: FILTER_COMPONENTS_TYPES.ITEMS
   },
   // byCollections: {
   //    title: 'Коллекция',
   //    type: FILTER_COMPONENTS_TYPES.ITEMS,
   //    openedDefault: true
   // },
   byPacking: {
      title: 'Оформление',
      type: FILTER_COMPONENTS_TYPES.ITEMS
   },
   byAvailability: {
      title: 'Наличие',
      type: FILTER_COMPONENTS_TYPES.ITEMS
   },
   // byBouquetType: {
   //    title: 'Вид',
   //    type: FILTER_COMPONENTS_TYPES.ITEMS,
   //    openedDefault: true
   // },
   byFlowers: {
      title: 'Состав',
      type: FILTER_COMPONENTS_TYPES.ITEMS,
      openedDefault: false
   },
   byShades: {
      title: 'Гамма',
      type: FILTER_COMPONENTS_TYPES.ITEMS,
      openedDefault: false
   },
   byColors: {
      title: 'Цвет',
      type: FILTER_COMPONENTS_TYPES.COLORS_BUTTONS,
      openedDefault: false
   },

   byStability: {
      title: 'Стойкость',
      type: FILTER_COMPONENTS_TYPES.ITEMS,
      openedDefault: false
   }
}