import { createReducer } from 'store/reducers/utilities'
import cloneDeep from 'lodash.clonedeep'

import { initialState } from 'store/initialState'
import { miscActions } from 'store/actions'

const { misc } = initialState

const overview = (state, { data }) => {
  const newState = cloneDeep(state)

  newState.overview = data

  return newState
}

export const miscReducer = createReducer(misc, {
  [miscActions.OVERVIEW]: overview
})
