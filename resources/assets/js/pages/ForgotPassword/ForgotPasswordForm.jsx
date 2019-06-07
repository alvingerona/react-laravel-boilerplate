import React from 'react'
import { reduxForm, Field } from 'redux-form'

import { NeutralButton, TextFormLine, PositiveButton, Form } from 'shared'
import { linkStyle } from 'constants/styles'
import { email as emailRegex } from 'constants/regexes'

const validate = values => {
  let errors = {}

  if (!values.email) {
    errors.email = 'This field is required'
  } else if (!emailRegex.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
}

export const ForgotPasswordFormComponent = props => {
  const { handleSubmit, submitting } = props

  return (
    <Form onSubmit={handleSubmit} loading={submitting}>
      <Field
        type="text"
        name="email"
        labelText="Enter Your Email Address"
        component={TextFormLine}
      />

      <div className="flex items-center">
        <PositiveButton className="mr-2" submit>
          Request
        </PositiveButton>

        <NeutralButton className={linkStyle} color="link" to="/login">
          Back to Login
        </NeutralButton>
      </div>
    </Form>
  )
}

export const ForgotPasswordForm = reduxForm({
  form: 'forgotPassword',
  validate
})(ForgotPasswordFormComponent)
