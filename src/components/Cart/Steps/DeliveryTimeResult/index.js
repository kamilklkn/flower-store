import React from 'react'

const DeliveryTimeResult = ({
                               name,
                               askRecipient,
                               children
                            }) => {
   return (
      <>
         {children}

         <p>{name}</p>
         {askRecipient && (
            <p>Узнать время у получателя</p>
         )}
      </>
   )
}

export default DeliveryTimeResult