import React from 'react'
import { Input as InputBS } from 'reactstrap';

export const Input = ({ type, className, children, ...rest }) => {
    let classNames = ['form-control']
  
    if (!type) {
      type = 'text'
    }
  
    if (className) {
      classNames.push(className)
    }
  
    return (
      <InputBS {...rest} className={classNames.join(' ')} type={type}>
        {children}
      </InputBS>
    )
  }