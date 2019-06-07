import { faqActions } from '../../actions'
import { actionHttp } from '../../../utilities'

export const loadFaqs = (dispatch, params, onSuccess) => {
  return new actionHttp()
    .setDispatch(dispatch)
    .onSuccess(resp => {
      onSuccess(resp.data.data)
    })
    .onError(resp => {
      console.log(resp)
    })
    .get('load-faqs', `/api/faq`, params)
}

export const loadFaq = (dispatch, id, onSuccess) => {
  return new actionHttp()
    .setDispatch(dispatch)
    .onSuccess(resp => {
      onSuccess(resp.data.data)
    })
    .onError(resp => {
      console.log(resp)
    })
    .get('load-faq', `/api/faq/${id}`)
}

export const storeFaq = (dispatch, fields, onSuccess) => {
  return new actionHttp()
    .setDispatch(dispatch)
    .onSuccess(resp => {
      onSuccess(resp)
    })
    .setSuccessMessage('FAQ has been created!')
    .onError(resp => {})
    .post('store-faq', '/api/faq', fields)
}

export const doUpdate = (dispatch, id, fields, onSuccess) => {
  return new actionHttp()
    .setDispatch(dispatch)
    .onSuccess(resp => {
      onSuccess(resp)
    })
    .setSuccessMessage('FAQ has been updated!')
    .onError(resp => {})
    .put('store-faq', `/api/faq/${id}`, fields)
}

export const deleteFaq = (dispatch, faqId, onSuccess) => {
  return new actionHttp()
    .setDispatch(dispatch)
    .onSuccess(resp => {
      onSuccess({ response: resp, dispatch })
    })
    .setSuccessMessage('FAQ has been deleted!')
    .onError(resp => {})
    .delete('delete-faq', `/api/faq/${faqId}`)
}
