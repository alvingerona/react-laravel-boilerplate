import axios from 'axios'

import { makeRequest } from 'store/action-creators/requests'
import { actionHttp } from '../../../utilities'
import { userActions } from 'store/actions'

export const addUser = userData => async dispatch => {
  const response = await dispatch(
    makeRequest('add-user', () =>
      axios
        .post(`/api/users`, userData)
        .then(r => {})
        .catch(error => {
          console.log(error)
        })
    )
  )

  return response
}

export const saveUser = userData => async dispatch => {
  const { id } = userData

  const response = await dispatch(
    makeRequest('save-user-settings', () =>
      axios.put(`/api/users/${id}`, userData)
    )
  )

  return response
}

export const changePassword = data => async dispatch => {
  const { user_id: userId } = data

  const response = await dispatch(
    makeRequest('change-user-password', () =>
      axios.put(`/api/users/${userId}/update-password`, data)
    )
  )

  return response
}

// export const usersList = filter => async dispatch => {
//   const response = await dispatch(
//     makeRequest('load-users', () => axios.get(`/api/users`, filter))
//   )

//   return response
// }

export const usersList = (dispatch, filter, params) => {
  return new actionHttp()
    .setDispatch(dispatch)
    .onSuccess(resp => {
      if (params && params.onSuccess) {
        params.onSuccess(resp.data.data.data, resp.data.data.meta)
      }

      dispatch({
        type: userActions.LIST_USERS,
        listUsers: resp.data.data.data
      })
    })
    .onError(resp => {
      console.log(resp)
    })
    .get('load-users', '/api/users', filter)
}

export const generateReport = (dispatch, {fields, onComplete, onSuccess }) => {

  return new actionHttp()
    .setDispatch(dispatch)
    .onSuccess(resp => {
      onComplete()
      onSuccess(resp.data.url)
    })
    .onError(resp => {
      onComplete()
    })
    .get('report-ticket', `/api/users/generate-report`, fields)  

}