import React from 'react'
import { Nav as NavBase } from 'reactstrap'
import { Link } from 'react-router-dom'

export const NavItem = () => <div />

export const NavLink = () => <div />

export const NavbarBrand = ({ to, children, full, min }) => (
    <Link className="navbar-brand" to={to}>
      <span className="navbar-brand-full">{full}</span>
      <span className="navbar-brand-minimized">{min}</span>
  
      {children}
    </Link>
)
  
export const Nav = prop => <NavBase {...props} />