import React, { Component } from 'react'
import { connect } from "react-redux"
import { Redirect } from 'react-router-dom'
import loadable from '@loadable/component'

import SizeInformer from "components/ProductPage/SizeInformer"
import GrassPluserButton from "components/ProductPage/GrassPluserButton"
import SizeButton from "components/ProductPage/SizeButton"
import Available from 'components/ProductPage/Available'
import Details from 'components/ProductPage/Details'

import styles from './Product.module.sass'
import PageLayout from "layouts/Page";

const fallback = () => (
  <div>Loading...</div>
)

const DatePicker = loadable(() => import('components/ProductPage/DatePicker'), fallback)
const FlowersInstruction = loadable(() => import('components/ProductPage/FlowersInstruction'), fallback)
const DeliveryInfo = loadable(() => import('components/ProductPage/DeliveryInfo'), fallback)
const AdditionalProducts = loadable(() => import('components/ProductPage/AdditionalProducts'), fallback)


class Product extends Component {
  constructor(props) {
    super(props)
    this.handleSizeButtonClick = this.handleSizeButtonClick.bind(this)
    this.handleGrassPluserButtonClick = this.handleGrassPluserButtonClick.bind(this)
  }

  state = {
    activeSizeIndex: 0,
    activeGrassIndex: 0
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

  renderGrassPluserButtons = (grasses) => (
    <div className={styles.grassPluserButtons}>
      {
        grasses.map((button, i) =>
          <GrassPluserButton
            key={i}
            index={i}
            title={button.name}
            price={button.price}
            active={this.state.activeGrassIndex === i}
            onClick={this.handleGrassPluserButtonClick}
          />
        )
      }
    </div>
  )


  renderSizesButtons = (sizes) => {
    return (
      <div className={styles.sizesButtons}>
        {
          sizes.map((size, i) =>
            <SizeButton
              key={i}
              sizeIndex={i}
              title={size.title}
              price={size.price}
              active={this.state.activeSizeIndex === i}
              onClick={this.handleSizeButtonClick}
            />
          )
        }
      </div>
    )
  }

  renderFlowers = (flowers) => (
    <ul className={styles.properties}>
      {
        flowers.map((flowerEntity, i) => {
            const [name, count] = flowerEntity
            return (
              <li key={i}>
                {name}: {count}
              </li>
            )
          }
        )
      }
    </ul>
  )

  render() {
    const { products, additionalProducts, grass } = this.props
    // const product = products[0]

    const product = products.find(item => item.slug === this.props.slug)
    if (!product) {
      return <Redirect to="/404"/>
    }

    const additProducts = additionalProducts.filter(
      item => product.additionalProducts.includes(item.id)
    )

    const activeSize = product.sizes[this.state.activeSizeIndex]
    const activeGrass = grass[this.state.activeGrassIndex]

    const totalPrice = activeSize.price + activeGrass.price

    return (
      <PageLayout>
        <div className="container mt-3">
          <div className="row">
            <div className={`col-6 ${styles.photo}`}>
              <div className={styles.photoSizeTitle}>
                {activeSize.title}
              </div>
              <img src={activeSize.image} alt=""/>
            </div>
            <div className={`col-6 ${styles.usn}`}>
              <h1>{product.title}</h1>

              <div
                onClick={() =>
                  this.setState(prevState => ({
                    available: {
                      ...prevState.available,
                      now: !prevState.available.now
                    }
                  }))
                }
              >
                <Available
                  {...product.available}
                />
              </div>

              {this.renderSizesButtons(product.sizes)}

              <SizeInformer
                className={styles.sizeInformer}
                h={activeSize.h}
                w={activeSize.w}
              />

              <div>
                Добавить зелени?
                {this.renderGrassPluserButtons(grass)}
              </div>

              <AdditionalProducts
                products={additProducts}
              />

              <br/>
              <h1>{totalPrice} {`\u20BD`}</h1>


              <p>Выберете дату доставки</p>
              <DatePicker
                startDate={new Date()}
              />

              <p>Купить в один клик</p>
              <h2>
                Флорист об этой композиции
                Фото круглое
                ФИ
                текст небольшой
              </h2>


              <Details>
                {
                  activeSize.flowers && (
                    <>
                      Состав
                      {this.renderFlowers(activeSize.flowers)}
                    </>
                  )
                }
              </Details>
              <FlowersInstruction/>
              <DeliveryInfo/>


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
      </PageLayout>
    )
  }
}

function mapStateToProps(state, ownProps) {
  // console.log(ownProps)
  // console.log(ownProps.match.params.product)
  return {
    products: state.catalog.products,
    additionalProducts: state.catalog.additionalProducts,
    grass: state.catalog.grass,
    slug: ownProps.match.params.product
  }
}

export default connect(
  mapStateToProps
)(Product)