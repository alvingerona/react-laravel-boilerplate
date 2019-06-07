import cloneDeep from 'lodash.clonedeep'

import { initialState } from 'store/initialState'
import { ticketActions } from 'store/actions'
import { createReducer } from 'store/reducers/utilities'

const { ticket } = initialState

const listStatus = (state, { data }) => {
  const newState = cloneDeep(state)
  newState.statuses = data

  return newState
}

export const projectReducer = createReducer(ticket, {
  [ticketActions.LIST_STATUS]: listStatus
})
