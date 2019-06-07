import React, { Component } from 'react'

export const Badge = ({ children, type }) => (
  <span className={`badge badge-pill badge-${type}`}>{children}</span>
)

export const BadgeIcon = ({ children, type, iconClass, label, className }) => (
  <span className={`badge badge-pill badge-${type} ${className}`}>
    <i className={iconClass} /> {children}
    {label}
  </span>
)
