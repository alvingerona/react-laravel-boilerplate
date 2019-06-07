import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { setDashboard } from 'store/action-creators/page'
import { loadTickets } from 'store/action-creators/tickets'
import { overview } from 'store/action-creators/misc'
import { Link } from 'react-router-dom'
import { Col, Widget } from 'shared'
import { user } from 'utilities'

const OverviewComponent = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tickets: []
    }
  }

  componentDidMount() {
    this.props.setDashboard({
      title: 'Dashboard'
    })

    this.props.loadTickets(resp => {
      this.setState({ tickets: [...this.state.tickets, ...resp.data] })
    })

    this.props.loadOverview();
  }

  _user() {
    let { currentUser } = this.props

    return new user(currentUser)
  }

  render() {
    let { tickets } = this.state
    let { openTickets, newComments } = this.props;
    let user = this._user()

    return (
      <Fragment>
        <Col md={3}>
          <Widget title="1" iconClass="fa fa-ticket bg-danger" viewLabel="View Tickets" viewPath="/" />
        </Col>
        <Col md={3}>
        <Widget title="30" iconClass="fa fa-comment bg-primary" viewLabel="View Comments" viewPath="/" />
        </Col>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  let { misc: { overview } } = state;
  let openTickets = 0;
  let newComments = 0;

  if(overview && overview.open_tickets){
    openTickets = overview.open_tickets;
  }

  if(overview && overview.new_comments){
    newComments = overview.new_comments;
  }

  return {
    currentUser: state.entities.users[state.session.currentUser],
    openTickets,
    newComments
  }
}

const mapDispatchToProps = dispatch => ({
  setDashboard: opts => setDashboard(dispatch, opts),
  loadOverview: () => overview(dispatch),
  loadTickets: onSuccess =>
    loadTickets(
      dispatch,
      { orderBy: 'status_id', sortedBy: 'asc' },
      onSuccess,
      {
        isLazyLoad: true
      }
    )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverviewComponent)
