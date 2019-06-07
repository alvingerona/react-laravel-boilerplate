import React from 'react';
import { ProgressOverlay } from 'shared'

export const Form = ({ children, loading, className, onSubmit }) => {
    let classNames = ['position-relative']
  
    if (className) {
      classNames.push(className)
    }
  
    return (
      <form className={classNames.join(' ')} onSubmit={onSubmit}>
        {children}
  
        <ProgressOverlay show={loading} />
      </form>
    )
  }