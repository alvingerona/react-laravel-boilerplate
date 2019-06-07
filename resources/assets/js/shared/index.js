import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import {
  Label as LabelBS,
  FormGroup as FormGroupBS,
} from 'reactstrap'
import { Badge as BadgeComp } from './Badge'

/**
 * Exports
 */
export { NavItemDropdown } from './NavItemDropdown'
export { DropdownMenu } from './DropdownMenu'
export { CardDash } from './CardDash'
export { Card, CardBody, CardGroup, CardHead } from './Card'
export { Modal, ModalBody, ModalFooter, ModalNotif, ModalHead } from './Modal'
export { NavbarBtn } from './NavbarBtn'
export { Badge, BadgeIcon } from './Badge'
export { PaginationDynamic } from './Pagination'
export { LabelBlock } from './LabelBlock'
export { TableDynamic } from './TableDynamic';
export {
  Button,
  NeutralButton,
  NegativeButton,
  PositiveButton,
  SaveButton,
  ViewButton,
  DeleteButton,
  EditButton,
  CancelButton,
  TrashButton    
} from './Button';
export { Navbar } from './Navbar';
export { Row } from './Row';
export { Col } from './Col'
export { Container } from './Container';
export { FormInputGroup } from './FormInputGroup';
export { Form } from './Forms/Form'
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

export const DropdownToggle = () => <div />

export const Collapse = () => <div />

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
      <Fragment>
        {iconClass ? <i className={`${iconClass}`} /> : null}
        {children}
        {label}
        {badge ? (
          <BadgeComp type={badge.type}>{badge.content}</BadgeComp>
        ) : null}
      </Fragment>
    )
  }

  if(role == "span"){
    delete props.to;
    return <span {...props} />
  }else if (role == 'button') {
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

export {
  Table,
  TableHead,
  TableRow,
  TableRows
} from './Table';

export const PriorityBlock = ({ priority }) => {
  if (!priority) {
    return null
  }

  let type = 'secondary'

  if (priority.name == 'Critical') {
    type = 'danger'
  }

  return <BadgeComp type={type}>{priority.name}</BadgeComp>
}

export const StatusBlock = ({ status }) => {
  if (!status) {
    return null
  }

  let colorKey = status.color_key

  return <BadgeComp type={colorKey}>{status.label}</BadgeComp>
}

export {
  FormLine,
  PasswordFormLine,
  TextFormLine,
  TextAreaFormLine
} from './Forms/FormLine'

export {
  FormLineIcon,
  PasswordFormLineIcon,
  TextFormLineIcon
} from './Forms/FormLineIcon'

/**
 * ++++++++++++++++++++++++++++++++++++++
 *
 *                              Form Row
 *
 * ++++++++++++++++++++++++++++++++++++++
 */
export {
  FormRow,
  PasswordFormRow,
  TextFormRow,
  TextAreaFormRow,
  SelectFormRow,
  EditorFormRow,
  SelectRoleFormRow
} from './Forms/FormRow'

export {
  FormGroupLine,
  TextFormGroupLine,
  PasswordFormGroupLine,
  TextAreaFormGroupLine
} from './Forms/FormGroupLine'

export {
  TextEditor
} from './Forms/TextEditor';

export { PasswordInput, TextArea, TextInput, SelectInput } from './Forms/Inputs'
export { NavTabLinks } from './NavTabLinks'
export {
  NavItem,
  NavLink,
  NavbarBrand
} from './Nav'
export {
  UserBlock
} from './User'
export {
  ProgressOverlay
} from './ProgressOverlay'
export {
  Widget
} from './Widget'