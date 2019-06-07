import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { setDashboardTitle } from 'store/action-creators/page'
import { loadTicket, updateTicket } from 'store/action-creators/tickets'
import { TicketForm } from './Forms/TicketForm'

class PageComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ticket: null
    }

    this._onSubmit = this._onSubmit.bind(this)
  }

  componentDidMount() {
    this._loadTicket(this.props.match.params.ticketId)
  }

  _loadTicket(ticketId) {
    this.props.loadTicket(ticketId, data => {
      let ticket = data.data
      let status = ticket.status ? ticket.status.data.id : null
      let assignee = ticket.assignee ? ticket.assignee.data.id : null
      let priority = ticket.priority ? ticket.priority.id : null
      let project = ticket.proj_id
      let category = ticket.category ? ticket.category.id : null

      this.props.setDashboardTitle(`Edit Ticket: ${ticket.title}`)
      this.setState({
        ticket: { ...ticket, status, assignee, priority, project, category }
      })
    })
  }

  _onSubmit(values) {
    let { ticket } = this.state
    let { ticketForm } = this.props

    return new Promise((resolve, reject) => {
      this.props.updateTicket(ticketForm.values, ticket.id, () => {
        resolve('sucess')
      })
    })
  }

  render() {
    let {} = this.props
    let { ticket } = this.state

    if (!ticket) {
      return null
    }

    return (
      <TicketForm
        isEdit={true}
        initialValues={ticket}
        onSubmit={this._onSubmit}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    ticketForm: state.form.ticket
  }
}

const mapDispatchToProps = dispatch => ({
  setDashboardTitle: title => setDashboardTitle(dispatch, title),
  loadTicket: (id, onSuccess) =>
    loadTicket(dispatch, id, data => onSuccess(data)),
  updateTicket: (field, id, onComplete) =>
    updateTicket(dispatch, field, id, onComplete, resp => {
      dispatch(push(`/tickets/browse/${id}`))
    })
})

export const TicketEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageComponent)
