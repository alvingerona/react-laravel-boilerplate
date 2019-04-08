import React from 'react'
import { connect } from 'react-redux'

import { CardDash } from 'components/Ui'
import { UsersTable } from 'components'
import { usersList } from 'store/action-creators/user'
import { userActions } from 'store/actions'
import { setDashboardTitle } from 'store/action-creators/page'

class UsersComponent extends React.Component {
  componentDidMount() {
    this.props.loadUsers({ status: this.props.match.params.status })
    this.props.setDashboardTitle('Users')
  }

  componentWillReceiveProps(next) {
    if (next.match.params.status != this.props.match.params.status) {
      this.props.loadUsers({ status: next.match.params.status })
    }
  }

  render() {
    let { users } = this.props

    return (
      <CardDash md={12} title="Active Users">
        <UsersTable users={users} />
      </CardDash>
    )
  }
}

const validationFromResponse = values => {
  let errors = {}

  return errors
}

const mapStateToProps = state => {
  let { entities } = state

  return {
    users: entities && entities.listUsers ? entities.listUsers : null
  }
}

const mapDispatchToProps = dispatch => ({
  setDashboardTitle: title => setDashboardTitle(dispatch, title),
  loadUsers: async filter => {
    const response = await dispatch(usersList(filter))

    if (response.status === 400) {
      throw new SubmissionError('users', validationFromResponse(response.data))
    }

    dispatch({
      type: userActions.LIST_USERS,
      listUsers: response.data.data.data
    })
  }
})

export const Users = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersComponent)
