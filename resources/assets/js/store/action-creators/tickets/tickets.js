import { ticketActions } from '../../actions'
import { actionHttp } from '../../../utilities'

export const loadTickets = (dispatch, filters, callback) => {
  return new actionHttp()
    .setDispatch(dispatch)
    .onSuccess(resp => {
      callback(resp.data.data)
    })
    .onError(resp => {
      console.log(resp)
    })
    .get('load-roles', '/api/tickets', filters)
}
