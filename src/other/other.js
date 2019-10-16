
// https://firebase.google.com/docs/cli/#install-cli-mac-linux
// firebase deploy

// import { chain, filter, value } from "lodash"

const products = [
  {
    id: 1,
    title: '1 red 2400 3500 5000',
    price: 2400,
    color: 'red',
    sizes: [
      {
        id: 1,
        price: 2400
      },
      {
        id: 2,
        price: 3500
      },
      {
        id: 3,
        price: 5000
      }
    ]
  },
  {
    id: 2,
    title: '2 green 2200(2)',
    price: 1300,
    color: 'green',
    sizes: [
      {
        id: 2,
        price: 2200
      }
    ]
  },
  {
    id: 3,
    title: '3 yellow 7900 11000 15000',
    price: 7900,
    color: 'yellow',
    sizes: [
      {
        id: 1,
        price: 7900
      },
      {
        id: 2,
        price: 11000
      },
      {
        id: 3,
        price: 15000
      }
    ]
  }
]

const filterFunctions = {
  byColors(products, { selected }) {
    return products.filter(product =>
      selected.includes(product.color)
    )
  },
  bySizes(products, { selected }) {
    return products.filter(product =>
      product.sizes.some(size =>
        selected.includes(size.id)
      )
    )
  },
  bySizesPrice(products, { min, max }) {
    return products.filter(product =>
      product.sizes.some(size =>
        size.price >= min && size.price <= max
      )
    )
  }
}

const filters = {
  colors: {
    selected: ['green', 'red'],
    func: filterFunctions.byColors
  },
  sizes: {
    selected: [1, 2],
    func: filterFunctions.bySizes
  },
  priceRange: {
    min: 400,
    max: 15000,
    func: filterFunctions.bySizesPrice
  }
}


const filteredProducts = Object.values(filters).reduce((results, filter) => {
  // Не запускаем фильтр, если он не установлен
  if ('selected' in filter && !filter.selected.length) return results
  return filter.func(results, filter)
}, products)

const r = filteredProducts.map(product => product.title)
console.log(r)

// let result = filterFunctions.byColors(products)
// result = filterFunctions.bySizes(products)
// result = filterFunctions.bySizesPrice(result)

// filter - products
// filter - products
// filter - products
// filter - products
