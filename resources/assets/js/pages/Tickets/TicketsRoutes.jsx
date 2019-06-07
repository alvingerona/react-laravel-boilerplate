import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import { Tickets } from './Tickets'
import { TicketBrowse } from './TicketBrowse'
import { TicketCreate } from './TicketCreate'
import { TicketEdit } from './TicketEdit'
import { user } from 'utilities'

export class TicketsRoutes extends Component {
  componentDidMount() {}

  _user() {
    let { currentUser } = this.props

    return new user(currentUser)
  }

  render() {
    const {
      match: { url: currentUrl }
    } = this.props

    return (
      <Fragment>
        <Switch>
          <Route
            exact
            path={`${currentUrl}/browse/:ticketId`}
            component={TicketBrowse}
          />
          <Route exact path={`${currentUrl}/create`} component={TicketCreate} />

          {this._user().can('can.ticket.edit') ? <Route
            exact
            path={`${currentUrl}/edit/:ticketId`}
            component={TicketEdit}
          /> : null}

          <Route exact path={`${currentUrl}/:page?`} component={Tickets} />
        </Switch>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.entities.users[state.session.currentUser]    
  }
}

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketsRoutes)
