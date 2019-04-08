import React from 'react'
import { connect } from 'react-redux'

import { Col, Row } from '../../components/Ui'

import { BasicSettings } from './Blocks'

class UserSettingsComponent extends React.Component {
  render() {
    return (
      <Row>
        <Col xl={3} lg={4} md={4}>
          <h3 className="text-grey-darkest font-normal">Your Details</h3>
          <BasicSettings />
        </Col>
      </Row>
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
