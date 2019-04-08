import React from 'react'
import { Input } from '../Ui'

const textInputClasses = ''

export const TextInput = props => (
  <Input className={`${textInputClasses}`} {...props} type="text" />
)

export const PasswordInput = props => (
  <Input
    className={`${textInputClasses} h-12 px-2`}
    {...props}
    type="password"
  />
)

export const TextArea = props => (
  <Input
    className={`${textInputClasses} h-48 p-2`}
    {...props}
    type="textarea"
  />
)
