import React from 'react'

import { FormGroup, Label, PasswordInput, TextArea, TextInput  } from 'shared'

export const FormGroupLine = ({
  labelText,
  name,
  children,
  className = '',
  meta: { touched, error }
}) => (
  <FormGroup className={`${className}`}>
    <Label>{labelText}</Label>

    {children}
    {touched &&
      (error && (
        <div className="text-red help-block text-sm mt-2">{error}</div>
      ))}
  </FormGroup>
)

export const TextFormGroupLine = ({ input, ...wrapperProps }) => (
  <FormGroupLine {...wrapperProps}>
    <TextInput {...input} />
  </FormGroupLine>
)

export const PasswordFormGroupLine = ({ input, ...wrapperProps }) => (
  <FormGroupLine {...wrapperProps}>
    <PasswordInput {...input} />
  </FormGroupLine>
)

export const TextAreaFormGroupLine = ({ input, ...wrapperProps }) => (
  <FormGroupLine {...wrapperProps}>
    <TextArea {...input} />
  </FormGroupLine>
)
