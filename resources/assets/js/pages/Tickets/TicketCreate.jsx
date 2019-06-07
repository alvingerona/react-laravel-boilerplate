import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { setDashboardTitle } from 'store/action-creators/page'
import { storeTicket } from 'store/action-creators/tickets'
import { defaultTicketCreate } from 'store/action-creators/misc'
import { TicketForm } from './Forms/TicketForm'

class PageComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this._onSubmit = this._onSubmit.bind(this)
  }

  componentDidMount() {
    this.props.setDashboardTitle('Create New Ticket')
    this.props.defaultTicketCreate()
  }

  _onSubmit() {
    let { ticketForm, storeTicket } = this.props

    return new Promise((resolve, reject) => {
      storeTicket(ticketForm.values, () => {
        resolve('sucess')
      })
    })
  }

  render() {
    let { defaultData } = this.props

    if (!defaultData) {
      return null
    }

    return <TicketForm initialValues={defaultData} onSubmit={this._onSubmit} />
  }
}

const mapStateToProps = state => {
  return {
    defaultData: state.misc.default_ticket_create,
    ticketForm: state.form.ticket
  }
}

const mapDispatchToProps = dispatch => ({
  setDashboardTitle: title => setDashboardTitle(dispatch, title),
  defaultTicketCreate: () => defaultTicketCreate(dispatch),
  storeTicket: (field, success) => {
    storeTicket(dispatch, field, resp => {
      success()
      dispatch(push(`/tickets/browse/${resp.data.data.id}`))
    })
  }
})

export const TicketCreate = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageComponent)
