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

/**
 * @var dataToogle
 * - aside-menu-show
 * - sidebar-lg-show
 * - sidebar-show
 * - aside-menu-lg-show
 * - aside-menu-show
 */
export const NavbarToggler = ({ className = '', dataToogle, toggle }) => (
  <button
    className={`navbar-toggler sidebar-toggler ${className}`}
    type="button"
    data-toogle={dataToogle}
    onClick={toggle}
  >
    <span className="navbar-toggler-icon" />
  </button>
)

export const NavbarUnlist = ({ children, className = '' }) => (
  <ul className={`nav navbar-nav ${className}`}>{children}</ul>
)


export const NavbarLink = ({
  wrapperClass = '',
  linkClass = '',
  to,
  children,
  iconClass,
  badge
}) => (
  <li className={`nav-item ${wrapperClass}`}>
    <Link className={`nav-link ${linkClass}`} to={to}>
      {iconClass ? <i className={`${iconClass}`} /> : null}
      {badge ? <BadgeComp type={badge.type}>{badge.content}</BadgeComp> : null}

      {children}
    </Link>
  </li>
)
