import React from 'react'
import { Link } from 'react-router-dom'
import { ButtonGroup as BSButtonGroup } from 'reactstrap';

const baseButtonStyles = 'font-semibold'

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
    {label}
    {children}
  </Button>
)

export const NegativeButton = ({
  className = '',
  children,
  label,
  ...buttonProps
}) => (
  <Button {...buttonProps} className={`${baseButtonStyles} ${className}`} type="danger">
    {label}
    {children}
  </Button>
)

export const PositiveButton = ({
  className = '',
  children,
  label,
  ...buttonProps
}) => (
  <Button
    {...buttonProps}
    className={`${baseButtonStyles} ${className}`}
    type="primary"
  >
    {label}
    {children}
  </Button>
)

export const SaveButton = ({ children, label, ...buttonProps }) => (
  <PositiveButton {...buttonProps} type="submit" className="ml-auto">
    <i className="fa fa-save mr-1" />
    {label}
    {children}
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
    {label}
    {children}
  </Button>
)

export const DeleteButton = ({ children, onClick, label, ...buttonProps }) => (
  <Button type="danger" onClick={onClick} {...buttonProps}>
    <i className="fa fa-trash-o" />
    {children}
    {label}
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
    {children}
    {label ? ` ${label}` : null}
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
    {children}
    {label ? ` ${label}` : null}
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
    {children}
    {label ? ` ${label}` : null}
  </Button>
)

export const ButtonGroup = ({ children, items, ...rest }) =>{

  if(items){
    children = items.map((item, i) => (<Button to={item.to} key={i}>{item.label}</Button>));
  }

  return (<BSButtonGroup {...rest} children={children} />)
}