import React from 'react'

import { 
  FormGroup, 
  Label, 
  Col,
  PasswordInput,
  TextArea,
  TextInput,
  SelectInput,
  TextEditor 
} from 'shared'
import { SelectRole } from './SelectRole';

export const FormRow = ({
  labelText,
  name,
  children,
  className = '',
  meta: { touched, error },
  required,
  fieldSize,
  labelSize
}) => {
  if (!fieldSize) {
    fieldSize = { md: 9 }
  }

  if (!labelSize) {
    labelSize = { md: 3 }
  }

  return (
    <FormGroup className={`${className} row`}>
      {labelText ? (
        <Label for={name} className="col-form-label" {...labelSize}>
          {labelText}{' '}
          {required ? <small className="text-danger">*</small> : null}
        </Label>
      ) : null}

      <Col {...fieldSize}>
        {children}
        {touched && (error && <small className="text-danger">{error}</small>)}
      </Col>
    </FormGroup>
  )
}

export const TextFormRow = ({ input, ...wrapperProps }) => {
  return (
    <FormRow {...wrapperProps}>
      <TextInput {...input} />
    </FormRow>
  )
}

export const EditorFormRow = ({ input, ...wrapperProps }) => (
  <FormRow {...wrapperProps}>
    <TextEditor {...input} />
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

export const SelectRoleFormRow = ({ input, ...wrapperProps }) => {
  return (
    <FormRow {...wrapperProps}>
      <SelectRole {...input} />
    </FormRow>
  )
}