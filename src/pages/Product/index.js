import React, { Component } from 'react'
import loadable from '@loadable/component'
import SizeInformer from "components/ProductPage/SizeInformer"

import GrassPluserButton from "components/ProductPage/GrassPluserButton"
import SizeButton from "components/ProductPage/SizeButton"
import Available from 'components/ProductPage/Available'

import styles from './Product.module.sass'

// import DatePicker from 'components/ProductPage/DatePicker'


const DatePicker = loadable(() => import('components/ProductPage/DatePicker'))
const FlowersInstruction = loadable(() => import('components/ProductPage/FlowersInstruction'))
const DeliveryInfo = loadable(() => import('components/ProductPage/DeliveryInfo'))


class Product extends Component {
  constructor(props) {
    super(props)
    this.handleSizeButtonClick = this.handleSizeButtonClick.bind(this)
    this.handleGrassPluserButtonClick = this.handleGrassPluserButtonClick.bind(this)
  }

  state = {
    flowers: [
      {
        id: 0,
        name: 'Розы',
      },
      {
        id: 1,
        name: 'Гортензии'
      }
    ],
    sizesTitles: [
      'Стандартный', 'Большой', 'Премиум', 'Вау!'
    ],
    grassItems: [
      {
        title: 'Нет',
        price: 0
      },
      {
        title: 'Немного',
        price: 100
      },
      {
        title: 'Побольше',
        price: 300
      }
    ],

    id: 1,
    order: 1,
    available: {
      now: false,
      fromDate: new Date()
    },
    activeSizeIndex: 0,
    activeGrassIndex: 0,
    title: 'Монобукет Мисти Бабблс',
    slug: 'monobuket-kustovoj-pionovidnoj-rozy',
    desc: '',
    sizes: [
      {
        id: 0,
        h: 25,
        w: 35,
        image: 'https://klumba.store/api/crop/media/%D0%93%D0%BE%D1%80%D1%82%D0%B5%D0%BD%D0%B7%D0%B8%D0%B8_%D1%86%D0%B2%D0%B5%D1%82%D1%8B_%D1%87%D0%B8%D1%82%D0%B0_%D0%B4%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0_%D0%BA%D0%BB%D1%83%D0%BC%D0%B1%D0%B0.JPG?geometry=670x760&upscale=true&crop=center',
        price: 2500,
        properties: [
          {
            id: 1,
            count: 12
          },
          {
            id: 0,
            count: 8
          }
        ]
      },
      {
        id: 1,
        h: 34,
        w: 40,
        image: 'https://klumba.store/api/crop/media/%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5_viber_2019-06-23_10-51-04.jpg?geometry=670x760&upscale=true&crop=center',
        price: 3400
      },
      {
        id: 2,
        h: 50,
        w: 68,
        image: 'https://klumba.store/api/crop/media/%D0%93%D0%BE%D1%80%D1%82%D0%B5%D0%BD%D0%B7%D0%B8%D1%8F_%D0%A6%D0%B2%D0%B5%D1%82%D1%8B_%D0%A7%D0%B8%D1%82%D0%B0_%D0%94%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0_%D0%9A%D0%BB%D1%83%D0%BC%D0%B1%D0%B0_yVtD5M3.JPG?geometry=670x760&upscale=true&crop=center',
        price: 5200
      },
    ]
  }

  handleSizeButtonClick = (itemIndex) => {
    console.log(itemIndex)
    this.setState({
      activeSizeIndex: itemIndex
    })
  }

  handleGrassPluserButtonClick = (itemIndex) => {
    console.log(itemIndex)
    this.setState({
      activeGrassIndex: itemIndex
    })
  }

  renderGrassPluserButtons = () => {
    return (
      <div>
        Добавить зелени?
        <div className={styles.grassPluserButtons}>
          {
            this.state.grassItems.map((button, i) =>
              <GrassPluserButton
                key={i}
                index={i}
                title={button.title}
                price={button.price}
                active={this.state.activeGrassIndex === i}
                onClick={this.handleGrassPluserButtonClick}
              />
            )
          }
        </div>
      </div>
    )
  }

  renderSizesButtons = () => {
    return (
      <div className={styles.sizesButtons}>
        {
          this.state.sizes.map((size, i) =>
            <SizeButton
              key={i}
              sizeIndex={i}
              title={this.state.sizesTitles[i]}
              price={size.price}
              active={this.state.activeSizeIndex === i}
              onClick={this.handleSizeButtonClick}
            />
          )
        }
      </div>
    )
  }

  renderProperties = (activeSize) => {
    return (
      <>
        <h4>Состав</h4>
        <ul className={styles.properties}>
          {
            activeSize.properties.map((item, i) => {
                const flowerName = this.state.flowers[i].name
                // console.log(flower)
                // console.log(flower.id)
                return (
                  <li key={i}>
                    {flowerName}: {item.count}
                  </li>
                )
              }
            )
          }
        </ul>
      </>
    )
  }


  render() {
    const activeSize = this.state.sizes[this.state.activeSizeIndex]
    const activeSizeTitle = this.state.sizesTitles[this.state.activeSizeIndex]
    const activeGrass = this.state.grassItems[this.state.activeGrassIndex]
    const totalPrice = activeSize.price
      + activeGrass.price

    return (
      <div className="container mt-3">
        <div className="row">
          <div className={`col-6 ${styles.photo}`}>
            <div className={styles.photoSizeTitle}>
              {activeSizeTitle}
            </div>
            <img src={activeSize.image || this.state.sizes[0].image} alt=""/>
          </div>
          <div className={`col-6 ${styles.usn}`}>
            <h1>{this.state.title}</h1>

            <div
              onClick={() => this.setState(prevState => ({
                available: {
                  ...prevState.available,
                  now: !prevState.available.now
                }
              }))}
            >
              <Available
                {...this.state.available}
              />
            </div>

            {this.renderSizesButtons()}

            <SizeInformer
              className={styles.sizeInformer}
              h={activeSize.h}
              w={activeSize.w}
            />

            {this.renderGrassPluserButtons()}


            <br/>
            <h1>{totalPrice} {`\u20BD`}</h1>


            <p>Выберете дату доставки</p>
            {/*<DatePicker*/}
              {/*fallback={<div>Loading...</div>}*/}
              {/*startDate={new Date()}*/}
            {/*/>*/}

            <p>Купить в один клик</p>

            {/*<Details>*/}
            <p>
              Детали
              Состав (composition)
              Упаковка
            </p>
            <FlowersInstruction/>
            <DeliveryInfo/>


            {
              activeSize.properties && this.renderProperties(activeSize)
            }

            <div>
              <p>Поделится</p>
            </div>


            <div>
              Остались вопросы? Звоните!
              8 (914) 358-56-55
              WhatsApp / Viber / Telegram

            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default Product