import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { SubmissionError } from 'redux-form'
import { flashMessage } from 'store/action-creators/flashMessages'
import { CardDash } from 'shared'
import { ForgotPasswordForm } from './ForgotPasswordForm'

export const ForgotPasswordComponent = props => {
  const { submitForgotPassword } = props
  return (
    <CardDash md={12} title="Forgot Password?">
      <ForgotPasswordForm onSubmit={submitForgotPassword} />
    </CardDash>
  )
}

const mapDispatchToProps = dispatch => ({
  submitForgotPassword: async values => {
    try {
      await axios.post('/api/forgot-password', values)

      dispatch(push('/login'))
      dispatch(
        flashMessage(
          'success',
          'The password reset request has been sent to your Email inbox.'
        )
      )
    } catch (error) {
      throw new SubmissionError(error.response.data)
    }
  }
})

export default connect(
  null,
  mapDispatchToProps
)(ForgotPasswordComponent)
