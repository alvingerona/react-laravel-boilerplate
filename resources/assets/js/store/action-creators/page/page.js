import { pageActions } from '../../actions'

export const setDashboardTabs = (dispatch, tabs) => {
  dispatch({
    type: pageActions.SET_DASHBOARD_TABS,
    tabs
  })
}

export const setDashboardTitle = (dispatch, title) => {
  dispatch({
    type: pageActions.SET_DASHBOARD_TITLE,
    title
  })
}

/**
 * Setup all available options in a dashboard
 */
export const setDashboard = (dispatch, options) => {
  let { tabs, title } = options

  setDashboardTabs(dispatch, tabs)
  setDashboardTitle(dispatch, title)
}

export const setDashCurrentPath = (dispatch, path) => {
  dispatch({
    type: pageActions.SET_DASHBOARD_PATH,
    path
  })
}
