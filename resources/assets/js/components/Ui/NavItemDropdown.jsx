import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropdownMenu } from './DropdownMenu'

class NavItemDropdownComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    let { toggle } = this.props
    let { isOpen } = this.state

    this.setState({ isOpen: !isOpen })

    if (toggle) {
      toggle()
    }
  }

  render() {
    let { label, children } = this.props
    let { isOpen } = this.state

    return (
      <li className={`nav-item dropdown ${isOpen ? 'show' : ''}`}>
        <a
          href="#"
          role="button"
          aria-haspopup="true"
          className="nav-link"
          aria-expanded="false"
          data-toggle="dropdown"
          onClick={e => {
            e.preventDefault()
            this.toggle()
          }}
        >
          {label}
        </a>

        <DropdownMenu right show={isOpen} toggle={this.toggle}>
          {children}
        </DropdownMenu>
      </li>
    )
  }
}

export const NavItemDropdown = NavItemDropdownComponent
