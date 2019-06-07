import React, { Component } from 'react'
import { Nav, NavItem } from './Nav'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

export class NavTabLinks extends Component {
  render() {
    let { tabs, location } = this.props

    if (!tabs || tabs.length == 0) {
      return null
    }

    /**
     * Current path
     */
    let pathName = location.pathname

    return (
      <Nav tabs>
        {tabs.map((tab, i) => {
          let btnProps = {
            to: tab.to,
            className: classnames({
              active: pathName == tab.to,
              'cursor-pointer': true,
              'nav-link': true
            })
          }

          return (
            <NavItem key={i}>
              <Link {...btnProps}>{tab.label}</Link>
            </NavItem>
          )
        })}
      </Nav>
    )
  }
}