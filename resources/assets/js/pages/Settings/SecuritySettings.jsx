import React from 'react'
import { connect } from 'react-redux'
import { Col, Row } from '../../components/Ui'

import { ChangePassword } from './Blocks'

class SecurityComponent extends React.Component {
  render() {
    return (
      <Row>
        <Col xl={3} lg={4} md={4}>
          <h3 className="text-grey-darkest font-normal">
            Change Your Password
          </h3>
          <ChangePassword />
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

export const SecuritySettings = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(SecurityComponent)
