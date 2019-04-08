import React from 'react'

import { PasswordInput, TextArea, TextInput } from 'components'
import { FormGroup, Label, Col } from '../Ui'

export const FormLine = ({
  labelText,
  name,
  children,
  className = '',
  meta: { touched, error }
}) => (
  <FormGroup row className={`${className}`}>
    <Label sm={2}>{labelText}</Label>
    <Col sm={10}>
      {children}
      {touched &&
        (error && <div className="text-red text-sm mt-2">{error}</div>)}
    </Col>
  </FormGroup>
)

export const TextFormLine = ({ input, ...wrapperProps }) => (
  <FormLine {...wrapperProps}>
    <TextInput {...input} />
  </FormLine>
)

export const PasswordFormLine = ({ input, ...wrapperProps }) => (
  <FormLine {...wrapperProps}>
    <PasswordInput {...input} />
  </FormLine>
)

export const TextAreaFormLine = ({ input, ...wrapperProps }) => (
  <FormLine {...wrapperProps}>
    <TextArea {...input} />
  </FormLine>
)
