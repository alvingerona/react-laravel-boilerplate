import React from 'react'
import { Link } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'

import {
  PasswordFormLineIcon,
  TextFormLineIcon,
  NeutralButton
} from 'shared'
import { email as emailRegex } from 'constants/regexes'
import { linkStyle } from 'constants/styles'
import { Col, Row, Form } from 'shared';

const validateLogin = values => {
  let errors = {}

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

const InputEmail = props => (
  <TextFormLineIcon iconClass="icon-user" {...props} />
)

const InputPassword = props => (
  <PasswordFormLineIcon iconClass="icon-lock" {...props} />
)

const LoginForm = props => {
  const { handleSubmit, submitting } = props

  return (
    <Form onSubmit={handleSubmit} loading={submitting}>
      <Field
        component={InputEmail}
        type="text"
        name="email"
        labelText="Email"
      />
      <Field
        component={InputPassword}
        type="password"
        name="password"
        labelText="Password"
      />

      <Row>
        <Col col={6}>
          <NeutralButton type="primary" className="px-4" submit>
            Log In
          </NeutralButton>
        </Col>

        <Col col={6} className="text-right">
          <Link className={linkStyle} to="/forgot-password">
            Forgot Password?
          </Link>
        </Col>
      </Row>
    </Form>
  )
}

export default reduxForm({
  form: 'login',
  validate: validateLogin
})(LoginForm)
