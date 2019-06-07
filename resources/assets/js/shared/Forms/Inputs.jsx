import React from 'react'
import { Input } from './Input'

const textInputClasses = ''

export const TextInput = props => {
  return <Input className={`${textInputClasses}`} {...props} type="text" />
}

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

export const SelectInput = ({ options, placeholder, ...props }) => {
  if (!options) {
    return null
  }

  if (!placeholder) {
    placeholder = 'Select item...'
  }

  return (
    <Input className={`${textInputClasses}`} {...props} type="select">
      <option value={''}>{placeholder}</option>
      {options.map((opt, i) => {
        if (opt.children) {
          return (
            <optgroup label={opt.label} key={i}>
              {opt.children.map((opt1, i1) => (
                <option key={i1} value={opt1.value}>
                  {opt1.label}
                </option>
              ))}
            </optgroup>
          )
        }

        return (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        )
      })}
    </Input>
  )
}
