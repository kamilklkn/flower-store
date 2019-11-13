import React from 'react'
import Img from "react-image"

const Photo = ({ src = '' }) => (
  <Img
    src={src}
    crossOrigin="anonymous"
    loader={(
      <>loading...</>
    )}
  />
)

export default Photo