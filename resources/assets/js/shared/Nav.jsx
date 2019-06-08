import React from 'react'
import { Nav as NavBase } from 'reactstrap'
import { Link } from 'react-router-dom'

export const NavLink = () => <div />

export const NavbarBrand = ({ to, children, full, min }) => (
    <Link className="navbar-brand" to={to}>
      <span className="navbar-brand-full">{full}</span>
      <span className="navbar-brand-minimized">{min}</span>
  
      {children}
    </Link>
)
  
export const Nav = (props) => <NavBase {...props} />

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

export const NavItem = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      active: false
    }
  }

  componentWillReceiveProps(next) {
    let props = this.props

    if (next.match && props.match && props.match.path != next.match.path) {
      this._doActive(next)
    }
  }

  componentDidMount() {
    this._doActive(this.props)
  }

  _doActive(props) {
    this.setState({ active: false })
    if (props.match && props.to == props.match.path) {
      this.setState({ open: true, active: true })
    }
  }

  render() {
    let { type, badge, icon, to, label, items, hidden } = this.props
    let { open, active } = this.state

    if (hidden) {
      return null
    }

    if (type == 'title') {
      return <li className="nav-title">{label}</li>
    }

    let linkProps = {
      className: `nav-link `,
      to,
      children: (
        <React.Fragment>
          {icon ? (
            <i className={`nav-icon ` + icon} />
          ) : (
            <i className={`nav-icon fa-circle`} />
          )}
          {label}
          {badge ? <Badge type={badge.type}>{badge.content}</Badge> : null}
        </React.Fragment>
      )
    }

    if (items) {
      linkProps.className = linkProps.className + 'nav-dropdown-toggle'
      linkProps.href = '#'
      linkProps.onClick = e => {
        e.preventDefault()
        this.setState({ open: !open })
      }
    }

    console.log(linkProps)

    return (
      <li
        className={
          `nav-item ` +
          (items ? ' nav-dropdown' : '') +
          (open ? ' open' : '') +
          (active ? ' active' : '')
        }
      >
        {!items ? <Link {...linkProps} /> : <a {...linkProps} />}

        {items ? (
          <ul className="nav-dropdown-items">
            {items.map((item, i) => (
              <NavItem key={i} {...item} tabs={items} />
            ))}
          </ul>
        ) : null}
      </li>
    )
  }
}