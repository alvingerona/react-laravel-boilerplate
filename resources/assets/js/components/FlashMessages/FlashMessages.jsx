import React from 'react'

export const BaseFlashMessage = ({ className = '', children }) => (
  <div className={`alert rounded-0 fade mb-0 show ${className}`} role="alert">
    {children}
    {/* TODO: add close button */}
    {/* 
    <button
      type="button"
      className="close"
      aria-label="Close"
      onClick={handleDeleteClick}
    >
      <span aria-hidden="true">×</span>
    </button> */}
  </div>
)

export const NeutralFlashMessage = ({ message, ...wrapperProps }) => (
  <BaseFlashMessage {...wrapperProps} className="alert-primary">
    {message}
  </BaseFlashMessage>
)

export const NegativeFlashMessage = ({ message, ...wrapperProps }) => (
  <BaseFlashMessage {...wrapperProps} className="alert-danger">
    {message}
  </BaseFlashMessage>
)

export const WarningFlashMessage = ({ message, ...wrapperProps }) => (
  <BaseFlashMessage {...wrapperProps} className="alert-warning">
    {message}
  </BaseFlashMessage>
)

export const PositiveFlashMessage = ({ message, ...wrapperProps }) => (
  <BaseFlashMessage {...wrapperProps} className="alert-success">
    {message}
  </BaseFlashMessage>
)
