import React, { Component, useState } from 'react'
import cn from 'classnames'
import styles from './cartContainer.module.sass'
import { Row } from "components/Bootstrap"

const DELIVERY_IS = {
   COURIER: 'COURIER',
   YOURSELF: 'YOURSELF'
}

const Step = ({ title, number, active, isShow, children }) => {
   return (
      <div className={styles.step}>
         <p className={cn(styles.blockTitle, active && styles.active)}>
            <span className={styles.number}>{number}</span>
            {title}
         </p>
         {children}
      </div>
   )
}

const InfoPopover = ({ title, text }) => {
   const [show, setShow] = useState(false)
   return (
      <span className={styles.popover}>
         <span
            className={styles.number}
            onMouseEnter={() => setShow(true)}
            onMouseOut={() => setShow(false)}
         >?
         </span>
         <span className={cn(styles.popup, show && styles.show)}>
            <b>{title}</b>
            {text}
         </span>
      </span>
   )
}

const NextButton = ({ onClick }) => (
   <button className={styles.nextButton} onClick={onClick}>Продолжить</button>
)

const ChangeButton = ({ onClick }) => (
   <span className={styles.changeButton} onClick={onClick}>изменить</span>
)

const Input = ({ label = '', value, name, onChange, placeholder = '', type = '', checked = false }) => {
   switch (type) {
      case 'checkbox':
         return (
            <label>
               <input
                  type="checkbox"
                  checked={checked}
                  onChange={onChange}/>
               {label}
            </label>
         )
      case 'radio':
         return (
            <label>
               <input
                  type="radio"
                  value={value}
                  name={name}
                  checked={checked}
                  onChange={onChange}/>
               {label}
            </label>
         )
      default:
         return (
            <input
               type="text"
               placeholder={placeholder}
               value={value}
               onChange={onChange}/>
         )
   }
}

const Textarea = ({
                     value = '',
                     placeholder = '',
                     maxRows = 8,
                     max = 400,
                     maxRowsTitle = 'строк',
                     onChange
                  }) => {
   return (
      <>
         <textarea placeholder={placeholder}
                   rows={maxRows}
                   value={value}
                   onChange={onChange}/>
         {/*<span>{value.split(/\r*\n/).length}/{maxRows} {maxRowsTitle}</span>*/}
         <span>{value.length}/{max}</span>
      </>
   )
}


