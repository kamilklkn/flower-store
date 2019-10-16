// todo временные переменные, это должно быть получено через API
import { productColors } from "constants/productColors"
import { productSizes } from "constants/productSizes"
import { flowers } from "constants/flowers"
import { productPacking } from "constants/productPacking"
import { productGrass } from "constants/productGrass"
import { getNameById } from "utils"

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomIntHundred(min, max) {
  let val = Math.floor(Math.random() * (max - min)) + min;
  return Math.round(val / 100) * 100;
}

const titles = [
  'Монобукет Мисти Бабблс',
  'Монобукет Аква',
  'Гортензия',
  'Сборный букет «Персиковый»',
  'Монобукет Аскот'
]

const model = {
  id: 1,
  order: 1,
  title: 'Монобукет Мисти Бабблс',
  slug: 'monobuket-kustovoj-pionovidnoj-rozy',
  desc: '',
  activeSizeIndex: 0,
  activeGrassIndex: 0,
  available: {
    now: false,
    fromDate: new Date()
  },
  packingIds: [0, 2],
  additionalProducts: [0, 1],
  sizes: [
    {
      id: 0,
      h: 25,
      w: 35,
      image: '',
      price: 2500,
      flowers: {
        ids: [1, 3, 0],
        counts: [1, 5, 16]
      },
    },
    {
      id: 1,
      h: 34,
      w: 40,
      image: '',
      price: 3400,
      flowers: {
        ids: [2, 4, 3],
        counts: [10, 14, 7]
      },
    },
    {
      id: 2,
      h: 50,
      w: 68,
      image: '',
      price: 5200,
      flowers: {
        ids: [1, 2, 3],
        counts: [3, 2, 5]
      },
    },
  ]
}

const newModel = {
  id: 1,
  order: 1,
  title: 'Монобукет Мисти Бабблс',
  slug: 'monobuket-kustovoj-pionovidnoj-rozy',
  desc: '',
  activeSizeIndex: 0,
  activeGrassIndex: 0,
  available: {
    now: false,
    fromDate: new Date()
  },
  packingIds: ['Бумага флисовая', 'Коробка'],
  additionalProducts: [0, 1],
  color: {
    name: 'Зеленый',
    color: 'green'
  },
  shade: 'Мягкий',
  florist: {
    photo: '%D0%9B%D0%B8%D0%B7%D0%B0.jpg',
    name: 'Лиза',
    surname: '',
    opinion: 'По вашему профессиональному мнению как действующего специалиста— представляет ли мистер Сегерс опасность для общества?'
  },
  sizes: [
    {
      title: 'Стандартный',
      h: 25,
      w: 35,
      image: 'f_auto,q_auto/t_Product100s/v1/R',
      price: 2500,
      flowers: [
        ['Гортензия', 23],
        ['Фиалка', 23],
        ['Кустарная роза', 23],
      ]
    },
    {
      title: 'Большой',
      h: 34,
      w: 40,
      image: 'f_auto,q_auto/t_Product100s/v1/R',
      price: 3400,
      flowers: [
        ['Гортензия', 23],
        ['Фиалка', 23],
        ['Кустарная роза', 23],
      ]
    },
    {
      title: 'Премиум',
      h: 50,
      w: 68,
      image: 'f_auto,q_auto/t_Product100s/v1/R',
      price: 5200,
      flowers: [
        ['Гортензия', 23],
        ['Фиалка', 23],
        ['Кустарная роза', 23],
      ]
    },
  ]
}

// Будет ли разница в упаковке на разных размерах? Нет
//

const additionalProducts = [
  {
    id: 0,
    title: 'Modern clear vase',
    desc: 'Vase made from clear glass. Height 20 cm and width 13 cm made from good quality thick glass.',
    price: 900,
    image: 'https://images.serenataassets.com/image/upload/f_auto,q_auto/t_Product100s/v1/Raw/108406_standing'
  },
  {
    id: 1,
    title: 'Bellante Sparkling Rosé',
    desc: 'Bottle Size:75cl\n' +
      'Only 18+ can buy this item\n' +
      'Not available to send separately\n' +
      'Price includes delivery',
    price: 400,
    image: 'https://asset1.cxnmarksandspencer.com/is/image/mands/SD_FD_F44A_00367004_NC_X_EC_0?$PDP_ADD_CAR_IMAGE$'
  }
]


