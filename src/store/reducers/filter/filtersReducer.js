const initialState = {
  bySizesPrice: [0, 10000], // initial min max for price range
  byPacking: ['Бумага флисовая', 'Шляпная коробка', 'Фет', 'Коробка'],
  bySizes: ['Стандартный', 'Большой', 'Премиум'],
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
  byAvailability: ['Только в наличии']
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