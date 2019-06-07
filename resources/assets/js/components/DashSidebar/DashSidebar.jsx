import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Badge } from 'shared'
import './DashSidebar.scss'
import { user } from 'utilities'

const DashSidebarComponent = class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      collapsed: false
    }
  }

  _links() {
    let user = this._user()
    return [
      { label: 'Dashboard', to: '/', icon: 'icon-speedometer' },
      { label: 'Create Ticket', to: '/tickets/create', icon: 'icon-plus' },
      {
        label: 'Tickets',
        to: '/tickets',
        icon: 'fa fa-ticket',
        // badge: { type: 'danger', content: 5 },
        items: [
          { label: 'All', to: '/tickets' },
          { label: 'Add New', to: '/tickets/create' }
        ]
      },
      { label: 'Extra', type: 'title', hidden: user.isRoleClient() },
      {
        label: 'Users',
        icon: 'icon-people',
        to: '/users',
        hidden: !user.can('can.manage.user'),
        items: [
          { label: 'All Uses', to: '/users' },
          { label: 'Add New', to: '/users/create' }
        ]
      }
    ]
  }

  _user() {
    let { currentUser } = this.props

    return new user(currentUser)
  }

  render() {
    let { toggleMinSidebar, minSidebar, match } = this.props

    return (
      <div className={`sidebar`}>
        <nav className={`sidebar-nav ${minSidebar ? '' : 'ps ps--active-y'}`}>
          <ul className="nav">
            {this._links().map((link, i) => (
              <NavItem key={i} {...link} match={match} />
            ))}
          </ul>
        </nav>
        <button
          className="sidebar-minimizer brand-minimizer"
          type="button"
          onClick={toggleMinSidebar}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.entities.users[state.session.currentUser]
  }
}

const mapDispatchToProps = {}

export const DashSidebar = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashSidebarComponent)

const NavItem = class extends React.Component {
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
