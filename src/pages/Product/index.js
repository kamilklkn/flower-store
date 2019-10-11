import React, { Component } from 'react'
import { connect } from "react-redux"
import loadable from '@loadable/component'
import SizeInformer from "components/ProductPage/SizeInformer"

import GrassPluserButton from "components/ProductPage/GrassPluserButton"
import SizeButton from "components/ProductPage/SizeButton"
import Available from 'components/ProductPage/Available'
import Details from 'components/ProductPage/Details'

import styles from './Product.module.sass'
import { getNameById } from "utils"

import { Redirect } from 'react-router-dom'


// import DatePicker from 'components/ProductPage/DatePicker'

const fallback = () => (
  <div>Loading...</div>
)

const DatePicker = loadable(() => import('components/ProductPage/DatePicker'), fallback)
const FlowersInstruction = loadable(() => import('components/ProductPage/FlowersInstruction'), fallback)
const DeliveryInfo = loadable(() => import('components/ProductPage/DeliveryInfo'), fallback)


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

  renderGrassPluserButtons = (grasses) => {
    return (
      <div>
        Добавить зелени?
        <div className={styles.grassPluserButtons}>
          {
            grasses.map((button, i) =>
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

  renderFlowers = (activeSize, flowersTitles) => {
    return (
      <>
        Состав
        <ul className={styles.properties}>
          {
            activeSize.flowers.ids.map((flowerId, i) => {
                const flowerName = getNameById(flowerId, flowersTitles)
                console.log(flowerName)
                // console.log(flower.id)
                return (
                  <li key={i}>
                    {flowerName}: {activeSize.flowers.counts[i]}
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
    const { products, ...titles } = this.props.catalog
    // const product = products[0]

    const product = products.find(item => item.slug === this.props.slug)
    if (!product) {
      return <Redirect to="/404" />
    }


    console.log(this.props.slug)
    const activeSize = product.sizes[this.state.activeSizeIndex]
    const activeGrass = titles.productGrass[this.state.activeGrassIndex]

    const totalPrice = activeSize.price
      + activeGrass.price

    return (
      <div className="container mt-3">
        <div className="row">
          <div className={`col-6 ${styles.photo}`}>
            <div className={styles.photoSizeTitle}>
              {activeSize.title}
            </div>
            <img src={activeSize.image || this.state.sizes[0].image} alt=""/>
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

            {this.renderGrassPluserButtons(titles.productGrass)}


            <br/>
            <h1>{totalPrice} {`\u20BD`}</h1>

            <p>Выберете дату доставки</p>
            <DatePicker
              startDate={new Date()}
            />

            <p>Купить в один клик</p>

            <Details>
              {
                activeSize.flowers && this.renderFlowers(activeSize, titles.flowers)
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
    )
  }
}

function mapStateToProps(state, ownProps) {
  // console.log(ownProps)
  // console.log(ownProps.match.params.product)
  return {
    catalog: state.catalog,
    slug: ownProps.match.params.product
  }
}

export default connect(
  mapStateToProps
)(Product)