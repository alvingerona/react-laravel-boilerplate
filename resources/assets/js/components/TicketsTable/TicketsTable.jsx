import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Table,
  TableHead,
  TableRows,
  ModalNotif,
  PriorityBlock,
  StatusBlock,
  PaginationDynamic,
  Row,
  Col,
  DeleteButton, 
  ViewButton, 
  UserBlock
} from 'shared'
import { flashMessage } from 'store/action-creators/flashMessages'
import { user } from 'utilities'

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
      { label: 'Reporter', key: 'reporter.data.name', component: ColumnName },
      {
        label: 'Status',
        key: 'subject',
        thClass: 'text-center',
        tdClass: 'text-center',
        component: ColumnStatus
      },
      { label: 'Key', key: 'key' },
      {
        label: 'Subject',
        key: 'subject'
      },
      {
        label: 'Actions',
        key: 'actions',
        render: ticket => {
          return (
            <React.Fragment>
              <ViewButton to={`/tickets/browse/${ticket.id}`} />{' '}
              {this._user().can('can.ticket.delete') ? <DeleteButton
                onClick={() => {
                  this.setState({
                    isDeleteModalOpen: true,
                    ticketToDelete: ticket
                  })
                }}
              /> : null}
              
            </React.Fragment>
          )
        }
      }
    ]
  }

  _user() {
    let { currentUser } = this.props

    return new user(currentUser)
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
    let { tickets, pagination, onPageLink, components } = this.props

    if (!components) {
      components = {}
    }

    if (!tickets) {
      return null
    }

    let pageProps = {
      pagination,
      onPageLink
    }

    return (
      <Fragment>
        <Row>
          <Col md={6}>
            <PaginationDynamic {...pageProps} />
          </Col>

          {components.topRight ? <Col md={6}>{components.topRight}</Col> : null}
        </Row>

        <Table striped className="border">
          <TableHead columns={this._columns()} />
          <tbody>
            <TableRows rows={tickets} columns={this._columns()} />
          </tbody>
        </Table>

        <PaginationDynamic {...pageProps} />

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
    <ModalNotif {...rest} modalClass="modal-danger">
      Are you sure to delete ticket?
      <strong>
        {ticket.key}: {ticket.subject}
      </strong>
      ?
    </ModalNotif>
  )
}

const ColumnName = ({ data }) => {
  return (
    <Fragment>
      <Link to={`/tickets/browse/${data.id}`} className="text-body">
        <UserBlock user={data.reporter.data} />
        <br />
        <small>Priority: </small>
        <PriorityBlock priority={data.priority} />
        <small className="ml-2">Category: </small>
        {data.category.name}
      </Link>
    </Fragment>
  )
}

const ColumnStatus = ({ data }) => {
  let status = null

  if (data.status) {
    status = data.status.data
  }

  return <StatusBlock status={status} />
}
