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

  get(actionType, endPoint, params) {
    return this._dispatch(
      makeRequest(actionType, () =>
        axios
          .get(endPoint, { params })
          .then(resp => this._onSuccess(resp))
          .catch(err => this._onError(err))
      )
    )
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
      data: { errors, message }
    }
  } = error

  if (!errors) {
    errors = {}
  }

  if (message) {
    dispatch(flashMessage('danger', message, 4000))
  }

  return errors
}

export const actionHttp = actionHttpClass
