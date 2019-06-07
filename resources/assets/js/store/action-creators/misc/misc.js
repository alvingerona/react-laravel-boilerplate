import { actionHttp } from '../../../utilities'
import { miscActions } from 'store/actions'

export const defaultTicketCreate = dispatch => {
  return new actionHttp()
    .setDispatch(dispatch)
    .onSuccess(resp => {
      dispatch({
        type: miscActions.DEFAULT_TICKET_CREATE,
        data: resp.data
      })
    })
    .onError(resp => {
      console.log(resp)
    })
    .get('default-ticket-create', '/api/misc/defaults/ticket-create')
}

export const overview = dispatch => {
  return new actionHttp()
    .setDispatch(dispatch)
    .onSuccess(resp => {
      dispatch({
        type: miscActions.OVERVIEW,
        data: resp.data
      })
    })
    .onError(resp => {
      console.log(resp)
    })
    .get('utility-overview', '/api/utilities/overview')
}