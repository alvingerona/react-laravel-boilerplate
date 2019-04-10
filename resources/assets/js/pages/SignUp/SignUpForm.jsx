import React from 'react'
import { reduxForm, Field } from 'redux-form'

import {
  NeutralButton,
  PositiveButton,
  PasswordFormLineIcon,
  TextFormLineIcon
} from 'components'
import { email as emailRegex } from 'constants/regexes'
import { linkStyle } from 'constants/styles'
import { Form } from 'components/Ui'

const validateSignUp = values => {
  let errors = {}

  if (!values.first_name) {
    errors.first_name = 'This field is required'
  }

  // if (!values.last_name) {
  //   errors.last_name = 'This field is required'
  // }

  if (!values.email) {
    errors.email = 'This field is required'
  } else if (!emailRegex.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'This field is required'
  }

  return errors
}

const TextInput = props => <TextFormLineIcon iconClass="icon-user" {...props} />

const EmailInput = props => (
  <TextFormLineIcon iconClass="icon-envelope" {...props} />
)

const PasswordInput = props => (
  <PasswordFormLineIcon iconClass="icon-lock" {...props} />
)

const SignUpForm = props => {
  const { handleSubmit, submitting } = props

  return (
    <Form onSubmit={handleSubmit} loading={submitting}>
      <Field
        component={TextInput}
        type="text"
        name="first_name"
        labelText="Name"
        placeholder="Your name"
      />
      {/* <Field
        component={TextInput}
        type="text"
        name="last_name"
        labelText="Last Name"
      /> */}
      <Field
        component={EmailInput}
        type="text"
        name="email"
        labelText="Email"
        placeholder="Email address"
      />
      <Field
        component={PasswordInput}
        type="password"
        name="password"
        labelText="Password"
        placeholder="Password"
      />
      <div>
        <PositiveButton className="mr-2" submit>
          Sign Up
        </PositiveButton>

        <NeutralButton className={linkStyle} to="/login">
          Or Login
        </NeutralButton>
      </div>
    </Form>
  )
}

export default reduxForm({
  form: 'signup',
  validate: validateSignUp
})(SignUpForm)
