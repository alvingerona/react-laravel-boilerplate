import React, { Component } from 'react'

export const Badge = ({ children, type }) => (
  <span className={`badge badge-pill badge-${type}`}>{children}</span>
)
