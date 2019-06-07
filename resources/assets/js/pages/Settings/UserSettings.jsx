import React from 'react'
import { connect } from 'react-redux'

import { BasicSettings } from './Blocks'
import { CardDash } from 'shared'

class UserSettingsComponent extends React.Component {
  render() {
    return (
      <CardDash xl={5} lg={6} md={6} title="Your Details">
        <BasicSettings />
      </CardDash>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => ({})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

export const UserSettings = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(UserSettingsComponent)
