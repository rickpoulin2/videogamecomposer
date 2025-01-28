import React from 'react'
import { Container, Row } from 'react-bootstrap'

const Section = ({ styles, children }) =>
  <section className={styles}>
    <Container>
      <div>
        <Row>
          {children}
        </Row>
      </div>
    </Container>
  </section>

export default Section