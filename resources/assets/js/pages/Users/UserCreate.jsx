import React from 'react'
import { connect } from 'react-redux'
import { CardDash } from 'shared'

import { UserForm } from './Forms'
import { actionHttp } from 'utilities'
import { setDashboard } from 'store/action-creators/page'

class CreateComponent extends React.Component {
  componentDidMount() {
    this.props.setDashboard({
      title: 'Create User'
    })
  }

  render() {
    let { handleSubmit } = this.props

    return (
      <CardDash md={6} title="Create New User">
        <UserForm onSubmit={handleSubmit} />
      </CardDash>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => ({
  setDashboard: opts => setDashboard(dispatch, opts),
  /**
   * TODO: remove history parameter then use redux history instead.
   */
  createUser: (data, history) => {
    return new actionHttp()
      .setDispatch(dispatch)
      .setSuccessMessage('Successfully saved user.')
      .onSuccess(() => history.push('/users'))
      .post('add-user', '/api/users', data)
  }
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  handleSubmit: data => {
    return dispatchProps.createUser(data, ownProps.history)
  }
})

export const UserCreate = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(CreateComponent)
