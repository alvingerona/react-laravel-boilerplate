import React from 'react'

import { Logo, UserCard } from 'components'
import { NavbarToggler, NavbarUnlist, NavbarLink } from '../Ui'

export const AppHeader = class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      collapsed: false
    }
  }

  _links() {
    return [
      //  { label: 'Dasboard', to: '/' }
    ]
  }

  render() {
    let { dashTitle, toggleShowSidebar } = this.props

    return (
      <header className="app-header navbar">
        <NavbarToggler
          className="d-lg-none mr-auto"
          dataToogle="sidebar-show"
          toggle={toggleShowSidebar}
        />
        <Logo />
        <NavbarToggler
          className="d-md-down-none"
          dataToogle="sidebar-lg-show"
          toggle={toggleShowSidebar}
        />

        {dashTitle ? <h5 className="pr-2 pt-1">{dashTitle}</h5> : null}

        <NavLink links={this._links()} />

        <UserCard className="ml-auto" />
      </header>
    )
  }
}

const NavLink = ({ links }) => {
  if (!links || links.length == 0) {
    return null
  }

  return (
    <NavbarUnlist className="d-md-down-none">
      {links.map((link, i) => (
        <NavbarLink wrapperClass="px-3" to={link.to}>
          {link.label}
        </NavbarLink>
      ))}
    </NavbarUnlist>
  )
}
