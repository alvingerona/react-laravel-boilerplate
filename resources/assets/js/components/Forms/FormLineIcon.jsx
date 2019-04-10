import React from 'react'

import { PasswordInput, TextArea, TextInput } from 'components'
import { FormInputGroup, InputPrependIcon } from '../Ui'

export const FormLineIcon = ({
  iconClass,
  name,
  children,
  className = '',
  meta: { touched, error }
}) => (
  <FormInputGroup
    row
    className={`${className} mb-3`}
    error={touched ? error : null}
  >
    <InputPrependIcon iconClass={iconClass} />
    {children}
  </FormInputGroup>
)

export const TextFormLineIcon = ({ input, placeholder, ...wrapperProps }) => (
  <FormLineIcon {...wrapperProps}>
    <TextInput placeholder={placeholder} {...input} />
  </FormLineIcon>
)

export const PasswordFormLineIcon = ({
  input,
  placeholder,
  ...wrapperProps
}) => (
  <FormLineIcon {...wrapperProps}>
    <PasswordInput placeholder={placeholder} {...input} />
  </FormLineIcon>
)

export const TextAreaFormLineIcon = ({
  input,
  placeholder,
  ...wrapperProps
}) => (
  <FormLineIcon {...wrapperProps}>
    <TextArea placeholder={placeholder} {...input} />
  </FormLineIcon>
)
