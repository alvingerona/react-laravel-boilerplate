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
      filter: {}
    }

    this._loadUsers = this._loadUsers.bind(this)
  }

  componentDidMount() {
    this.props.setDashboardTitle('Users')
  }

  _loadUsers({ onCompleted, page }) {
    let { loadUsers } = this.props;
    let { filters } = this.state;
    
    if (!page) {
      page = 1;
    }

    if(!filters){
      filters = {};
    }

    loadUsers({ page, ...filters }, (data, meta) => {
      onCompleted({
        rows: data, 
        pagination: meta.pagination
      })
    })
  }

  render() {
    return (
      <CardDash md={12} title="Active Users">
        <UsersTable onLoad={this._loadUsers} page={this.props.match.params.page} />
      </CardDash>
    )
  }
}

const mapStateToProps = state => {
 // let { entities } = state

  return {
   // users: entities && entities.listUsers ? entities.listUsers : null
  }
}

const mapDispatchToProps = dispatch => ({
  setDashboardTitle: title => setDashboardTitle(dispatch, title),
  loadUsers: (filter, onSuccess) => usersList(dispatch, filter, {
    onSuccess
  })
})

export const Users = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersComponent)
