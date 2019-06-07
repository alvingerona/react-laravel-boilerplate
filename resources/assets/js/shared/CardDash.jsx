import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Col } from './Col'
import { Card, CardBody, CardHead, CardFooter } from './Card'

class CardDashComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { children, title, footer, ...rest } = this.props

    return (
      <Col {...rest}>
        <Card>
          <CardHead>
            <Title title={title} />
          </CardHead>
          <CardBody>{children}</CardBody>

          {footer ? <CardFooter>{footer}</CardFooter> : null}
        </Card>
      </Col>
    )
  }
}

export const CardDash = CardDashComponent

const Title = ({ title }) => {
  if (!title) {
    return <i className="fa fa-circle text-muted float-right" />
  }

  return title
}
