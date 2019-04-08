import React from 'react'

import { Row, Col, Container } from 'components/Ui'

export const FormPageLayout = ({ children, md }) => {
  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={md}>{children}</Col>
        </Row>
      </Container>
    </div>
  )
}
