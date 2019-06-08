import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import { UserSettings } from './UserSettings'
import { SecuritySettings } from './SecuritySettings'
import { setDashboardTabs, setDashboardTitle } from 'store/action-creators/page'

export class SettingsRoutesComponent extends Component {
  componentDidMount() {
    this.props.setDashboardTabs(this._tabs())
    this.props.setDashboardTitle("Settings");
  }

  _tabs() {
    const {
      match: { url: currentUrl }
    } = this.props

    return [
      {
        to: `${currentUrl}/user`,
        label: 'Basic Details'
      },
      {
        to: `${currentUrl}/security`,
        label: 'Security'
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
          <Route exact path={`${currentUrl}/user`} component={UserSettings} />
          <Route
            exact
            path={`${currentUrl}/security`}
            component={SecuritySettings}
          />
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
)(SettingsRoutesComponent)
