import { initialState } from 'store/initialState'
import { screenActions } from 'store/actions'
import { createReducer } from 'store/reducers/utilities'

const { screen } = initialState

const showPreloader = (state, {}) => {
  return {
    ...state,
    isShowPreloader: true
  }
}

const hidePreloader = (state, {}) => {
  return {
    ...state,
    isShowPreloader: false
  }
}

export const screenReducer = createReducer(screen, {
  [screenActions.SHOW_PRELOADER]: showPreloader,
  [screenActions.HIDE_PRELOADER]: hidePreloader
})
