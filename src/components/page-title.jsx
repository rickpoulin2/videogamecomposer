import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import './page-title.scss'

const PageTitle = ({ title, asText }) => {
  const heading = asText ? <p className="h1">{title}</p> : <h1>{title}</h1>
  return (
    <Container className="page-title">
      <Row>
        <Col>
          {heading}
        </Col>
      </Row>
    </Container>
  )
}

export default PageTitle