class CartContainer extends Component {
   state = {
      customer: {
         isEdit: false,
         name: 'Алексей',
         phone: '+79960225657'
      },
      recipient: {
         isEdit: false,
         iamResipient: false,
         iDontKnowRecipientNumber: false,
         name: '',
         phone: ''
      },
      orderEnhancers: {
         postcard: true,
         postcardText: ''
         // photoWithRecipient: false,
         // isSurprice: false,
         // anonymousCustomer: false
      },
      delivery: {
         isEdit: true,
         is: DELIVERY_IS.COURIER,
         courierDirection: {
            askAddressFromRecipient: false,
            street: 'dffs',
            house: '',
            flat: '',
            comment: '',
            price: 0
         }
      }
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

   handleNextChangeButton = (step) => {
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

   render() {
      const {
         customer, recipient, delivery,
         orderEnhancers
      } = this.state
      const { courierDirection: cdirection } = delivery

      const deliveryTitle = delivery.is === DELIVERY_IS.COURIER ?
         'Время доставки' : 'Время самовывоза'

      return (
         <Row>
            <div className={cn('col-4')}>
               <Step number={1} title="Ваши контакты" active={customer.isEdit}>
                  {!customer.isEdit ? (
                     <>
                        <ChangeButton onClick={() => this.handleNextChangeButton('customer')}/>
                        <p>{customer.name}</p>
                        <p>{customer.phone}</p>
                     </>
                  ) : (
                     <>
                        <Input
                           placeholder="Имя"
                           value={customer.name}
                           onChange={this.handleInputChange('customer.name')}/>
                        <Input
                           placeholder="Мобильный телефон"
                           value={customer.phone}
                           onChange={this.handleInputChange('customer.phone')}/>

                        <p className={styles.blockText}> Ваши данные – это тайна.
                           Получателю доступен только текст открытки
                           (её можно написать далее)</p>
                        <NextButton onClick={() => this.handleNextChangeButton('recipient')}/>
                     </>
                  )}
               </Step>
               <Step number={2} title="Получатель" active={recipient.isEdit}>
                  {!recipient.isEdit ? (
                     <>
                        <ChangeButton onClick={() => this.handleNextChangeButton('recipient')}/>
                        {recipient.iamResipient && <p>Получаю сам</p>}
                        {!recipient.iamResipient && <p>{recipient.name}</p>}
                        {!recipient.iamResipient && recipient.iDontKnowRecipientNumber &&
                        <p>Не знаю номер получателя</p>}
                        {!recipient.iDontKnowRecipientNumber && <p>{recipient.phone}</p>}
                        {orderEnhancers.postcard ? (
                           <p>
                              <span>Текст открытки:</span>
                              {orderEnhancers.postcardText}
                           </p>
                        ) : (
                           <p>Без открытки</p>
                        )}
                     </>
                  ) : (
                     <>
                        <Input
                           label="Я получатель"
                           type="checkbox"
                           checked={recipient.iamResipient}
                           onChange={this.handleInputChange('recipient.iamResipient')}/>

                        {!recipient.iamResipient && (
                           <>
                              <Input
                                 placeholder="Имя получателя"
                                 value={recipient.name}
                                 onChange={this.handleInputChange('recipient.name')}/>

                              <Input
                                 label="Я не знаю номер получателя"
                                 type="checkbox"
                                 checked={recipient.iDontKnowRecipientNumber}
                                 onChange={this.handleInputChange('recipient.iDontKnowRecipientNumber')}/>

                              {!recipient.iDontKnowRecipientNumber && (
                                 <Input
                                    placeholder="Телефон получателя"
                                    value={recipient.phone}
                                    onChange={this.handleInputChange('recipient.phone')}/>
                              )}
                           </>
                        )}

                        <Input
                           label="Бесплатная открытка"
                           type="checkbox"
                           checked={orderEnhancers.postcard}
                           onChange={this.handleInputChange('orderEnhancers.postcard')}/>

                        {orderEnhancers.postcard && (
                           <Textarea
                              max={400}
                              value={orderEnhancers.postcardText}
                              onChange={this.handleInputChange('orderEnhancers.postcardText')}/>
                        )}

                        <NextButton onClick={() => this.handleNextChangeButton('delivery')}/>
                     </>
                  )}
               </Step>
               <Step number={3} title="Адрес доставки" active={delivery.isEdit}>
                  {!delivery.isEdit ? (
                     <>
                        <ChangeButton onClick={() => this.handleNextChangeButton('delivery')}/>
                        {delivery.is === DELIVERY_IS.COURIER ? (
                           <>
                              <p>{cdirection.street},
                                 {cdirection.house},
                                 {cdirection.flat}</p>
                              {cdirection.comment && (
                                 <>
                                    <hr/>
                                    <p>{cdirection.comment}</p>
                                 </>
                              )}

                           </>
                        ) : (
                           <>
                              <p>Чита, ...адрес</p>
                              <div>Карта</div>
                           </>
                        )}

                     </>
                  ) : (
                     <>
                        <Row>
                           <div className="col-md-4">
                              <Input
                                 label="Курьером"
                                 type="radio"
                                 name="delVar"
                                 value={DELIVERY_IS.COURIER}
                                 checked={delivery.is === DELIVERY_IS.COURIER}
                                 onChange={this.handleInputChange('delivery.is')}/>
                           </div>
                           <div className="col-md-8 ">
                              <Input
                                 label="Самовывоз"
                                 type="radio"
                                 name="delVar"
                                 value={DELIVERY_IS.YOURSELF}
                                 checked={delivery.is === DELIVERY_IS.YOURSELF}
                                 onChange={this.handleInputChange('delivery.is')}/>
                           </div>
                        </Row>

                        {delivery.is === DELIVERY_IS.COURIER ? (
                           <>
                              <Input
                                 label="Узнать адрес у получателя"
                                 type="checkbox"
                                 checked={cdirection.askAddressFromRecipient}
                                 onChange={this.handleInputChange('delivery.courierDirection.askAddressFromRecipient')}/>

                              {!cdirection.askAddressFromRecipient && (
                                 <>
                                    <Input
                                       placeholder="Улица"
                                       value={cdirection.street}
                                       onChange={this.handleInputChange('delivery.courierDirection.street')}/>

                                    <Row>
                                       <div className="col-md-6 pr-1">
                                          <Input
                                             placeholder="Дом / корпус"
                                             value={cdirection.house}
                                             onChange={this.handleInputChange('delivery.courierDirection.house')}/>
                                       </div>
                                       <div className="col-md-6 pl-1">
                                          <Input
                                             placeholder="Квартира / офис"
                                             value={cdirection.flat}
                                             onChange={this.handleInputChange('delivery.courierDirection.flat')}/>
                                       </div>
                                    </Row>

                                    <Textarea
                                       maxRows={2}
                                       max={400}
                                       placeholder="Комментарий к заказу"
                                       value={cdirection.comment}
                                       onChange={this.handleInputChange('delivery.courierDirection.comment')}/>

                                 </>
                              )}
                           </>
                        ) : (
                           <>
                              <p>Чита, ...адрес</p>
                              <div>Карта</div>
                           </>
                        )}

                        <NextButton onClick={() => this.handleNextChangeButton('pay')}/>
                     </>
                  )}
               </Step>
               <Step number={4} title={deliveryTitle} active={delivery.isEdit}>
               </Step>
               <Step title="Оплата">
               </Step>
            </div>
         </Row>
      )
   }
}

export default CartContainer