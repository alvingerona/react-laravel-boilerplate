import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export const Button = ({ type, className, to, children, submit, ...rest }) => {
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

  return <button {...props} />
}
