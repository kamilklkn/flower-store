import React from 'react';
import { connect } from "react-redux";
import RoubleSymbol from "components/UI/RoubleSymbol";

const CartButton = ({ amount }) => {
  return (
    <div>
      {amount} <RoubleSymbol/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    productCount: 0,
    amount: 1000
  }
}

export default connect(mapStateToProps)(CartButton)