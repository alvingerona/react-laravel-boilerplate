import React from 'react'
import { Link } from 'react-router-dom'

import { Badge } from '../Ui'
import './DashSidebar.scss'

export const DashSidebar = class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      collapsed: false
    }
  }

  _links() {
    return [
      { label: 'Dashboard', to: '/', icon: 'icon-speedometer' },
      {
        label: 'Tickets',
        to: '/tickets',
        icon: 'icon-speech',
        badge: { type: 'danger', content: 5 }
      },

      { label: 'Extra', type: 'title' },
      {
        label: 'Users',
        icon: 'icon-people',
        to: '/users',
        items: [
          { label: 'All Uses', to: '/users' },
          { label: 'Add New', to: '/users/create' }
        ]
      }
    ]
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
    let { type, badge, icon, to, label, items } = this.props
    let { open, active } = this.state

    if (type == 'title') {
      return <li className="nav-title">{label}</li>
    }

    let linkProps = {
      className: `nav-link `,
      to,
      children: (
        <React.Fragment>
          {icon ? <i className={`nav-icon ` + icon} /> : null}
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
