import React from 'react'
import { graphql } from 'gatsby'
import { Container, Row, Col } from 'react-bootstrap'
import MyLink from './mylink'
import RichText from './richtext'

import './footer.scss'

const Footer = ({ copyrightLine, content, navItems = [], buildTime }) => {
  const navData = navItems?.map((i) =>
    <li key={i.id}><MyLink obj={i} addClasses="nav-link" /></li>
  );
  return (
    <footer>
      <div>
        <Container>
          <Row>
            <Col xs="12" md="7">
              <p className="footer-copyright">{copyrightLine}</p>
              <RichText data={content} />
            </Col>

            <Col as="nav" xs="12" md="5">
              <ul className="nav">
                {navData}
              </ul>
              <div className="last-built">
                Last built: {new Date(buildTime).toLocaleString('en-CA', { timeZone: 'America/Toronto' })} ET
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  )
}

export default Footer

export const query = graphql`
  fragment Footer on ContentfulSiteGlobals {
    footerNavigation {
      ... MyLink
    }
    footerContent {
      ...RichText
    }
    copyrightLine
  }
`
