import React from 'react'

export const CardGroup = ({ children, className }) => (
  <div className={`card-group ${className ? className : ''}`}>{children}</div>
)

export const CardBody = ({ children, className }) => (
  <div className={`card-body ${className ? className : ''}`}>{children}</div>
)

export const Card = ({ children, className, withBody }) => {
  return (
    <div className={`card ${className ? className : ''}`}>
      {withBody ? <CardBody>{children}</CardBody> : children}
    </div>
  )
}

export const CardHead = ({ children, iconClass }) => (
  <div className="card-header">
    {iconClass ? <i classClass={iconClass} /> : null}
    {children}
  </div>
)

export const CardFooter = ({ children, className }) => (
  <div className={`card-footer ${className}`}>{children}</div>
)
