import React, { Component } from 'react'
import cn from 'classnames'
import * as Yup from 'yup'
// import styles from './cartContainer.module.sass'
import { Row } from "components/Bootstrap"
import Step from "components/Cart/Common/Step"
import NextButton from "components/Cart/Common/NextButton"
import ChangeButton from "components/Cart/Common/ChangeButton"
import CustomerForm from "components/Cart/Steps/CustomerFrom"
import CustomerResult from "components/Cart/Steps/CustomerResult"
import RecipientForm from "components/Cart/Steps/RecipientForm"
import RecipientResult from "components/Cart/Steps/RecipientResult"
import DeliveryResult from "components/Cart/Steps/DeliveryResult"
import DeliveryForm from "components/Cart/Steps/DeliveryForm"
import DeliveryTimeForm from "components/Cart/Steps/DeliveryTimeForm"
import DeliveryTimeResult from "components/Cart/Steps/DeliveryTimeResult"
import PayForm from "components/Cart/Steps/PayForm"
import PayResult from "components/Cart/Steps/PayResult"
import { DELIVERY_IS, PAY_TYPES } from "constants/common"

const initialState = {
   customer: {
      isEdit: true,
      isValid: false,
      name: 'Алексей',
      phone: '+79960225657'
   },
   recipient: {
      isEdit: false,
      isValid: false,
      iamResipient: false,
      iDontKnowRecipientNumber: false,
      name: '',
      phone: '',
      postcard: true,
      postcardText: ''
      // photoWithRecipient: false,
      // isSurprice: false,
      // anonymousCustomer: false
   },
   delivery: {
      isEdit: false,
      isValid: false,
      is: DELIVERY_IS.COURIER,
      courierDirection: {
         askRecipient: false,
         street: 'dffs',
         house: '',
         flat: '',
         comment: '',
         price: 0
      }
   },
   deliveryDateTime: {
      isEdit: false,
      isValid: false,
      askRecipient: false
   },
   pay: {
      isEdit: false,
      isValid: false,
      payType: PAY_TYPES.CARD,
      legalEntity: {
         name: '',
         inn: '',
         kpp: ''
      }
   },
   other: {
      isEdit: false,
      isValid: false,
      comment: 'sdf'
   }
}


class CartContainer extends Component {
   state = {
      customer: initialState.customer,
      recipient: initialState.recipient,
      delivery: initialState.delivery,
      deliveryDateTime: initialState.deliveryDateTime,
      pay: initialState.pay,
      other: initialState.other
   }

   handleInputChange = (statePath) => (e) => {
      const target = e.target
      const value = target.type === 'checkbox' ? target.checked : target.value

      this.setState(prevState => {
         const path = statePath.split('.')

         const newState = path.reduce((state, item, i, arr) => {
            if (typeof item !== 'object' && i === arr.length - 1) {
               state[item] = value
               return state
            }
            return state[item]
         }, prevState)

         return {
            ...newState
         }
      })
   }

   handleNextChangeButton = (step) => () => {
      const blocks = Object.keys(this.state)

      this.setState(prev => {
         const otherBlocks = blocks.reduce((state, currentStep) => {
            return {
               ...state,
               [currentStep]: {
                  ...prev[currentStep],
                  isEdit: false
               }
            }
         }, prev)

         return {
            ...otherBlocks,
            [step]: {
               ...prev[step],
               isEdit: true
            }
         }
      })
   }

   validate = (obj) => {
      return true
   }

   getStepsWith_isEdit_false = () => {
      const state = this.state
      const stepsNames = Object.keys(this.state)

      return stepsNames.reduce((steps, currentStep) => {
         return {
            ...steps,
            [currentStep]: {
               ...state[currentStep],
               isEdit: false
            }
         }
      }, state)
   }

   handleNextButton = (step, nextStep) => () => {
      const currentStep = this.state[step]
      if (this.validate(currentStep)) {

         this.setState(prev => {
            const steps = this.getStepsWith_isEdit_false()

            return {
               ...steps,
               [step]: {
                  ...steps[step],
                  isValid: true
               },
               [nextStep]: {
                  ...prev[nextStep],
                  isEdit: true
               }
            }
         })

         return
      }

      alert('no valid')
   }

