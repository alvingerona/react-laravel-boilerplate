import React from 'react'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'

import { flashMessage } from 'store/action-creators/flashMessages'
import { changePassword } from 'store/action-creators/user'
import { ChangePasswordForm } from '../Forms'

class ChangePasswordComponent extends React.Component {
  render() {
    const { handleChangePassword } = this.props

    return <ChangePasswordForm onSubmit={handleChangePassword} />
  }
}

const passwordValidationFromResponse = values => {
  let errors = {}

  return errors
}

const mapStateToProps = state => {
  return {
    currentUser: state.entities.users[state.session.currentUser]
  }
}

const mapDispatchToProps = dispatch => ({
  changePassword: async data => {
    try {
      await dispatch(changePassword(data))
      dispatch(
        flashMessage('success', 'Your password was successfully changed', 4000)
      )
    } catch (error) {
      if (error.response.status === 422) {
        throw new SubmissionError(
          passwordValidationFromResponse(error.response.data.data)
        )
      }

      if (error.response.status === 400) {
        throw new SubmissionError({
          old_password: 'The current password was incorrect'
        })
      }
    }
  }
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  handleChangePassword: values => {
    const data = {
      user_id: stateProps.currentUser.id,
      ...values
    }

    return dispatchProps.changePassword(data)
  }
})

export const ChangePassword = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ChangePasswordComponent)
