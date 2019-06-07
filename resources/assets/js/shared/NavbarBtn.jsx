import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from './Button'
import { Badge } from './Badge'

class NavbarBtnComponent extends Component {
  render() {
    let {
      wrapperClass,
      buttonClass,
      onClick,
      children,
      iconClass,
      badge
    } = this.props

    if (!wrapperClass) {
      wrapperClass = ''
    }

    if (!buttonClass) {
      buttonClass = ''
    }

    return (
      <li className={`nav-item ${wrapperClass}`}>
        <Button className={`nav-link ${buttonClass}`} onClick={onClick}>
          {iconClass ? <i className={`${iconClass}`} /> : null}
          {badge ? <Badge type={badge.type}>{badge.content}</Badge> : null}

          {children}
        </Button>
      </li>
    )
  }
}

export const NavbarBtn = NavbarBtnComponent