const images = [
  'https://klumba.store/api/crop/media/bafeed31-2c44-49cd-8c7f-c0ddddecd586.JPG?geometry=400x400&crop=center',
  'https://klumba.store/api/crop/media/%D0%93%D0%BE%D1%80%D1%82%D0%B5%D0%BD%D0%B7%D0%B8%D1%8F_%D0%A6%D0%B2%D0%B5%D1%82%D1%8B_%D0%A7%D0%B8%D1%82%D0%B0_%D0%94%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0_%D0%9A%D0%BB%D1%83%D0%BC%D0%B1%D0%B0_yVtD5M3.JPG?geometry=400x400&crop=center', // 1
  'https://klumba.store/api/crop/media/0c93f2f6-bfed-45f8-be9c-adfae9171914_wZIx1Yr.JPG?geometry=670x760&upscale=true&crop=center', // 0
  'https://klumba.store/api/crop/media/%D1%81%D0%B0%D0%BB%D0%B5%D0%BD%D0%B5%D1%80%D0%BE_%D0%BC_%D1%86%D0%B2%D0%B5%D1%82%D1%8B_%D1%87%D0%B8%D1%82%D0%B0_%D0%B4%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0_%D0%BA%D0%BB%D1%83%D0%BC%D0%B1%D0%B0.JPG?geometry=400x400&crop=center', // 2
  'https://klumba.store/api/crop/media/CCD7920A-A6F2-42F9-9EFA-8C0A6A939879_G87ayYX.jpg?geometry=400x400&crop=center', //3
  // '', //4
  // '', //5
  // '', //6
  // '', //7
  // '', //8
  // '', //9
  // 'https://klumba.store/api/crop/media/%D0%93%D0%BE%D1%80%D1%82%D0%B5%D0%BD%D0%B7%D0%B8%D0%B8_%D1%86%D0%B2%D0%B5%D1%82%D1%8B_%D1%87%D0%B8%D1%82%D0%B0_%D0%B4%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0_%D0%BA%D0%BB%D1%83%D0%BC%D0%B1%D0%B0.JPG?geometry=670x760&upscale=true&crop=center',
  // 'https://klumba.store/api/crop/media/%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5_viber_2019-06-23_10-51-04.jpg?geometry=670x760&upscale=true&crop=center',
  // 'https://klumba.store/api/crop/media/%D0%93%D0%BE%D1%80%D1%82%D0%B5%D0%BD%D0%B7%D0%B8%D1%8F_%D0%A6%D0%B2%D0%B5%D1%82%D1%8B_%D0%A7%D0%B8%D1%82%D0%B0_%D0%94%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0_%D0%9A%D0%BB%D1%83%D0%BC%D0%B1%D0%B0_yVtD5M3.JPG?geometry=670x760&upscale=true&crop=center',
]

console.log(new Array(20).fill(Object.assign({}, newModel)))

newModel.title = 'sdfsdf'

function generationProducts() {
  let arr = new Array(20).fill('');

  return arr.map((item, i) => {
    const prod = { ...model }
    prod.id = i
    prod.order = i
    prod.title = titles[getRandomInt(0, 4)]
    prod.slug = 'product' + i

    prod.available = {
      now: !!getRandomInt(0, 2),
      fromDate: new Date()
    }

    const randomFlowerId = getRandomInt(0, 5)
    const zeroSizeImage = images[randomFlowerId]


    const maxSizesCount = getRandomInt(2, 4)
    // console.log(maxSizesCount)
    //     console.log(0, maxSizesCount)
    // prod.sizes = [...model.sizes].splice(0, maxSizesCount)
    let sizesNew = []
    sizesNew[0] = { ...model.sizes[0] }
    sizesNew[1] = { ...model.sizes[1] }
    sizesNew[2] = { ...model.sizes[2] }

    sizesNew = sizesNew.splice(0, maxSizesCount)

    // console.log(prod.sizes)
    for (let size = 0; size < maxSizesCount; size++) {
      // console.log(size)
      let priceMin = 1300
      let priceMax = 2300
      let hMin = 20
      let hMax = 45
      let wMin = 30
      let wMax = 80
      if (size === 1) {
        priceMin = 2400
        priceMax = 4000
        hMin = 29
        wMin = 47
      }
      if (size === 2) {
        priceMin = 4300
        priceMax = 6400
        hMin = 38
        wMin = 68
      }

      sizesNew[size].h = getRandomInt(hMin, hMax)
      sizesNew[size].w = getRandomInt(wMin, wMax)

      sizesNew[size].id = size
      sizesNew[size].title = getNameById(size, productSizes)

      sizesNew[size].price = getRandomIntHundred(priceMin, priceMax)


      sizesNew[size].flowers = {
        ids: [randomFlowerId],
        counts: [getRandomInt(0, 30)]
      }

      if (size === 0) {
        sizesNew[size].image = zeroSizeImage
      }

      if (size === 1)
        sizesNew[size].image = 'https://klumba.store/api/crop/media/%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5_viber_2019-06-23_10-51-04.jpg?geometry=670x760&upscale=true&crop=center'

      if (size === 2)
        sizesNew[size].image = 'https://klumba.store/api/crop/media/%D0%93%D0%BE%D1%80%D1%82%D0%B5%D0%BD%D0%B7%D0%B8%D1%8F_%D0%A6%D0%B2%D0%B5%D1%82%D1%8B_%D0%A7%D0%B8%D1%82%D0%B0_%D0%94%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0_%D0%9A%D0%BB%D1%83%D0%BC%D0%B1%D0%B0_yVtD5M3.JPG?geometry=670x760&upscale=true&crop=center'

    }

    // console.log(sizesNew)
    prod.sizes = [...sizesNew]


    return prod


    // products.push(prod)
    // console.log(products[i])
  })
}


const initialState = {
  productSizes,
  productColors,
  productPacking,
  productGrass,
  flowers,
  additionalProducts,
  testProducts: new Array(50).fill(Object.assign({}, newModel)),
  products: generationProducts()
}


const catalog = (state = initialState, action) => {
  return state
}

export default catalog