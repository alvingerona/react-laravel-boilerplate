import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { ProgressOverlay, Col } from 'shared'
import { setDashboardTitle } from 'store/action-creators/page'
import { TicketsTable } from 'components/TicketsTable/TicketsTable'
import { loadTickets } from 'store/action-creators/tickets'

class PageComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tickets: [],
      loading: false,
      pagination: null
    }

    this._loadTickets = this._loadTickets.bind(this)
  }

  componentDidMount() {
    this.props.setDashboardTitle('Tickets')
    this._loadTickets({ page: this.props.match.params.page })
  }

  componentWillReceiveProps(next) {
    let currentMatch = this.props.match
    let nextMatch = next.match

    if (
      nextMatch.params.page &&
      nextMatch.params.page != currentMatch.params.page
    ) {
      this._loadTickets({ page: nextMatch.params.page })
    }
  }

  _loadTickets({ page }) {
    if (!page) {
      page = 1
    }

    this.setState({ loading: true })
    this.props.loadTickets({ page }, data => {
      this.setState({
        tickets: data.data,
        loading: false,
        pagination: data.meta.pagination
      })

      return data
    })
  }

  render() {
    let { tickets, loading, pagination } = this.state
    let { currentUser } = this.props;
    let components = {
      topRight: <TopRightFilter />
    }
    
    return (
      <Col md={12}>
        <ProgressOverlay show={loading} />
        <TicketsTable
          currentUser={currentUser}
          components={components}
          tickets={tickets}
          pagination={pagination}
          onPageLink={({ page }) => {
            return `/tickets/${page}`
          }}
        />
      </Col>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.entities.users[state.session.currentUser]
  }
}

const mapDispatchToProps = dispatch => ({
  setDashboardTitle: title => setDashboardTitle(dispatch, title),
  loadTickets: (filters, callback) => loadTickets(dispatch, filters, callback)
})

export const Tickets = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageComponent)

const TopRightFilter = () => {
  return ''
}
