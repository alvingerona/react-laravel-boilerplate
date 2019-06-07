import { createReducer } from 'store/reducers/utilities'
import cloneDeep from 'lodash.clonedeep'

import { initialState } from 'store/initialState'
import { notificationActions } from 'store/actions'

const { notifications } = initialState

const headLoadByLatest = (state, { data, ...rest }) => {
  const newState = cloneDeep(state)

  newState.headNotifications = data

  return newState
}

const headUnreadCount = (state, { data, ...rest }) => {
  const newState = cloneDeep(state)

  newState.headUnreadCount = data

  return newState
}

export const notificationReducer = createReducer(
  notifications ? notifications : {},
  {
    [notificationActions.LOAD_BY_LATEST_HEAD]: headLoadByLatest,
    [notificationActions.UNREAD_COUNT_HEAD]: headUnreadCount
  }
)
