import React from 'react'

import { PasswordInput, TextArea, TextInput } from 'components'
import { FormGroup, Label, Col } from '../Ui'

export const FormRow = ({
  labelText,
  name,
  children,
  className = '',
  meta: { touched, error }
}) => (
  <FormGroup className={`${className} row`}>
    <Label for={name} className="col-form-label" md={3}>
      {labelText}
    </Label>
    <Col md={9}>
      {children}
      {touched && (error && <small className="text-danger">{error}</small>)}
    </Col>
  </FormGroup>
)

export const TextFormRow = ({ input, ...wrapperProps }) => (
  <FormRow {...wrapperProps}>
    <TextInput {...input} />
  </FormRow>
)

export const PasswordFormRow = ({ input, ...wrapperProps }) => (
  <FormRow {...wrapperProps}>
    <PasswordInput {...input} />
  </FormRow>
)

export const TextAreaFormRow = ({ input, ...wrapperProps }) => (
  <FormRow {...wrapperProps}>
    <TextArea {...input} />
  </FormRow>
)
