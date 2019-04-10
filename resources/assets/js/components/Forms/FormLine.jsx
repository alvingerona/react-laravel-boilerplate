import React from 'react'

import { PasswordInput, TextArea, TextInput } from 'components'
import { FormInputGroup, Label } from '../Ui'

export const FormLine = ({
  labelText,
  name,
  children,
  className = '',
  meta: { touched, error }
}) => (
  <FormInputGroup className={`${className}`}>
    <Label>{labelText}</Label>

    {children}
    {touched && (error && <div className="text-red text-sm mt-2">{error}</div>)}
  </FormInputGroup>
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
