import React from 'react'
import styles from 'components/Cart/cart.module.sass'
import Input from "components/Cart/Common/Input"
import { DELIVERY_IS } from "constants/common"


const DeliveryTimeForm = ({
                             deliveryIs = DELIVERY_IS.COURIER,
                             askRecipient,
                             onInputChange,
                             children
                          }) => {
   const isCourier = deliveryIs === DELIVERY_IS.COURIER

   return (
      <>
         {isCourier && (
            <Input
               label="Узнать время у получателя"
               type="checkbox"
               checked={askRecipient}
               onChange={onInputChange('deliveryDateTime.askRecipient')}/>
         )}

         {!askRecipient && (
            <>
               <p className={styles.blockText}>
                  Выберите удобный интервал времени
                  {isCourier ? ' доставки для получателя.' : ' для самовывоза'}
               </p>

               {isCourier ? (
                  <p>
                     С 09 до 21 - 200₽
                     С 21 до 09 - 400₽
                  </p>
               ) : (
                  <p>
                     Бесплатно
                  </p>
               )}
            </>
         )}

         {children}
      </>
   )
}

export default DeliveryTimeForm