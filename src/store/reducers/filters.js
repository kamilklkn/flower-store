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

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}