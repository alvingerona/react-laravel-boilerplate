import { notificationActions } from '../../actions'
import { actionHttp } from '../../../utilities'

/**
 * Load notification sorted by latest to oldest.
 * For header notification use
 */
export const headLoadByLatest = (dispatch, params) => {
  return new actionHttp()
    .setDispatch(dispatch)
    .onSuccess(resp => {
      dispatch({
        type: notificationActions.LOAD_BY_LATEST_HEAD,
        data: resp.data.data.data
      })
      dispatch({
        type: notificationActions.UNREAD_COUNT_HEAD,
        data: resp.data.unread_count
      })
    })
    .onError(resp => {
      console.log(resp)
    })
    .get('latest-notifications', '/api/notifications/latest', params)
}

export const markRead = (dispatch, ids) => {
  return new actionHttp()
    .setDispatch(dispatch)
    .onSuccess(resp => {})
    .onError(resp => {
      console.log(resp)
    })
    .post('latest-notifications', '/api/notifications/mark-read', { ids })
}
