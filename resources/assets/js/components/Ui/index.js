import React from 'react'
import { Link } from 'react-router-dom'
import { objValueFromDot } from '../../utility-functions'
import { Label as LabelBS, FormGroup as FormGroupBS } from 'reactstrap'
import { Badge as BadgeComp } from './Badge'

/**
 * Exports
 */
export { NavItemDropdown } from './NavItemDropdown'
export { DropdownMenu } from './DropdownMenu'
export { Col } from './Col'
export { CardDash } from './CardDash'
export { Card, CardBody, CardGroup, CardHead } from './Card'
export { Modal, ModalBody, ModalFooter, ModalNotif, ModalHead } from './Modal'
export { Button } from './Button'
export { NavbarBtn } from './NavbarBtn'
export { Badge } from './Badge'

export const Navbar = ({ children }) => (
  <ul className="nav navbar-nav ml-auto">{children}</ul>
)

export const Row = ({ className, children }) => {
  if (!className) {
    className = ''
  }
  return <div className={`row ${className}`}>{children}</div>
}

export const Container = ({ className, children }) => {
  if (!className) {
    className = ''
  }
  return <div className={`container ${className}`}>{children}</div>
}

export const FormInputGroup = ({ className, children, error }) => {
  return (
    <FormGroup className={className ? className : ''}>
      <div className={`input-group`}>{children}</div>
      {error ? <div className="text-danger text-sm">{error}</div> : null}
    </FormGroup>
  )
}

export const FormGroup = props => <FormGroupBS {...props} />

export const InputPrependIcon = ({ iconClass }) => (
  <div className="input-group-prepend">
    <span className="input-group-text">
      <i className={iconClass} />
    </span>
  </div>
)

export const Label = ({ children, className, ...rest }) => (
  <LabelBS for={name} className={className ? className : ''} {...rest}>
    {children}
  </LabelBS>
)

export const Input = ({ type, className, ...rest }) => {
  let classNames = ['form-control']

  if (!type) {
    type = 'text'
  }

  if (className) {
    classNames.push(className)
  }

  if (type == 'textarea') {
    return <textarea {...rest} className={classNames.join(' ')} />
  }

  return <input {...rest} type={type} className={classNames.join(' ')} />
}

export const NavItem = () => <div />

export const NavLink = () => <div />

export const DropdownToggle = () => <div />

export const Collapse = () => <div />

export const NavbarBrand = ({ to, children, full, min }) => (
  <Link className="navbar-brand" to={to}>
    <span className="navbar-brand-full">{full}</span>
    <span className="navbar-brand-minimized">{min}</span>

    {children}
  </Link>
)

export const Nav = () => <div />

export const UncontrolledDropdown = () => <div />

export const DropdownItem = ({
  to,
  children,
  iconClass,
  badge,
  label,
  role,
  onClick
}) => {
  let props = {
    to: to ? to : '#',
    className: 'dropdown-item cursor-pointer',
    children: (
      <React.Fragment>
        {iconClass ? <i className={`${iconClass}`} /> : null}
        {children}
        {label}
        {badge ? (
          <BadgeComp type={badge.type}>{badge.content}</BadgeComp>
        ) : null}
      </React.Fragment>
    )
  }

  if (role == 'button') {
    props.onClick = onClick
    return <a {...props} />
  } else {
    return <Link {...props} />
  }
}

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

export const DropdownHeader = ({ children }) => (
  <div className="dropdown-header text-center">
    <strong>{children}</strong>
  </div>
)

export const Table = ({ className, children, striped, bordered }) => {
  let classNames = ['table table-hover']

  if (striped) {
    classNames.push('table-striped')
  }

  if (className) {
    classNames.push(className)
  }

  if (bordered) {
    classNames.push('table-bordered')
  }

  return <table className={classNames.join(' ')}>{children}</table>
}

export const TableHead = ({ columns }) => {
  return (
    <thead className="thead-light">
      <tr>
        {columns.map((col, i) => {
          return <th key={i}>{col.label}</th>
        })}
      </tr>
    </thead>
  )
}

export const TableRow = ({ columns, data }) => {
  return (
    <tr>
      {columns.map((col, i) => {
        if (col.render) {
          return <td key={i}>{col.render(data)}</td>
        }

        return <td key={i}>{objValueFromDot(data, col.key)}</td>
      })}
    </tr>
  )
}

export const TableRows = ({ columns, rows }) =>
  rows.map((data, i) => <TableRow data={data} columns={columns} key={i} />)

export const ProgressOverlay = ({ show }) => {
  if (!show) {
    return null
  }

  return (
    <div className="progress-overlay">
      <div className="position-relative">
        <div className="progress">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            style={{ width: ' 100%' }}
          >
            Loading please wait...
          </div>
        </div>
      </div>
    </div>
  )
}

export const Form = ({ children, loading, className, onSubmit }) => {
  let classNames = ['position-relative']

  if (className) {
    classNames.push(className)
  }

  return (
    <form className={classNames.join(' ')} onSubmit={onSubmit}>
      {children}

      <ProgressOverlay show={loading} />
    </form>
  )
}
