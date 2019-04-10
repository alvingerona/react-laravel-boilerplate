import { reducer as formReducer } from 'redux-form'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { sessionReducer } from '../session/session.reducer'
import { entitiesReducer } from '../entities/entities.reducer'
import { flashMessagesReducer } from '../ui/flashMessages.reducer'
import { requestReducer } from '../requests/requests.reducer'
import { pageReducer } from '../page/page.reducer'
import { notificationReducer } from '../notifications/notifications.reducer'

const rootReducer = combineReducers({
  entities: entitiesReducer,
  session: sessionReducer,
  form: formReducer,
  routing: routerReducer,
  flashMessages: flashMessagesReducer,
  requests: requestReducer,
  page: pageReducer,
  notifications: notificationReducer
})

export default rootReducer
