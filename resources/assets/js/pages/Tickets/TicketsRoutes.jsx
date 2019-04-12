import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import { Tickets } from './Tickets'
import { TicketBrowse } from './TicketBrowse'

export class TicketsRoutes extends Component {
  componentDidMount() {}

  render() {
    const {
      match: { url: currentUrl }
    } = this.props

    return (
      <Fragment>
        <Switch>
          <Route exact path={`${currentUrl}/`} component={Tickets} />
          <Route
            exact
            path={`${currentUrl}/browse/:ticketId`}
            component={TicketBrowse}
          />
        </Switch>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketsRoutes)
