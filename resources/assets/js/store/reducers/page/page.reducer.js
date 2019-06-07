import { createReducer } from 'store/reducers/utilities'
import cloneDeep from 'lodash.clonedeep'

import { initialState } from 'store/initialState'
import { pageActions } from 'store/actions'

const { page } = initialState

const setDashboardTabs = (state, { tabs }) => {
  const newState = cloneDeep(state)

  newState.dashboardTabs = tabs

  return newState
}

const setDashboardTitle = (state, { title }) => {
  const newState = cloneDeep(state)

  newState.dashboardTitle = title

  return newState
}

const setDashCurrentPath = (state, { path }) => {
  const newState = cloneDeep(state)

  newState.dashboardPath = path

  return newState
}

export const pageReducer = createReducer(page, {
  [pageActions.SET_DASHBOARD_TABS]: setDashboardTabs,
  [pageActions.SET_DASHBOARD_TITLE]: setDashboardTitle,
  [pageActions.SET_DASHBOARD_PATH]: setDashCurrentPath
})
