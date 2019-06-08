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
  let { tabs, title, breadcrumb } = options

  if(!tabs){
    tabs = []
  }

  if(!breadcrumb){
    breadcrumb = [];
  }

  setBreadcrumb(dispatch, breadcrumb);
  setDashboardTabs(dispatch, tabs)
  setDashboardTitle(dispatch, title)
}

export const setDashCurrentPath = (dispatch, path) => {
  dispatch({
    type: pageActions.SET_DASHBOARD_PATH,
    path
  })
}

export const addBreadcrumb = (dispatch, item) => {
  dispatch({
    type: pageActions.ADD_DASHBOARD_BREADCRUMB,
    item
  })
}

export const setBreadcrumb = (dispatch, items) => {
  dispatch({
    type: pageActions.SET_DASHBOARD_BREADCRUMB,
    items
  })
}

export const clearBreadcrumb = (dispatch) => {
  dispatch({
    type: pageActions.CLEAR_DASHOARD_BREADCRUMB
  })
}