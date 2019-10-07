
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
  byColors(products) {
    return products.filter(product =>
      filter.colors.selected.includes(product.color)
    )
  },
  bySizes(products) {
    return products.filter(product =>
      product.sizes.some(size =>
        filter.sizes.selected.includes(size.id)
      )
    )
  },
  bySizesPrice(products) {
    return products.filter(product =>
      product.sizes.some(size =>
        size.price >= filter.priceRange.min && size.price <= filter.priceRange.max
      )
    )
  }
}

const filter = {
  colors: {
    selected: ['green', 'red'],
    func: filterFunctions.byColors
  },
  sizes: {
    selected: [3],
    func: filterFunctions.bySizes
  },
  priceRange: {
    min: 4000,
    max: 4500,
    func: filterFunctions.bySizesPrice
  }
}

// let result = filterFunctions.byColors(products)
// result = filterFunctions.bySizes(products)
// result = filterFunctions.bySizesPrice(result)

let result = products
for (const [key, item] of Object.entries(filter)) {
  if (item.selected) {
    if (item.selected.length > 0) {
      console.log(key)
      result = item.func(result)
    }
  } else {
    console.log(key)
    result = item.func(result)
  }
}


const r = result.map(item => item.title)
console.log(r)

// filter - products
// filter - products
// filter - products
// filter - products
