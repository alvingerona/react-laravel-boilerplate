import { createReducer } from 'store/reducers/utilities'
import cloneDeep from 'lodash.clonedeep'

import { initialState } from 'store/initialState'
import { priorityTypeActions } from 'store/actions'

const { priority_type } = initialState

const loadPriorityTypes = (state, { data }) => {
  const newState = cloneDeep(state)

  newState.priority_types = data

  return newState
}

export const priorityTypes = createReducer(priority_type, {
  [priorityTypeActions.LIST_TYPES]: loadPriorityTypes
})
