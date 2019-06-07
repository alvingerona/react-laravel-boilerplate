import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { actionHttp } from 'utilities'
import { Card } from 'shared'
import SignUpForm from './SignUpForm'

export const SignUpComponent = props => {
  const { submitSignup } = props

  let initialValues = {
    email: '',
    password: '',
    first_name: ''
  }

  return (
    <Card withBody className="p-4">
      <h1>Register</h1>
      <p>Create your account</p>
      <SignUpForm onSubmit={submitSignup} initialValues={initialValues} />
    </Card>
  )
}

const mapDispatchToProps = dispatch => ({
  submitSignup: data => {
    return new actionHttp()
      .setDispatch(dispatch)
      .setSuccessMessage('Please check your email for email verification.')
      .onSuccess(() => dispatch(push('/')))
      .post('register-user', '/api/signup', data)
  }
})

export default connect(
  null,
  mapDispatchToProps
)(SignUpComponent)
