import { actionHttp } from '../../../utilities'
import { priorityTypeActions } from 'store/actions'

export const loadPriorityTypes = dispatch => {
  return new actionHttp()
    .setDispatch(dispatch)
    .onSuccess(resp => {
      dispatch({
        type: priorityTypeActions.LIST_TYPES,
        data: resp.data.data.data
      })
    })
    .onError(resp => {
      console.log(resp)
    })
    .get('load-priorities', '/api/priorities')
}
