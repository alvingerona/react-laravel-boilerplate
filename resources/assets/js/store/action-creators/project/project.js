import { actionHttp } from '../../../utilities'
import { projectActions } from 'store/actions'

export const loadProjects = (dispatch, filter) => {
  return new actionHttp()
    .setDispatch(dispatch)
    .onSuccess(resp => {
      dispatch({
        type: projectActions.LIST_PROJECTS,
        data: resp.data.data.data
      })
    })
    .onError(resp => {
      console.log(resp)
    })
    .get('load-users', '/api/projects', filter)
}

export const loadProjectCategories = (dispatch, projectId, { onSuccess }) => {
  return new actionHttp()
    .setDispatch(dispatch)
    .onSuccess(resp => {
      if (onSuccess) {
        onSuccess(resp.data.data.data)
      }
    })
    .onError(resp => {
      console.log(resp)
    })
    .get('load-users', `/api/projects/${projectId}/categories`)
}
