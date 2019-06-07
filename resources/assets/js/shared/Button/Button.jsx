import React from 'react'
import { Link } from 'react-router-dom'

export const Button = ({ type, className, to, children, submit, button, ...rest }) => {
  let classNames = ['btn']
  if (className) {
    classNames.push(className)
  }

  if (type) {
    classNames.push('btn-' + type)
  } else {
    classNames.push('btn-default')
  }

  let props = {
    children: children,
    className: classNames.join(' '),
    ...rest
  }

  if (to) {
    props.to = to
    return <Link {...props} />
  }

  if (submit) {
    props.type = 'submit'
  }

  if(button) {
    props.type = 'button';
  }

  return <button {...props} />
}


const baseButtonStyles = 'font-semibold'

export const NeutralButton = ({
  className = '',
  children,
  label,
  ...buttonProps
}) => (
  <Button
    type="secondary"
    {...buttonProps}
    className={`${baseButtonStyles} ${className}`}
  >
    {children}
    {label}
  </Button>
)

export const NegativeButton = ({
  className = '',
  children,
  ...buttonProps
}) => (
  <Button {...buttonProps} className={`${baseButtonStyles} ${className}`}>
    {children}
  </Button>
)

export const PositiveButton = ({
  className = '',
  children,
  ...buttonProps
}) => (
  <Button
    {...buttonProps}
    className={`${baseButtonStyles} ${className}`}
    type="primary"
  >
    {children}
  </Button>
)

export const SaveButton = ({ children, label, ...buttonProps }) => (
  <PositiveButton {...buttonProps} type="submit" className="ml-auto">
    <i className="fa fa-save mr-1" />
    {children}
    {label}
  </PositiveButton>
)

export const ViewButton = ({
  children,
  label,
  to,
  onClick,
  ...buttonProps
}) => (
  <Button type="primary" onClick={onClick} to={to} {...buttonProps}>
    <i className="fa fa-search-plus" />
    {children}
    {label}
  </Button>
)

export const DeleteButton = ({ children, onClick, ...buttonProps }) => (
  <Button type="danger" onClick={onClick} {...buttonProps}>
    <i className="fa fa-trash-o" />
    {children}
  </Button>
)

export const EditButton = ({
  children,
  label,
  onClick,
  to,
  ...buttonProps
}) => (
  <Button type="primary" onClick={onClick} to={to} {...buttonProps}>
    <i className="fa fa-pencil" />
    {label ? ` ${label}` : null}
    {children}
  </Button>
)

export const CancelButton = ({
  children,
  label,
  onClick,
  to,
  ...buttonProps
}) => (
  <Button type="danger" onClick={onClick} to={to} {...buttonProps}>
    <i className="fa fa-close" />
    {label ? ` ${label}` : null}
    {children}
  </Button>
)

export const TrashButton = ({
  children,
  label,
  onClick,
  to,
  ...buttonProps
}) => (
  <Button type="danger" onClick={onClick} to={to} {...buttonProps}>
    <i className="fa fa-trash" />
    {label ? ` ${label}` : null}
    {children}
  </Button>
)