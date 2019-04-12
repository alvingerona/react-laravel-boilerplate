import React from 'react'
import { connect } from 'react-redux'

import { CardDash } from 'components/Ui'
import { setDashboardTitle } from 'store/action-creators/page'
import { TicketsTable } from 'components/TicketsTable/TicketsTable'
import { loadTickets } from 'store/action-creators/tickets'

class PageComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tickets: []
    }

    this._loadTickets = this._loadTickets.bind(this)
  }

  componentDidMount() {
    this.props.setDashboardTitle('Tickets')

    this._loadTickets()
  }

  _loadTickets() {
    this.props.loadTickets({}, data => {
      console.log(data)
    })
  }

  render() {
    let { tickets } = this.state

    return (
      <CardDash md={12} title="All Tickets">
        <TicketsTable tickets={tickets} />
      </CardDash>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => ({
  setDashboardTitle: title => setDashboardTitle(dispatch, title),
  loadTickets: (filters, callback) => loadTickets(dispatch, filters, callback)
})

export const Tickets = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageComponent)
