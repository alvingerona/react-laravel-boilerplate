import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

import { PositiveButton, TextFormRow, PasswordFormRow } from 'components'
import { email as emailRegex } from 'constants/regexes'
import { Form as FormUi } from 'components/Ui'

export class FormComponent extends React.Component {
  render() {
    const { handleSubmit, className, submitting } = this.props

    return (
      <FormUi
        className={className}
        onSubmit={handleSubmit}
        loading={submitting}
      >
        <Field
          name="first_name"
          component={TextFormRow}
          labelText="First Name"
        />
        <Field name="last_name" component={TextFormRow} labelText="Last Name" />

        <Field name="email" component={TextFormRow} labelText="Email" />

        <div className="mb-4" />

        <Field
          name="password"
          component={PasswordFormRow}
          labelText="Password"
        />

        <Field
          name="password_confirmation"
          component={PasswordFormRow}
          labelText="Repeat password"
        />

        <PositiveButton type="submit" className="ml-auto">
          <i className="fa fa-save mr-1" />
          Save User
        </PositiveButton>
      </FormUi>
    )
  }
}

const validate = values => {
  let errors = {}

  if (!values.first_name) {
    errors.first_name = 'This field is required'
  }

  if (!values.last_name) {
    errors.last_name = 'This field is required'
  }

  if (!values.email) {
    errors.email = 'This field is required'
  } else if (!emailRegex.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (values.password && values.password_confirmation !== values.password) {
    errors.password_confirmation =
      'This password does not match the password you entered'
  }

  return errors
}

const Form = reduxForm({
  form: 'user',
  enableReinitialize: true,
  validate: validate
})(FormComponent)

const mapStateToProps = state => {
  return {}
}

export const UserForm = connect(
  mapStateToProps,
  null
)(Form)