   render() {
      const {
         customer, recipient, delivery,
         deliveryDateTime, pay, other
      } = this.state

      const deliveryTitle = delivery.is === DELIVERY_IS.COURIER ?
         'Адрес доставки' : 'Адрес самовывоза'

      const deliveryTimeTitle = delivery.is === DELIVERY_IS.COURIER ?
         'Время доставки' : 'Время самовывоза'

      // todo: NETWORK RELEASE - сделать это через CMS
      // Для установки radio по умолчанию, так как у курьера нет оплаты по карте
      let payType = pay.payType
      if (delivery.is === DELIVERY_IS.COURIER && payType === PAY_TYPES.CARD) {
         // Курьер может принимать только наличные
         payType = PAY_TYPES.CASH
      }

      return (
         <Row>
            <div className={cn('col-4')}>
               <Step number={1} title="Ваши контакты" active={customer.isEdit}>
                  {customer.isEdit ? (
                     <CustomerForm {...customer} onInputChange={this.handleInputChange}>
                        <NextButton onClick={this.handleNextButton('customer', 'recipient')}/>
                     </CustomerForm>
                  ) : (
                     <CustomerResult  {...customer}>
                        {customer.isValid && (
                           <ChangeButton onClick={this.handleNextChangeButton('customer')}/>
                        )}
                     </CustomerResult>
                  )}
               </Step>
               <Step number={2} title="Получатель" active={recipient.isEdit}>
                  {recipient.isEdit ? (
                     <RecipientForm {...recipient} onInputChange={this.handleInputChange}>
                        <NextButton onClick={this.handleNextButton('recipient', 'delivery')}/>
                     </RecipientForm>
                  ) : (
                     <RecipientResult {...recipient}>
                        {recipient.isValid && (
                           <ChangeButton onClick={this.handleNextChangeButton('recipient')}/>
                        )}
                     </RecipientResult>
                  )}
               </Step>
               <Step number={3} title={deliveryTitle} active={delivery.isEdit}>
                  {delivery.isEdit ? (
                     <DeliveryForm {...delivery} onInputChange={this.handleInputChange}>
                        <NextButton onClick={this.handleNextButton('delivery', 'deliveryDateTime')}/>
                     </DeliveryForm>
                  ) : (
                     <DeliveryResult {...delivery}>
                        {delivery.isValid && (
                           <ChangeButton onClick={this.handleNextChangeButton('delivery')}/>
                        )}
                     </DeliveryResult>
                  )}
               </Step>
               <Step number={4} title={deliveryTimeTitle} active={deliveryDateTime.isEdit}>
                  {deliveryDateTime.isEdit ? (
                     <DeliveryTimeForm
                        {...deliveryDateTime}
                        deliveryIs={delivery.is}
                        onInputChange={this.handleInputChange}
                     >
                        <NextButton onClick={this.handleNextButton('deliveryDateTime', 'pay')}/>
                     </DeliveryTimeForm>
                  ) : (
                     <DeliveryTimeResult {...deliveryDateTime}>
                        {deliveryDateTime.isValid && (
                           <ChangeButton onClick={this.handleNextChangeButton('deliveryDateTime')}/>
                        )}
                     </DeliveryTimeResult>
                  )}
               </Step>
               <Step number={5} title="Оплата" active={pay.isEdit}>
                  {pay.isEdit ? (
                     <PayForm
                        {...pay}
                        cardTypeEnabled={delivery.is === DELIVERY_IS.YOURSELF}
                        cardTypeTitle={delivery.is === DELIVERY_IS.YOURSELF ?
                           'Наличные' : 'Наличными курьеру'}
                        payType={payType}
                        comment={other.comment}
                        onInputChange={this.handleInputChange}
                     >
                        КНОПКА ЗАКАЗАТЬ с подтверждением
                        {/*<NextButton onClick={this.handleNextChangeButton('deliveryTime')}/>*/}
                     </PayForm>
                  ) : (
                     <PayResult {...pay}>
                        {pay.isValid && (
                           <ChangeButton onClick={this.handleNextChangeButton('pay')}/>
                        )}
                     </PayResult>
                  )}
               </Step>
            </div>
         </Row>
      )
   }
}

export default CartContainer