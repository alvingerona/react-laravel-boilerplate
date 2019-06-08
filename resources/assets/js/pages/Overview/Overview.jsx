import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { setDashboard } from 'store/action-creators/page'
import { overview } from 'store/action-creators/misc'
import { Col, Widget } from 'shared'
import { user } from 'utilities'

const OverviewComponent = class extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    this.props.setDashboard({
      title: 'Dashboard'
    })

    this.props.loadOverview();
  }

  _user() {
    let { currentUser } = this.props

    return new user(currentUser)
  }

  render() {
    let {  } = this.state
    let { openTickets, newComments } = this.props;
    let user = this._user()

    return (
      <Fragment>
        <Col md={3}>
          <Widget title={openTickets} iconClass="fa fa-ticket bg-danger" viewLabel="View Tickets" viewPath="/" />
        </Col>
        <Col md={3}>
        <Widget title={newComments} iconClass="fa fa-comment bg-primary" viewLabel="View Comments" viewPath="/" />
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
  loadOverview: () => overview(dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverviewComponent)
