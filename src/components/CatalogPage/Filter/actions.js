import * as actionTypes from './actionTypes'

export function updateSelect({ filterKey, itemId }) {
  return {
    type: actionTypes.UPDATE_SELECT,
    payload: {
      filterKey,
      itemId
    }
  }
}