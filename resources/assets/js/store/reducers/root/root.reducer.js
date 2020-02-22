import { combineReducers } from 'redux'
import reduceReducers from 'reduce-reducers'

import { sessionActions } from 'store/actions'
import { initialState } from 'store/initialState'
import { createReducer } from 'store/reducers/utilities'

import { sessionReducer } from '../session/session.reducer'
import { requestReducer } from '../requests/requests.reducer'
import { entitiesReducer } from '../entities/entities.reducer'
import { flashMessagesReducer } from '../ui/flashMessages.reducer'
import { screenReducer } from '../ui/screen.reducer'

const rootReducer = combineReducers({
  entities: entitiesReducer,
  session: sessionReducer,
  flashMessages: flashMessagesReducer,
  requests: requestReducer,
  screen: screenReducer
})

const globalReducer = createReducer(initialState, {
  [sessionActions.LOGOUT]: () => initialState
})

export default reduceReducers(initialState, rootReducer, globalReducer)
