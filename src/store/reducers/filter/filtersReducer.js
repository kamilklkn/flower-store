const initialState = {
  bySizesPrice: [0, 10000], // initial min max for price range
  byPacking: ['Бумага флисовая', 'Шляпная коробка', 'Фет', 'Коробка'],
  bySizes: ['Стандартный', 'Большой', 'Премиум'],
  byCollections: ['23 февраля', '8 марта', 'Новый год'],
  byColors: [
    {
      title: 'Сборный',
      color: 'miltiply'
    },
    {
      title: 'Фиолетовый',
      color: 'purple'
    },
    {
      title: 'Молочный',
      color: '#eee7dc'
    }
  ],
  byFlowers: ['Гортензия', 'Розы', 'Кустовая роза', 'Кустовая пионовидная роза',
    'Астра', 'Хризантема'],
  byStability: ['+', '++', '+++'],
  byShades: ['Нежный', 'Яркий', 'Темный'],
  byAvailability: ['Готовые букеты', 'Ожидание 90 минут']
}

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default filtersReducer

// todo: do filter Монобукет / Сборный

// export const bouquet = [
//   {
//     id: 0,
//     name: 'Монобукет'
//   },
//   {
//     id: 1,
//     name: 'Сборный'
//   },
// ]