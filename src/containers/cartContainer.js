import React, { Component } from 'react'
import { connect } from "react-redux"
import cn from 'classnames'
import styles from './cartContainer.module.sass'
import Preloader from "components/Preloader"
import RoubleSymbol from "components/UI/RoubleSymbol"
import {
  getAdditionalItemsSelector,
  getItemsSelector,
  totalPriceSelector, totalSelector
} from "store/selectors/cart"
import {
  cartProductDecrease,
  cartProductIncrease,
  cartProductRemove
} from "store/actions/cart/productsActions"
import {
  cartAdditionalProductDecrease,
  cartAdditionalProductIncrease,
  cartAdditionalProductRemove
} from "store/actions/cart/additionalProductsActions"


// import TextField from '@material-ui/core/TextField'
// import Input from '@material-ui/core/Input'

// import "bootstrap/scss/bootstrap.scss"


// import FilledInput from '@bit/mui-org.material-ui.filled-input'
// import FormHelperText from '@bit/mui-org.material-ui.form-helper-text'
// import Input from '@bit/mui-org.material-ui.input'

// use it
// import { makeStyles } from '@bit/mui-org.material-ui.styles'
// import FormControl from '@bit/mui-org.material-ui.form-control'
// import InputLabel from '@bit/mui-org.material-ui.input-label'
// import OutlinedInput from '@bit/mui-org.material-ui.outlined-input'


// const useStyles = makeStyles(theme => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap'
//   },
//   formControl: {
//     margin: theme.spacing(1)
//   }
// }))

// const Input = ({ placeholder, value, onChange }) => {
//   const [labelWidth, setLabelWidth] = React.useState(0)
//   const labelRef = React.useRef(null)
//   const classes = useStyles()
//
//   React.useEffect(() => {
//     setLabelWidth(labelRef.current.offsetWidth)
//   }, [])
//
//   return (
//     <FormControl className={classes.formControl} variant="outlined">
//       <InputLabel ref={labelRef} htmlFor="component-outlined">
//         {placeholder}
//       </InputLabel>
//       <OutlinedInput
//         id="component-outlined"
//         value={value}
//         onChange={onChange}
//         labelWidth={labelWidth}
//       />
//     </FormControl>
//   )
// }


const payOptions = {
  money: 'Наличными при получении',
  card: 'Оплата банковской картой Visa, Mastercard, Мир'
}


// const Pay = ({ onSelected }) => {
//   const [genderValue, genderInputProps] = useRadioButtons(payOptions.money)
//
//
//   React.useEffect(() => {
//     onSelected(genderValue)
//   }, [genderValue])
//
//   return (
//     <div>
//       {/*<form>*/}
//       {/*<fieldset>*/}
//
//       <input
//         value={payOptions.money}
//         checked={genderValue === payOptions.money}
//         {...genderInputProps}
//       />
//
//
//       <input
//         value={payOptions.card}
//         checked={genderValue === payOptions.card}
//         {...genderInputProps}
//       />
//
//       <input
//         value={payOptions.card}
//         checked={genderValue === payOptions.card}
//         {...genderInputProps}
//       />
//       {/*</fieldset>*/}
//       {/*</form>*/}
//     </div>
//   )
// }


// function useRadioButtons(name) {
//   const [value, setState] = useState(name)
//
//   const handleChange = e => {
//     setState(e.target.value)
//   }
//
//   const inputProps = {
//     name,
//     type: "radio",
//     onChange: handleChange
//   }
//
//   return [value, inputProps]
// }


class CartContainer extends Component {
  state = {
    name: '',
    phone: '',
    loading: false,
    labelWidth: 0,
    pay: 'Наличными при получении'
  }


  handleRemoveItem = (id) => {
    this.props.onRemoveItem(id)
  }


  handleRemoveAdditionalItem = id => {
    this.props.onRemoveAdditionalItem(id)
  }

  handleProductIncrease = id => {
    this.props.onIncreaseItem(id)
  }

  handleProductDecrease = id => {
    this.props.onDecreaseItem(id)
  }

  handleAdditionalProductIncrease = id => {
    this.props.onIncreaseAdditionalItem(id)
  }

  handleAdditionalProductDecrease = id => {
    this.props.onDecreaseAdditionalItem(id)
  }

  handleChange = (stateKey, value) => {
    this.setState({
      [stateKey]: value
    })
  }

  handlePay = (value) => {
    // const { name, value } = event.target;

    this.setState({
      pay: value
    })
  }


