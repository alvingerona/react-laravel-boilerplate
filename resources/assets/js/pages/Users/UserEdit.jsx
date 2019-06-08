import React from 'react'
import { connect } from 'react-redux'
import { CardDash } from 'shared'

import { UserForm } from './Forms'
import { actionHttp } from 'utilities'
import { setDashboard } from 'store/action-creators/page'

class EditComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    let { loadUser, setDashboard, match } = this.props

    setDashboard({
      title: 'Edit User',
      breadcrumb: [
        {label: "Users", to: '/users'},
        {label: "Edit"}
      ]
    })

    loadUser(match.params.userId, user => {
      this.setState({ user: { ...user, password: '' } })
    })
  }

  _user(){
    let user = this.state.user;

    if(!user){
      return null;
    }

    return {...user, role: user.role.id};
  }

  render() {
    let { handleSubmit } = this.props
    let user = this._user();

    if(!user){
      return null;
    }

    return (
      <CardDash md={6} title="Edit User">
        <UserForm onSubmit={handleSubmit} initialValues={user} />
      </CardDash>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => ({
  setDashboard: opts => setDashboard(dispatch, opts),
  updateUser: ({ data, history, userId }) => {
    return new actionHttp()
      .setDispatch(dispatch)
      .setSuccessMessage('Successfully updated user.')
      .onSuccess(() => history.push('/users'))
      .put('update-user', `/api/users/${userId}`, data)
  },
  loadUser: (userId, callback) => {
    return new actionHttp()
      .setDispatch(dispatch)
      .onSuccess(resp => callback(resp.data.data))
      .get('get-user', '/api/users/' + userId)
  }
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  handleSubmit: data => {
    let userId = ownProps.match.params.userId

    return dispatchProps.updateUser({
      data: { ...data, id: userId },
      history: ownProps.history,
      userId
    })
  }
})

export const UserEdit = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(EditComponent)
