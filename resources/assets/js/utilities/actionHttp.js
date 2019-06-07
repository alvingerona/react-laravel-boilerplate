import axios from 'axios'
import { SubmissionError } from 'redux-form'

import { makeRequest } from 'store/action-creators/requests'
import { flashMessage } from 'store/action-creators/flashMessages'

class actionHttpClass {
  constructor() {
    this._dispatch = null
    /**
     * @var onErrorCallback function|null
     */
    this._onErrorCallback = null
    /**
     * @var onSuccessCallback function|null
     */
    this._onSuccessCallback = null
    /**
     *  @var _successMesssage string|null
     */
    this._successMesssage = null
  }

  onError(callback) {
    this.onErrorCallback = callback

    return this
  }

  onSuccess(callback) {
    this.onSuccessCallback = callback

    return this
  }

  setSuccessMessage(message) {
    this._successMesssage = message

    return this
  }

  get(actionType, endPoint, params, opts) {
    if (!opts) {
      opts = {}
    }

    return this._dispatch(
      makeRequest(actionType, () =>
        axios
          .get(endPoint, { params })
          .then(resp => {
            if (opts.onSuccess) {
              opts.onSuccess(resp)
            }

            this._onSuccess(resp)
          })
          .catch(err => this._onError(err))
      )
    )
  }

  /**
   * This expect the endPoint have response format like:
   * {
   *    data: {
   *      data: [...],
   *      meta: {
   *          pagination: {
   *            count: 9, current_page: 1, per_page: 15,
   *            total: 9, total_pages: 1
   *          }
   *      }
   *    }
   * }
   */
  lazyGet(actionType, endPoint, params) {
    if (!params) {
      params = {}
    }

    if (!params.page) {
      params.page = 1
    }

    return this.get(actionType, endPoint, params, {
      onSuccess: resp => {
        let { pagination } = resp.data.data.meta

        if (pagination.total_pages > pagination.current_page) {
          params.page = pagination.current_page + 1
          setTimeout(() => {
            this.lazyGet(actionType, endPoint, params)
          }, 2000)
        }
      }
    })
  }

  post(actionType, endPoint, params) {
    return this._dispatch(
      makeRequest(actionType, () =>
        axios
          .post(endPoint, params)
          .then(resp => this._onSuccess(resp))
          .catch(err => this._onError(err))
      )
    )
  }

  put(actionType, endPoint, params) {
    return this._dispatch(
      makeRequest(actionType, () =>
        axios
          .put(endPoint, params)
          .then(resp => this._onSuccess(resp))
          .catch(err => this._onError(err))
      )
    )
  }

  delete(actionType, endPoint, params) {
    return this._dispatch(
      makeRequest(actionType, () =>
        axios
          .delete(endPoint, params)
          .then(resp => this._onSuccess(resp))
          .catch(err => this._onError(err))
      )
    )
  }

  setDispatch(dispatch) {
    this._dispatch = dispatch

    return this
  }

  _onError(error) {
    if (this.onErrorCallback) {
      this.onErrorCallback(error)
    }

    if (error.response.status === 422) {
      throw new SubmissionError(
        parseValidationErrorResponse(error, this._dispatch)
      )
    }

    return this
  }

  _onSuccess(response) {
    if (this.onSuccessCallback) {
      this.onSuccessCallback(response)
    }

    if (this._successMesssage) {
      this._dispatch(flashMessage('success', this._successMesssage, 4000))
    }
  }

  /**
   * @params callback Function this this callback function
   * must return an object of error.
   *
   * @params error Object this come from axios catch error parameter
   */
  _catchError(callback, error) {
    /**
     * Invalid data was supplied to the API,
     * show validation errors
     */
    throw new SubmissionError(
      callback({
        response: error.response.data.messages,
        status: error.response.status
      })
    )
  }
}

const parseValidationErrorResponse = (error, dispatch) => {
  let {
    response: {
      data: { errors, message, messages }
    }
  } = error

  if (!errors) {
    errors = {}
  }

  if (!message) {
    message = messages[Object.keys(messages)[0]]
  }

  if (message) {
    dispatch(flashMessage('danger', message, 4000))
  }

  return errors
}

export const actionHttp = actionHttpClass
