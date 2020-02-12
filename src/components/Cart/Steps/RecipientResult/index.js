import React from 'react'

const RecipientResult = ({
                            name,
                            phone,
                            iamResipient,
                            iDontKnowRecipientNumber,
                            postcard,
                            postcardText,
                            children
                         }) => (
   <>
      {children}

      {iamResipient && (
         <p>Получаю сам</p>
      )}
      {!iamResipient && (
         <p>{name}</p>
      )}
      {!iamResipient && iDontKnowRecipientNumber && (
         <p>Не знаю номер получателя</p>
      )}
      {!iDontKnowRecipientNumber && (
         <p>{phone}</p>
      )}
      {postcard ? (
         <p>
            <span>Текст открытки:</span>
            {postcardText}
         </p>
      ) : (
         <p>Без открытки</p>
      )}
   </>
)

export default RecipientResult