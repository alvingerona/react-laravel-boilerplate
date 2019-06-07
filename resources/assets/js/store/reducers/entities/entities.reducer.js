import merge from 'lodash.merge'
import { normalize } from 'normalizr'
import cloneDeep from 'lodash.clonedeep'

import { initialState } from 'store/initialState'
import { userActions, roleActions, ticketActions } from 'store/actions'
import { createReducer } from 'store/reducers/utilities'
import { user as userSchema } from 'store/schemas'

const { entities } = initialState

const mergeEntities = (state, entities) => merge({}, state, entities)

const addUsersToStore = (state, { user }) => {
  const { entities } = normalize(user, userSchema)

  return mergeEntities(state, entities)
}

const setUserAvatar = (state, { avatar, userId }) => {
  const newState = cloneDeep(state)
  newState.users[userId].avatar = avatar

  return newState
}

const listUsers = (state, { listUsers }) => {
  const newState = cloneDeep(state)
  newState.listUsers = listUsers

  return newState
}

const listRoles = (state, { data }) => {
  const newState = cloneDeep(state)
  newState.roles = data

  return newState
}

const ticketStatuses = (state, { data }) => {
  const newState = cloneDeep(state)
  newState.ticket_statuses = data

  return newState
}

export const entitiesReducer = createReducer(entities, {
  [userActions.SET_CURRENT_USER_INFO]: addUsersToStore,
  [userActions.SET_AVATAR]: setUserAvatar,
  [userActions.LIST_USERS]: listUsers,
  [roleActions.LIST_ROLES]: listRoles,
  [ticketActions.STATUSES]: ticketStatuses
})
