import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { Table, TableHead, TableRows, ModalNotif } from 'components/Ui'
import { DeleteButton, ViewButton } from 'components'
import { flashMessage } from 'store/action-creators/flashMessages'

class TableComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDeleteModalOpen: false,
      ticketToDelete: null
    }
  }

  _columns() {
    return [
      { label: 'Reporter', key: 'reporter.name' },
      {
        label: 'Subject',
        key: 'created_at.a'
      },
      {
        label: 'Actions',
        key: 'actions',
        render: ticket => {
          return (
            <React.Fragment>
              <ViewButton to={`/tickets/browse/${ticket.id}`} />{' '}
              <DeleteButton
                onClick={() => {
                  this.setState({
                    isDeleteModalOpen: true,
                    ticketToDelete: ticket
                  })
                }}
              />
            </React.Fragment>
          )
        }
      }
    ]
  }

  _findById(ticketId) {
    let { tickets } = this.props
    if (!tickets) {
      return null
    }

    return tickets.find(ticket => ticket.id == ticketId)
  }

  _deleteModalProps() {
    let { isDeleteModalOpen, ticketToDelete } = this.state
    let { onDelete } = this.props

    return {
      onCancel: () => this.setState({ isDeleteModalOpen: false }),
      toggle: () => this.setState({ isDeleteModalOpen: !isDeleteModalOpen }),
      isOpen: isDeleteModalOpen,
      ticket: ticketToDelete,
      title: 'Delete Ticket',
      closeLabel: 'Cancel',
      buttons: {
        save: {
          label: 'Yes',
          type: 'danger',
          onClick: () => {
            onDelete({
              ticket: ticketToDelete,
              callback: () =>
                this.setState({ isDeleteModalOpen: true, ticketToDelete: null })
            })
          }
        }
      }
    }
  }

  render() {
    let { tickets } = this.props

    if (!tickets) {
      return null
    }

    return (
      <Fragment>
        <Table striped bordered>
          <TableHead columns={this._columns()} />
          <tbody>
            <TableRows rows={tickets} columns={this._columns()} />
          </tbody>
        </Table>

        <DeleteModal {...this._deleteModalProps()} />
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  onDelete: ({ ticket, callback }) => {
    dispatch(flashMessage('success', 'Ticket successfully deleted!', 4000))
    callback()
  }
})

export const TicketsTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableComponent)

export const DeleteModal = ({ ticket, ...rest }) => {
  if (!ticket) {
    return null
  }

  return (
    <ModalNotif {...rest}>
      Are you sure to delete ticket{' '}
      <strong>
        {ticket.subject}(ID: {ticket.id})
      </strong>
      ?
    </ModalNotif>
  )
}
