import React from 'react'
import { reduxForm, Field } from 'redux-form'

import { NeutralButton, TextFormRow } from 'components'
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
  const { handleSubmit } = props

  return (
    <form onSubmit={handleSubmit}>
      <Field
        type="text"
        name="email"
        labelText="Enter Your Email Address"
        component={TextFormRow}
      />

      <div className="flex items-center">
        <NeutralButton className={linkStyle} color="link" href="/login">
          Back to Login
        </NeutralButton>

        <NeutralButton className="ml-2" type="submit">
          Request
        </NeutralButton>
      </div>
    </form>
  )
}

export const ForgotPasswordForm = reduxForm({
  form: 'forgotPassword',
  validate
})(ForgotPasswordFormComponent)
