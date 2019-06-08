import React from 'react'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'

import { userActions } from 'store/actions'
import { uploadUserAvatar } from 'store/action-creators/avatars'
import { flashMessage } from 'store/action-creators/flashMessages'
import { saveUser } from 'store/action-creators/user'
import {  } from 'store/action-creators/page'
import { UserSettingsForm } from '../Forms'

class BasicSettingsComponent extends React.Component {
  componentDidMount(){

  }

  render() {
    const { saveUserSettings, avatarUploadHandler } = this.props

    return (
      <UserSettingsForm
        className="mb-4"
        onSubmit={saveUserSettings}
        avatarUploadHandler={avatarUploadHandler}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.entities.users[state.session.currentUser]
  }
}

const userValidationFromResponse = values => {
  let errors = {}

  return errors
}

const mapDispatchToProps = dispatch => ({
  saveUserSettings: async userData => {
    const response = await dispatch(saveUser(userData))

    if (response.status === 400) {
      throw new SubmissionError(
        'accountSettings',
        userValidationFromResponse(response.data.data)
      )
    }

    dispatch(flashMessage('success', 'Successfully saved user info', 4000))

    dispatch({
      type: userActions.SET_CURRENT_USER_INFO,
      user: response.data.data
    })
  },

  uploadUserAvatar: (fileData, userId) =>
    dispatch(uploadUserAvatar(fileData, userId))
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  avatarUploadHandler: fileData => {
    return dispatchProps.uploadUserAvatar(fileData, stateProps.currentUser.id)
  }
})

export const BasicSettings = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(BasicSettingsComponent)
