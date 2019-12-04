import React, { Component } from 'react'
import { connect } from "react-redux"
import styles from "./productDetails.module.sass"
// import propTypes from "prop-types"
// import Page404 from "pages/404"
// import { getRouter } from "store/selectors/router"
import { push } from 'connected-react-router'
import loadable from "@loadable/component"
import pMinDelay from 'p-min-delay'
import Preloader from "components/Preloader"
import { slugFromUrlSelector } from "store/selectors/router"
import { fetchProduct } from "store/actions/productsActions"
import { activeProductSelector, grassSelector } from "store/selectors/product"
import FloristSay from "components/ProductDetails/FloristSay"
import Available from "components/ProductDetails/Available"
import SizeButton from "components/ProductDetails/SizeButton"
import GrassPluserButton from "components/ProductDetails/GrassPluserButton"
import SizeInformer from "components/ProductDetails/SizeInformer"
import RoubleSymbol from "components/UI/RoubleSymbol"
import Details from "components/ProductDetails/Details"
import FlowersInstruction from "components/ProductDetails/FlowersInstruction"
import DeliveryInfo from "components/ProductDetails/DeliveryInfo"

const fallback = () => (
  <div>Loading...</div>
)

const DatePicker = loadable(() =>
  pMinDelay(import('components/ProductDetails/DatePicker'), 500), {
  fallback: fallback()
})

const AdditionalProducts = loadable(() =>
  pMinDelay(import('containers/additionalProductsContainer'), 100), {
  fallback: fallback()
})


class ProductDetailsContainer extends Component {
  // static propTypes = {
  //   products: propTypes.array.isRequired
  // }

  static defaultProps = {
    product: {}
  }

  state = {
    activeSizeIndex: 0,
    activeGrassIndex: 0,
    activeBoxIndex: 0,
    activeAdditionalProducts: [],
    showCalendar: false,
    error: false
  }

  renderSizesButtons = (sizes) => {
    return (
      <div className={styles.sizesButtons}>
        {sizes.map((size, i) =>
          <SizeButton
            key={i}
            sizeIndex={i}
            title={size.title}
            price={size.price}
            active={this.state.activeSizeIndex === i}
            onClick={this.handleSizeButtonClick}
          />
        )}
      </div>
    )
  }


  renderGrassPluserButtons = (grasses, activeIndex, onClick) => (
    <div className={styles.grassPluserButtons}>
      {grasses.map((button, i) =>
        <GrassPluserButton
          key={i}
          index={i}
          title={button.title}
          price={button.price}
          active={activeIndex === i}
          onClick={onClick}
        />
      )}
    </div>
  )

  renderFlowers = (flowers) => (
    <ul className={styles.properties}>
      {flowers.map((flowerEntity, i) => {
          const [name, count] = flowerEntity
          return (
            <li key={i}>
              <b>{name}:</b> {count} шт.
            </li>
          )
        }
      )}
    </ul>
  )

  getTotalPriceAdditionalProducts = () => {
    return this.state.activeAdditionalProducts.reduce(
      (total, current) => {
        if (Object.prototype.hasOwnProperty.call(current, 'price')) {
          return total + current.price
        } else {
          return total
        }
      }, 0)
  }

  getAdditionalProductsIds = () => {
    return this.state.activeAdditionalProducts.map(({ id }) => id)
  }

  handleSizeButtonClick = (activeSizeIndex) => {
    this.setState({
      activeSizeIndex
    })
  }

  handleGrassButtonClick = (activeGrassIndex) => {
    this.setState({
      activeGrassIndex
    })
  }

  handleBoxButtonClick = (activeBoxIndex) => {
    this.setState({
      activeBoxIndex
    })
  }

  handleAdditionalProductClick = ({ id, price }) => {
    if (this.getAdditionalProductsIds().includes(id)) {
      this.setState(prevState => ({
        activeAdditionalProducts:
          prevState.activeAdditionalProducts.filter(item => item.id !== id)
      }))
    } else {
      const newItem = {
        id,
        price
      }
      this.setState(prevState => ({
        activeAdditionalProducts:
          [...prevState.activeAdditionalProducts, newItem]
      }))
    }
  }

