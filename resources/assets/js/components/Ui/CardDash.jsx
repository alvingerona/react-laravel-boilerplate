import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Col } from './Col'
import { Card, CardBody, CardHead } from './Card'

class CardDashComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { children, title, ...rest } = this.props

    return (
      <Col {...rest}>
        <Card>
          <CardHead>{title}</CardHead>
          <CardBody>{children}</CardBody>
        </Card>
      </Col>
    )
  }
}

export const CardDash = CardDashComponent
