import React from 'react'

import { 
  FormGroup, 
  Label,
  PasswordInput,
  TextArea,
  TextInput 
} from 'shared'

export const FormLine = ({
  labelText,
  name,
  children,
  className = '',
  meta: { touched, error }
}) => (
  <FormGroup className={`${className}`}>
    <Label>{labelText}</Label>

    {children}
    {touched && (error && <div className="text-red text-sm mt-2">{error}</div>)}
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