import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { user } from 'utilities'

import {
  CardDash,
  Row,
  Col,
  BadgeIcon,
  Badge,
  LabelBlock,
  TextEditor,
  EditButton,
  UserBlock,
  NeutralButton
} from 'shared'
import { setDashboardTitle } from 'store/action-creators/page'
import { loadTicket } from 'store/action-creators/tickets'
import { Link } from 'react-router-dom'

class PageComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ticket: {},
      openAddComment: false,
      reloadingComment: false,
      openStatusModal: false
    }

    this._onChangeStatus = this._onChangeStatus.bind(this)
    this._loadComments = this._loadComments.bind(this)
  }

  componentDidMount() {
    this._loadTicket(this.props.match.params.ticketId)
  }

  componentWillReceiveProps(next) {
    let props = this.props

    if (
      props.match.params.ticketId &&
      props.match.params.ticketId != next.match.params.ticketId
    ) {
      this._loadTicket(next.match.params.ticketId)
    }
  }

  _onChangeStatus() {
    this.setState({ openStatusModal: false })
    this._loadTicket(this.props.match.params.ticketId, () => {
      this._loadComments()
    })
  }

  _loadTicket(ticketId, success) {
    this.props.loadTicket(ticketId, data => {
      this.props.setDashboardTitle(`Ticket: ${data.data.title}`)
      this.setState({ ticket: data.data })

      if (success) {
        success()
      }
    })
  }

  _isClose() {
    let { ticket } = this.state

    if (!ticket.status) {
      return false
    }

    return (
      ticket.status.data.parent_slug == 'fixed' ||
      ticket.status.data.slug == 'wont-fix'
    )
  }

  _reporter() {
    let { ticket } = this.state
    let { reporter } = ticket ? ticket : {}

    if (!reporter) {
      return {}
    }

    return reporter.data
  }

  _assignee() {
    let { ticket } = this.state
    let { assignee } = ticket ? ticket : {}

    if (!assignee) {
      return {}
    }

    return assignee.data
  }

  _loadComments() {
    this.setState({ reloadingComment: true, openAddComment: false })
  }

  _user() {
    let { currentUser } = this.props

    return new user(currentUser)
  }

  render() {
    let {
      ticket
    } = this.state
    let usr = this._user()

    if (!ticket) {
      return null
    }

    let created_at = ticket.created_at ? ticket.created_at : {}
    let updated_at = ticket.updated_at ? ticket.updated_at : {}
    let category = ticket.category ? ticket.category : {}
    let isClose = this._isClose()
    let canEdit = usr.can('can.ticket.edit')

    return (
      <Fragment>
        <Col md={12}>
          <Row>
            <Col md={8}>
              <Row>
                <CardDash
                  md={12}
                  title={
                    <Fragment>
                      <strong>Subject: </strong>
                      {ticket.subject}
                    </Fragment>
                  }
                >
                  <Row>
                    <FieldBlock
                      label="Reporter"
                      component={<UserBlock user={this._reporter()} />}
                      sizes={{ md: 6 }}
                    />
                    <FieldBlock
                      label="Assignee"
                      component={<UserBlock user={this._assignee()} />}
                      sizes={{ md: 6 }}
                    />
                    <FieldBlock
                      label="Category"
                      component={category.name}
                      sizes={{ md: 6 }}
                    />

                    <FieldBlock
                      label="Description"
                      component={
                        <div className="border border-light p-2 mt-2 rounded">
                          <TextEditor
                            value={ticket.description}
                            readOnly={true}
                          />
                        </div>
                      }
                      sizes={{ md: 12 }}
                    />
                  </Row>
                </CardDash>
              </Row>
            </Col>

            <CardDash md={4}>
              <Row>
                <FieldBlock
                  label="Created"
                  component={created_at.b}
                  sizes={{ md: 6 }}
                />
                <FieldBlock label="Updated" component={updated_at.c} />
              </Row>

              <br />
              {!isClose && canEdit ? (
                <EditButton
                  to={`/tickets/edit/${ticket.id}`}
                  label="Edit Ticket"
                  className="mr-1"
                />
              ) : null}

              {usr.can('can.ticket.change.status' ? <NeutralButton
                label="Change Status"
                onClick={() => this.setState({ openStatusModal: true })}
              /> : null)}
              
            </CardDash>
          </Row>
        </Col>

      </Fragment>
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
  loadTicket: (id, onSuccess) =>
    loadTicket(dispatch, id, data => onSuccess(data))
})

export const TicketBrowse = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageComponent)

const FieldBlock = props => <LabelBlock {...props} />

const DuplicateBlock = ({ ticket }) => {
  if (!ticket) {
    return null
  }

  return (
    <Link to={`/tickets/browse/${ticket.id}`}>
      <Badge type="primary">{ticket.key}</Badge>
    </Link>
  )
}

const InFaqBlock = ({ ticket }) => {
  if (!ticket) {
    return null
  }

  return (
    <BadgeIcon
      type={ticket.is_faq ? 'primary' : 'secondary'}
      label={ticket.is_faq ? 'Yes' : 'No'}
      iconClass={`fa fa-${ticket.is_faq ? 'check' : 'close'}`}
    />
  )
}
