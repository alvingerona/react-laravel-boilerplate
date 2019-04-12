import React from 'react'

import {
  PasswordInput,
  TextArea,
  TextInput,
  SelectInput,
  SelectRole
} from 'components'
import { FormGroup, Label, Col } from '../Ui'

export const FormRow = ({
  labelText,
  name,
  children,
  className = '',
  meta: { touched, error },
  required
}) => (
  <FormGroup className={`${className} row`}>
    <Label for={name} className="col-form-label" md={3}>
      {labelText} {required ? <small className="text-danger">*</small> : null}
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

export const SelectFormRow = ({ input, options, ...wrapperProps }) => {
  return (
    <FormRow {...wrapperProps}>
      <SelectInput {...input} options={options} />
    </FormRow>
  )
}

export const SelectRoleFromRow = ({ input, options, ...wrapperProps }) => {
  return (
    <FormRow {...wrapperProps}>
      <SelectRole {...input} options={options} />
    </FormRow>
  )
}
