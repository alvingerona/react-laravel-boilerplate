import { screenActions } from 'store/actions'

export const showPreloader = () => dispatch => {
  dispatch({
    type: screenActions.SHOW_PRELOADER
  })
}

export const hidePreloader = () => dispatch => {
  dispatch({
    type: screenActions.HIDE_PRELOADER
  })
}
