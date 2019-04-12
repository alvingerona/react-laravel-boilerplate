import { roleActions } from '../../actions'
import { actionHttp } from '../../../utilities'

export const loadRoles = dispatch => {
  return new actionHttp()
    .setDispatch(dispatch)
    .onSuccess(resp => {
      dispatch({
        type: roleActions.LIST_ROLES,
        data: resp.data.data.data
      })
    })
    .onError(resp => {
      console.log(resp)
    })
    .get('load-roles', '/api/roles')
}
