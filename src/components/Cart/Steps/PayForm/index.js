import React from 'react'
import { PAY_TYPES } from "constants/common"
import Input from "components/Cart/Common/Input"
import Textarea from "components/Cart/Common/Textarea"

const PayForm = ({
                    payType = PAY_TYPES.CARD,
                    cardTypeEnabled = true,
                    cardTypeTitle = 'Наличные',
                    legalEntity,
                    comment,
                    onInputChange,
                    children
                 }) => {
   console.log(comment)

   return (
      <>
         {cardTypeEnabled && (
            <>
               <Input
                  label="Оплата картой"
                  type="radio"
                  name="pay"
                  value={PAY_TYPES.CARD}
                  checked={payType === PAY_TYPES.CARD}
                  onChange={onInputChange('pay.payType')}/>
               <p>
                  Оплата производится через
                  платежный шлюз ПАО "СБЕРБАНК"
               </p>
            </>
         )}

         <Input
            label={cardTypeTitle}
            type="radio"
            name="pay"
            value={PAY_TYPES.CASH}
            checked={payType === PAY_TYPES.CASH}
            onChange={onInputChange('pay.payType')}/>

         <Input
            label="Перевод на корпоративную карту «Сбербанк»"
            type="radio"
            name="pay"
            value={PAY_TYPES.TO_CORPORATE_CARD}
            checked={payType === PAY_TYPES.TO_CORPORATE_CARD}
            onChange={onInputChange('pay.payType')}/>

         <Input
            label="Счет для юр. лица РФ"
            type="radio"
            name="pay"
            value={PAY_TYPES.ACCOUNT_FOR_A_LEGAL_ENTITY}
            checked={payType === PAY_TYPES.ACCOUNT_FOR_A_LEGAL_ENTITY}
            onChange={onInputChange('pay.payType')}/>

         {payType === PAY_TYPES.ACCOUNT_FOR_A_LEGAL_ENTITY && (
            <>
               <Input
                  placeholder="Название организации"
                  value={legalEntity.name}
                  onChange={onInputChange('pay.legalEntity.name')}/>

               <Input
                  placeholder="ИНН"
                  value={legalEntity.inn}
                  onChange={onInputChange('pay.legalEntity.inn')}/>

               <Input
                  placeholder="КПП"
                  value={legalEntity.kpp}
                  onChange={onInputChange('pay.legalEntity.kpp')}/>
            </>
         )}

         <hr/>

         <Textarea
            maxRows={2}
            max={400}
            placeholder="Комментарий к заказу"
            value={comment}
            onChange={onInputChange('other.comment')}/>

         {children}
      </>
   )
}

export default PayForm