import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import { Users } from './Users'
import { UserCreate } from './UserCreate'
import { UserEdit } from './UserEdit'
import { setDashboardTabs, setDashboardTitle } from 'store/action-creators/page'

export class UsersRoutesComponent extends Component {
  componentDidMount() {
    this.props.setDashboardTabs(this._tabs())
    //    this.props.setDashboardTitle('Users')
  }

  _tabs() {
    const {
      match: { url: currentUrl }
    } = this.props

    return [
      {
        to: `${currentUrl}`,
        label: 'All Users'
      },
      {
        to: `${currentUrl}/create`,
        label: 'Add New'
      }
    ]
  }

  render() {
    const {
      match: { url: currentUrl }
    } = this.props

    return (
      <Fragment>
        <Switch>
          <Route exact path={`${currentUrl}/create`} component={UserCreate} />
          <Route
            exact
            path={`${currentUrl}/edit/:userId`}
            component={UserEdit}
          />
          <Route exact path={`${currentUrl}/`} component={Users} />
        </Switch>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => ({
  setDashboardTabs: tabs => setDashboardTabs(dispatch, tabs),
  setDashboardTitle: title => setDashboardTitle(dispatch, title)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersRoutesComponent)
