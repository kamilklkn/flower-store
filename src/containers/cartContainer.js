import React, { Component, useState } from 'react'
import cn from 'classnames'
import styles from './cartContainer.module.sass'
import { Row } from "components/Bootstrap"

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

const Input = ({ value, onChange, placeholder = '', type = '', checked = false }) => {
   switch (type) {
      case 'checkbox':
         return <input
            type="checkbox"
            checked={checked}
            onChange={onChange}/>
      default:
         return <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}/>
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
         isEdit: true,
         iamResipient: false,
         iDontKnowRecipientNumber: false,
         name: '',
         phone: ''
      },
      orderEnhancers: {
         postcard: true,
         postcardText: '',
         photoWithRecipient: false,
         isSurprice: false,
         anonymousCustomer: false
      },
      delivery: {
         isEdit: false,
         courier: true,
         pickUpOrderYourself: false,
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
      console.log('handleInputChange', e)
      const target = e.target
      const value = target.type === 'checkbox' ? target.checked : target.value
      console.log(value)
      // if (target.value.length === max) return

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

      const deliveryTitle = delivery.courier ?
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
                        <p>{recipient.name}</p>
                        <p>{recipient.phone}</p>
                     </>
                  ) : (
                     <>
                        <label>
                           <Input
                              type="checkbox"
                              checked={recipient.iamResipient}
                              onChange={this.handleInputChange('recipient.iamResipient')}/>
                           Я получатель:
                        </label>

                        {!recipient.iamResipient && (
                           <>
                              <Input
                                 placeholder="Имя получателя"
                                 value={recipient.name}
                                 onChange={this.handleInputChange('recipient.name')}/>

                              <label>
                                 <Input
                                    type="checkbox"
                                    checked={recipient.iDontKnowRecipientNumber}
                                    onChange={this.handleInputChange('recipient.iDontKnowRecipientNumber')}/>
                                 Я не знаю номер получателя:
                              </label>

                              {!recipient.iDontKnowRecipientNumber && (
                                 <Input
                                    placeholder="Телефон получателя"
                                    value={recipient.phone}
                                    onChange={this.handleInputChange('recipient.phone')}/>
                              )}
                           </>
                        )}

                        <label>
                           <Input
                              type="checkbox"
                              checked={orderEnhancers.postcard}
                              onChange={this.handleInputChange('orderEnhancers.postcard')}/>
                           Бесплатная открытка
                        </label>
                        {orderEnhancers.postcard && (
                           <Textarea
                              max={400}
                              value={orderEnhancers.postcardText}
                              onChange={this.handleInputChange('orderEnhancers.postcardText')}/>
                        )}

                        <label>
                           <Input
                              type="checkbox"
                              checked={orderEnhancers.photoWithRecipient}
                              onChange={this.handleInputChange('orderEnhancers.photoWithRecipient')}/>
                           Сделать фото с получателем
                        </label>

                        <label>
                           <Input
                              type="checkbox"
                              checked={orderEnhancers.isSurprice}
                              onChange={this.handleInputChange('orderEnhancers.isSurprice')}/>
                           Сюрприз, не звонить перед вручением
                        </label>

                        <label>
                           <Input
                              type="checkbox"
                              checked={orderEnhancers.anonymousCustomer}
                              onChange={this.handleInputChange('orderEnhancers.anonymousCustomer')}/>
                           Анонимный заказ
                           <InfoPopover title="Анонимный заказ" text="Мы не передадим получателю никаких данных о вас."/>
                        </label>

                        <NextButton onClick={() => this.handleNextChangeButton('delivery')}/>
                     </>
                  )}
               </Step>
               <Step number={3} title="Адрес доставки" active={delivery.isEdit}>
                  {!delivery.isEdit ? (
                     <>
                        <ChangeButton onClick={() => this.handleNextChangeButton('delivery')}/>
                     </>
                  ) : (
                     <>
                        <NextButton onClick={() => this.handleNextChangeButton('pay')}/>
                     </>
                  )}
               </Step>
               <Step title={deliveryTitle}>
               </Step>
               <Step title="Оплата">
               </Step>
            </div>
         </Row>
      )
   }
}

export default CartContainer