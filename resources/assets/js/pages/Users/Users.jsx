import React from 'react'
import { connect } from 'react-redux'

import { CardDash } from 'shared'
import { UsersTable } from 'components'
import { usersList } from 'store/action-creators/user'
import { setDashboardTitle } from 'store/action-creators/page'

class UsersComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pagination: null,
      filter: {}
    }
  }
  componentDidMount() {
    let { page, status } = this.props.match.params

    this._loadUsers({
      status,
      page
    })
    this.props.setDashboardTitle('Users')
  }

  componentWillReceiveProps(next) {
    let currentMatch = this.props.match
    let nextMatch = next.match

    if (
      nextMatch.params.page &&
      nextMatch.params.page != currentMatch.params.page
    ) {
      this._loadUsers({ page: nextMatch.params.page })
    }
  }

  _loadUsers(filter) {
    filter = { ...this.state.filter, ...filter }

    this.props.loadUsers(filter, {
      onSuccess: (data, meta) => {
        this.setState({ pagination: meta.pagination })
      }
    })
  }

  render() {
    let { users } = this.props
    let { pagination } = this.state

    return (
      <CardDash md={12} title="Active Users">
        <UsersTable
          users={users}
          pagination={pagination}
          onPageLink={({ page }) => {
            return `/users/${page}`
          }}
        />
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
  loadUsers: (filter, params) => usersList(dispatch, filter, params)
})

export const Users = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersComponent)