  renderProductsInCart = (items, onIncrease, onDecrease, onRemove) =>
    items.map(({ id, image, title, price, count }) => (
      <div key={id} className={cn(styles.product, 'row', 'align-items-center', 'justify-content-between')}>
        <div className="col-2">
          <img src={image} alt={title} style={{ maxWidth: '100%' }}/>
        </div>
        <div className={cn('col-5', styles.title)}>
          {title}
        </div>
        <div className={cn('col-2', styles.counter)}>
          <button onClick={() => onDecrease(id)} disabled={count === 1}>-</button>
          {count}
          <button onClick={() => onIncrease(id)}>+</button>
        </div>
        <div className={cn('col-2', styles.price)}>
          <b>{price.toLocaleString('ru-RU')} <RoubleSymbol/></b>
        </div>
        <div className="col-1">
          <button onClick={() => onRemove(id)}>Удалить</button>
        </div>
      </div>
    ))


  renderAdditionalProductsInCart = (...arg) =>
    this.renderProductsInCart(...arg)


  render() {
    const { loading } = this.state
    if (loading) return <Preloader/>

    const { products, additionalProducts, totalPrice } = this.props
console.log(additionalProducts)

    return (
      <div className={cn('row', 'justify-content-center', 'cart')}>
        <div className="col-9">
          <h1>Корзина</h1>

          {/*<div className={cn('row', '')}>*/}
          {/*<div className="col-12">*/}

          {
            this.renderProductsInCart(
              products,
              this.handleProductIncrease,
              this.handleProductDecrease,
              this.handleRemoveItem
            )
          }

          {!!additionalProducts.length && (
            <h3>Дополнительно:</h3>
          )}
          {
            this.renderAdditionalProductsInCart(
              additionalProducts,
              this.handleAdditionalProductIncrease,
              this.handleAdditionalProductDecrease,
              this.handleRemoveAdditionalItem
            )
          }

          <p className={styles.allCost}>
            Сумма заказа: <b>{totalPrice.toLocaleString('ru-RU')} <RoubleSymbol/></b>
          </p>

          {/*</div>*/}
          {/*</div>*/}


          Дата доставки
          Время доставки

          {/*<Input*/}
          {/*placeholder="Ваше имя"*/}
          {/*value={this.state.name}*/}
          {/*onChange={(event) => this.handleChange('name', event.target.value)}/>*/}

          {/*<Input*/}
          {/*placeholder="+7 (___) ___-____"*/}
          {/*value={this.state.phone}*/}
          {/*onChange={(event) => this.handleChange('phone', event.target.value)}/>*/}

          {/*<TextField*/}
          {/*outlined*/}
          {/*label='Ваше имя'*/}
          {/*>*/}
          {/*<Input*/}
          {/*value={this.state.value}*/}
          {/*onChange={(e) => this.setState({value: e.currentTarget.value})} />*/}
          {/*</TextField>*/}


          <h2>Получатель</h2>
          {/*<Input*/}
          {/*placeholder="Имя"*/}
          {/*value={this.state.name}*/}
          {/*onChange={(event) => this.handleChange('name', event.target.value)}/>*/}

          {/*<Input*/}
          {/*placeholder="+7 (___) ___-____"*/}
          {/*value={this.state.phone}*/}
          {/*onChange={(event) => this.handleChange('phone', event.target.value)}/>*/}

          Добавить визитку c запиской - бесплатно!
          Записка на открытке


          <h3>Способ оплаты</h3>
          {/*<Pay onSelected={this.handlePay}/>*/}
          {this.state.pay}
          {/*/!*https://codesandbox.io/s/6l6v9p0qkr*!/*/}
          {/*<div>*/}
          {/*<input type="radio"*/}
          {/*name="payMoney"*/}
          {/*value={this.payOptions.money}*/}
          {/*checked={true}*/}
          {/*onChange={this.handlePay}/>{this.payOptions.money}*/}

          {/*<input type="radio"*/}
          {/*name="payCard"*/}
          {/*value={this.payOptions.card}*/}
          {/*onChange={this.handlePay}/>{this.payOptions.card}*/}
          {/*</div>*/}


          <button type="button" className="btn btn-primary">Главный</button>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  products: getItemsSelector(state),
  additionalProducts: getAdditionalItemsSelector(state),
  totalPrice: totalSelector(state)
})

const mapDispatchToProps = dispatch => ({
  onIncreaseItem: (id) => dispatch(cartProductIncrease(id)),
  onDecreaseItem: (id) => dispatch(cartProductDecrease(id)),
  onRemoveItem: (id) => dispatch(cartProductRemove(id)),

  onIncreaseAdditionalItem: (id) => dispatch(cartAdditionalProductIncrease(id)),
  onDecreaseAdditionalItem: (id) => dispatch(cartAdditionalProductDecrease(id)),
  onRemoveAdditionalItem: (id) => dispatch(cartAdditionalProductRemove(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartContainer)