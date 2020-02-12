import React from 'react'

const CustomerResult = ({ name, phone, children }) => (
   <>
      {children}
      <p>{name}</p>
      <p>{phone}</p>
   </>
)

export default CustomerResult