  componentDidMount() {
    const { slug, fetchProduct } = this.props

    if (slug) {
      fetchProduct(slug)
    } else {
      this.setState({
        error: true
      })
    }
  }

  render() {
    const { product, grass } = this.props

    const box = [
      {
        id: "id0",
        price: 0,
        title: "Нет"
      },
      {
        id: "id0",
        price: 1500,
        title: "Да"
      }
    ]

    // todo Понять как сделать редирект на 404
    // this.props.goToLink('/404')
    // if (!isLoading) return <Page404 />

    if (!product) return <Preloader/>

    const {
      activeSizeIndex, activeGrassIndex, activeBoxIndex,
      activeAdditionalProducts,
      showCalendar
    } = this.state
    const { florist, sizes } = product
    const activeSize = sizes[activeSizeIndex]
    const activeGrass = grass[activeGrassIndex]
    const activeBox = box[activeBoxIndex]
    const totalPrice =
      activeSize.price + activeGrass.price + activeBox.price +
      this.getTotalPriceAdditionalProducts()

    return (
      <div className="row mt-2">
        <div className={`col-5 ${styles.photo}`}>
          <div className={styles.photoSizeTitle}>
            «{activeSize.title}»
          </div>
          <img src={activeSize.image} alt=""/>

          <FloristSay
            photo={florist.photo}
            name={florist.name}
            text={florist.text}
          />

          <FlowersInstruction/>
        </div>
        <div className={`col-7 ${styles.usn}`}>
          <h1>{product.title}</h1>

          <Available {...product.available}/>

          {this.renderSizesButtons(product.sizes)}

          <SizeInformer
            className={styles.sizeInformer}
            h={activeSize.h}
            w={activeSize.w}
          />

          <p className={styles.btitle}>Добавить зелени?</p>
          {this.renderGrassPluserButtons(
            grass,
            activeGrassIndex,
            this.handleGrassButtonClick
          )}

          {product.title.includes('Сборный') && (
            <>
              <p className={styles.btitle}>Использовать бархатную коробку?</p>
              {this.renderGrassPluserButtons(
                box,
                activeBoxIndex,
                this.handleBoxButtonClick
              )}
            </>
          )}

          {/*// todo Дополнительные фото к товару*/}
          {/*// todo Выделение и подсчет доп товара*/}
          {/*// todo Добавление товара в корзину*/}
          {/*// todo  ОК  Дополнительная Каробка бархатная как трава*/}
          {/*// todo Отзыв случайный*/}

          <p className={styles.btitle}>Приятные мелочи</p>
          <AdditionalProducts
            activeIds={this.getAdditionalProductsIds()}
            onClick={this.handleAdditionalProductClick}
          />


          <p className={styles.btitle}>Когда доставить?</p>
          {!showCalendar && (
            <div className={styles.deliveryButtons}>
              <div>Сегодня <span>11 декабря</span></div>
              <div>Завтра <span>12 декабря</span></div>
              <div onClick={() => this.setState(prevState => ({
                showCalendar: !prevState.showCalendar
              }))}
              >
                {`Выбрать дату`}
              </div>
            </div>
          )}

          {showCalendar && (
            <DatePicker
              isOpen={true}
              startDate={new Date()}
            />
          )}

          <br/>
          <h1>{totalPrice.toLocaleString('ru-RU')} <RoubleSymbol/></h1>


          <div>В козину</div>
          <p>Купить в один клик</p>

          <Details>
            {activeSize.flowers && (
             this.renderFlowers(activeSize.flowers)
            )}
          </Details>

          <DeliveryInfo/>

        </div>
      </div>
    )
  }
}

// todo СДЕЛАЙ ТО, ЧТО НАПИСАНО ВО ВКЛАДКАХ СПРАВА

// https://codesandbox.io/s/github/reduxjs/redux/tree/master/examples/shopping-cart?from-embed

const mapStateToProps = state => ({
  slug: slugFromUrlSelector(state),
  product: activeProductSelector(state),
  grass: grassSelector(state)
})

const mapDispatchToProps = dispatch => ({
  fetchProduct: (slug) => {
    console.log(slug)
    return dispatch(fetchProduct(slug))
  },
  goToLink: push
})

// todo https://stackoverflow.com/questions/49213602/how-to-get-id-params-to-redux-action-from-react-router
// todo use it

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailsContainer)