import React from 'react'

export const Container = ({ className, children }) => {
    if (!className) {
      className = ''
    }
    return <div className={`container ${className}`}>{children}</div>
}