import React from 'react'

export const Row = ({ className, children }) => {
    if (!className) {
      className = ''
    }
    return <div className={`row ${className}`}>{children}</div>
}
  