import React from 'react'

import { Button } from '../Ui'

const baseButtonStyles = 'font-semibold'

export const NeutralButton = ({ className = '', children, ...buttonProps }) => (
  <Button
    type="secondary"
    {...buttonProps}
    className={`${baseButtonStyles} ${className}`}
  >
    {children}
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

export const SaveButton = ({ children, ...buttonProps }) => (
  <PositiveButton {...buttonProps} type="submit" className="ml-auto">
    {children}
  </PositiveButton>
)

export const ViewButton = ({ children, to, onClick, ...buttonProps }) => (
  <Button type="primary" onClick={onClick} to={to} {...buttonProps}>
    <i className="fa fa-search-plus" />
    {children}
  </Button>
)

export const DeleteButton = ({ children, onClick, ...buttonProps }) => (
  <Button type="danger" onClick={onClick} {...buttonProps}>
    <i className="fa fa-trash-o" />
    {children}
  </Button>
)

export const EditButton = ({ children, onClick, to, ...buttonProps }) => (
  <Button type="primary" onClick={onClick} to={to} {...buttonProps}>
    <i className="fa fa-pencil" />
    {children}
  </Button>
)
