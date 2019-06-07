import React from 'react';

import { FormGroup } from 'shared'

export const FormInputGroup = ({ className, children, error }) => {
  return (
    <FormGroup className={className ? className : ''}>
      <div className={`input-group`}>{children}</div>
      {error ? <div className="text-danger text-sm">{error}</div> : null}
    </FormGroup>
  )
}