import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Badge,
  NavItemDropdown,
  DropdownItem,
  DropdownHeader
} from 'shared'
import { headLoadByLatest, markRead } from 'store/action-creators/notifications'

const notifLimit = 10

class NavNotifDropdownComp extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this._onOpen = this._onOpen.bind(this)
  }

  componentDidMount() {
    this.props.headLoadByLatest()
  }

  _count() {
    let { unreadCount } = this.props

    if (unreadCount > 99) {
      return '99+'
    }

    if (unreadCount == 0) {
      return null
    }

    return unreadCount
  }

  _onOpen() {
    let { notifications, markRead } = this.props

    /**
     * Pick all ids for mark as read
     */
    let ids = notifications.map(noti => noti.id)

    markRead(ids)
  }

  render() {
    let { notifications } = this.props
    let count = this._count()
    let labelContent = (
      <Fragment>
        <i className="icon-bell" />
        {count ? <Badge type="danger">{count}</Badge> : null}
      </Fragment>
    )

    if (!notifications || typeof notifications == 'number') {
      return null
    }

    return (
      <NavItemDropdown label={labelContent} onOpen={this._onOpen}>
        <DropdownHeader>Notifications</DropdownHeader>
        {notifications.map((notifi, i) => {
          let type = typeComponents.find(tc => tc.type == notifi.type)

          if (!type) {
            return null
          }

          let Comp = type.component

          return (
            <DropdownItem
              key={i}
              iconClass={type.iconClass}
              role="span"
              label={<Comp data={notifi.data} />}
            />
          )
        })}
      </NavItemDropdown>
    )
  }
}

NavNotifDropdownComp.propTypes = {
  // prop: PropTypes
}

const mapStateToProps = state => {
  return {
    notifications: state.notifications.headNotifications,
    unreadCount: state.notifications.headUnreadCount
  }
}

const mapDispatchToProps = dispatch => ({
  headLoadByLatest: () => headLoadByLatest(dispatch, { limit: notifLimit }),
  markRead: ids => markRead(dispatch, ids)
})

export const NavNotifDropdown = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavNotifDropdownComp)


const SingupWelcome = ({ data }) => <span>{data.welcomeNote}</span>

const CommentStore = ({ data }) => {
  let comment = data.commentData.data;
  let postBy  = comment.posted_by.data;
  let ticketKey = comment.ticket_key ? comment.ticket_key : null;

  return <Link to={`/tickets/browse/${comment.ticket_id}`}>
    <strong>{postBy.name}</strong> posted comment at <strong>{ticketKey}</strong>
  </Link>;
};

const TicketUpdate = ({ data }) => {
  let ticket = data.ticketData.data;

  return <Link to={`/tickets/browse/${ticket.id}`}>Ticket <strong>{ticket.key}</strong> has been updated</Link>;
}

const TicketStore = ({ data }) => {
  let ticket = data.ticketData.data;

  return <Link to={`/tickets/browse/${ticket.id}`}>New Ticket has been created <strong>{ticket.key}</strong></Link>;
}

const TicketStatusChange = ({ data }) => {
  let ticket = data.ticketData.data;
  let { status } = ticket;
  status = status.data;

  return <Link to={`/tickets/browse/${ticket.id}`}><strong>{ticket.key}</strong> status change to <strong>{status.label}</strong></Link>;
}

const typeComponents = [
  {
    type: 'App\\Notifications\\SignupWelcome',
    component: SingupWelcome,
    iconClass: 'fa fa-lock"'
  },
  {
    type: 'App\\Notifications\\CommentStore',
    component: CommentStore,
    iconClass: 'fa fa-comment'
  },
  {
    type: 'App\\Notifications\\TicketUpdate',
    component: TicketUpdate,
    iconClass: 'fa fa-ticket'
  },
  {
    type: 'App\\Notifications\\TicketStore',
    component: TicketStore,
    iconClass: 'fa fa-ticket'
  },
  {
    type: 'App\\Notifications\\TicketStatusChange',
    component: TicketStatusChange,
    iconClass: 'fa fa-area-chart'
  }
]