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
import AdditionalProductsContainer from 'containers/additionalProductsContainer'

const fallback = () => (
  <div>Loading...</div>
)

const DatePicker = loadable(() =>
  pMinDelay(import('components/ProductDetails/DatePicker'), 500), {
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


  renderGrassPluserButtons = (grasses) => (
    <div className={styles.grassPluserButtons}>
      {grasses.map((button, i) =>
        <GrassPluserButton
          key={i}
          index={i}
          title={button.title}
          price={button.price}
          active={this.state.activeGrassIndex === i}
          onClick={this.handleGrassPluserButtonClick}
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


  handleSizeButtonClick = (activeSizeIndex) => {
    this.setState({
      activeSizeIndex
    })
  }

  handleGrassPluserButtonClick = (activeGrassIndex) => {
    this.setState({
      activeGrassIndex
    })
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

    // todo Понять как сделать редирект на 404
    // this.props.goToLink('/404')
    // if (!isLoading) return <Page404 />

    if (!product) return <Preloader/>

    const { activeSizeIndex, activeGrassIndex, showCalendar } = this.state
    const { florist, sizes } = product
    const activeSize = sizes[activeSizeIndex]
    const activeGrass = grass[activeGrassIndex]
    const totalPrice = activeSize.price + activeGrass.price

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

          <div style={{ marginTop: 20 }}>
            Добавить зелени?
            {this.renderGrassPluserButtons(grass)}
          </div>


          <AdditionalProductsContainer/>

          <br/>
          <h1>{totalPrice} <RoubleSymbol/></h1>

          <p>Когда доставить?</p>
          {!showCalendar && (
            <div className={styles.delivery}>
              <div>Сегодня</div>
              <div>Завтра</div>
              <div onClick={() => this.setState(prevState => ({
                showCalendar: !prevState.showCalendar
              }))}
              >
                Выбрать
              </div>
            </div>
          )}

          {showCalendar && (
            <DatePicker
              isOpen={true}
              startDate={new Date()}
            />
          )}

          <div>В козину</div>
          <p>Купить в один клик</p>

          <Details>
            {activeSize.flowers && (
              <>
                Состав композиции:
                {this.renderFlowers(activeSize.flowers)}
              </>
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