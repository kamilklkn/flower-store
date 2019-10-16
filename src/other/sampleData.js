// import React from 'react'
import random from 'lodash/random'

import im1 from "assets/1.jpeg"
import im2 from "assets/2.jpg"
import im3 from "assets/3.jpeg"
import im4 from "assets/4.jpeg"
import im5 from "assets/5.jpeg"
import im6 from "assets/6.jpeg"


// const titles = [
//   'Монобукет Мисти Бабблс',
//   'Монобукет Аква',
//   'Гортензия',
//   'Сборный букет «Персиковый»',
//   'Монобукет Аскот'
// ]

// const images = [
//   'https://klumba.store/api/crop/media/bafeed31-2c44-49cd-8c7f-c0ddddecd586.JPG?geometry=400x400&crop=center',
//   'https://klumba.store/api/crop/media/%D0%93%D0%BE%D1%80%D1%82%D0%B5%D0%BD%D0%B7%D0%B8%D1%8F_%D0%A6%D0%B2%D0%B5%D1%82%D1%8B_%D0%A7%D0%B8%D1%82%D0%B0_%D0%94%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0_%D0%9A%D0%BB%D1%83%D0%BC%D0%B1%D0%B0_yVtD5M3.JPG?geometry=400x400&crop=center', // 1
//   'https://klumba.store/api/crop/media/0c93f2f6-bfed-45f8-be9c-adfae9171914_wZIx1Yr.JPG?geometry=670x760&upscale=true&crop=center', // 0
//   'https://klumba.store/api/crop/media/%D1%81%D0%B0%D0%BB%D0%B5%D0%BD%D0%B5%D1%80%D0%BE_%D0%BC_%D1%86%D0%B2%D0%B5%D1%82%D1%8B_%D1%87%D0%B8%D1%82%D0%B0_%D0%B4%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0_%D0%BA%D0%BB%D1%83%D0%BC%D0%B1%D0%B0.JPG?geometry=400x400&crop=center', // 2
//   'https://klumba.store/api/crop/media/CCD7920A-A6F2-42F9-9EFA-8C0A6A939879_G87ayYX.jpg?geometry=400x400&crop=center', //3
//   // '', //4
//   // '', //5
//   // '', //6
//   // '', //7
//   // '', //8
//   // '', //9
//   // 'https://klumba.store/api/crop/media/%D0%93%D0%BE%D1%80%D1%82%D0%B5%D0%BD%D0%B7%D0%B8%D0%B8_%D1%86%D0%B2%D0%B5%D1%82%D1%8B_%D1%87%D0%B8%D1%82%D0%B0_%D0%B4%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0_%D0%BA%D0%BB%D1%83%D0%BC%D0%B1%D0%B0.JPG?geometry=670x760&upscale=true&crop=center',
//   // 'https://klumba.store/api/crop/media/%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5_viber_2019-06-23_10-51-04.jpg?geometry=670x760&upscale=true&crop=center',
//   // 'https://klumba.store/api/crop/media/%D0%93%D0%BE%D1%80%D1%82%D0%B5%D0%BD%D0%B7%D0%B8%D1%8F_%D0%A6%D0%B2%D0%B5%D1%82%D1%8B_%D0%A7%D0%B8%D1%82%D0%B0_%D0%94%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0_%D0%9A%D0%BB%D1%83%D0%BC%D0%B1%D0%B0_yVtD5M3.JPG?geometry=670x760&upscale=true&crop=center',
// ]


const photoModels = [
  {
    title: 'Гортензия',
    shade: 'Темный',
    sizes: [
      {
        flowers: [
          ['Гортензия', 17]
        ],
        image: im1,
      },
      {
        flowers: [
          ['Гортензия', 29]
        ],
        image: im2,
      },
      {
        flowers: [
          ['Гортензия', 15]
        ],
        image: im3,
      }
    ]
  },
  {
    title: 'Монобукет кустовой розы',
    shade: 'Нежный',
    sizes: [
      {
        flowers: [
          ['Кустовая роза', 15]
        ],
        image: im4,
      },
      {
        flowers: [
          ['Кустовая роза', 35],
          ['Фиалка', 23],
          ['Кустовая роза', 23],
        ],
        image: im5,
      },
      {
        flowers: [
          ['Кустовая роза', 67],
          ['Фиалка', 23],
          ['Кустовая роза', 23],
        ],
        image: im6,
      }
    ]
  }
]


const newModel = {
  id: 1,
  order: 1,
  title: 'Монобукет Мисти Бабблс',
  slug: 'monobuket-kustovoj-pionovidnoj-rozy',
  desc: '',
  // activeSizeIndex: 0,
  // activeGrassIndex: 0,
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
        ['Б Цветок 1', 23],
        ['Б Цветок 2', 23],
        ['Б Цветок 3', 23],
      ]
    },
    {
      title: 'Премиум',
      h: 50,
      w: 68,
      image: 'f_auto,q_auto/t_Product100s/v1/R',
      price: 5200,
      flowers: [
        ['Цветок 1', 23],
        ['Цветок 2', 23],
        ['Цветок 3', 23],
      ]
    },
  ]
}

export function generateProducts() {
  let items = new Array(20).fill(Object.assign({}, newModel));

  return items.map((item, i) => {
    const product = { ...item }

    const photoModelRandomIndex = random(0, photoModels.length - 1)
    const photoModel = photoModels[photoModelRandomIndex]

    product.id = i
    product.order = i
    // product.title = titles[random(0, 3)]
    product.title = photoModel.title
    product.shade = photoModel.shade
    product.slug = 'product' + i

    product.available = {
      now: !!random(0, 1),
      fromDate: new Date()
    }

    const SizesCount = random(1, 3)
    const startIndexSplice = random(0, 2)
    product.sizes = [...newModel.sizes].splice(startIndexSplice, SizesCount)
    const photoModelSizes = [...photoModel.sizes].splice(startIndexSplice, SizesCount)

    for (let a = 0; a < product.sizes.length; a++) {
      // формируем цветы, фото и названия в зависимости от изображения
      product.sizes[a] = {
        ...product.sizes[a],
        ...photoModelSizes[a]
      }
    }

    // console.log(product.sizes)
    //  0  1  2
    //     1  2
    //  0  1
    //  0
    //        2

    for (let a = 0; a < product.sizes.length; a++) {
      let priceMin = 9
      let priceMax = 23
      let hMin = 20
      let hMax = 45
      let wMin = 30
      let wMax = 80
      if (a === 1) {
        priceMin = 24
        priceMax = 40
        hMin = 29
        wMin = 47
      }
      if (a === 2) {
        priceMin = 43
        priceMax = 64
        hMin = 38
        wMin = 68
      }

      product.sizes[a].h = random(hMin, hMax)
      product.sizes[a].w = random(wMin, wMax)

      product.sizes[a].price = random(priceMin, priceMax) * 100
    }


    // if (product.sizes[0].title !== newModel.sizes[0].title)
    //   product.title = <>{product.title} <b>{product.sizes[0].title}</b></>


    return product
  })
}
