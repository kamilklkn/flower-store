import React from 'react'
import PropTypes from 'prop-types'

const SizeInfo = ({height, weight, className}) => {
  return (
    <span className={className}>
      {height}см / {weight}см
    </span>
  )
}

SizeInfo.propTypes = {
  height: PropTypes.number.isRequired,
  weight: PropTypes.number.isRequired,
}

export default SizeInfo