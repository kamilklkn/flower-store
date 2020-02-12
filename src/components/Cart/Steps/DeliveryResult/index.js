import React from 'react'
import { DELIVERY_IS } from "constants/common"

const DeliveryResult = ({
                           is,
                           courierDirection,
                           children
                        }) => (
   <>
      {children}

      {is === DELIVERY_IS.COURIER ? (
         <>
            <p>
               {courierDirection.street}, {courierDirection.house}, {courierDirection.flat}
            </p>
            {courierDirection.comment && (
               <>
                  <hr/>
                  <p>{courierDirection.comment}</p>
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
)

export default DeliveryResult