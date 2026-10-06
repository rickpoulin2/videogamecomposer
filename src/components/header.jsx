import React, { useState } from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Navbar, Offcanvas, Container, Col } from 'react-bootstrap'
import MyLink from './mylink'

import './header.scss'

const Header = ({ siteData }) => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const navData = siteData?.headerNavigation?.map((i) =>
    <li className="nav-item" key={i.id}><MyLink obj={i} addClasses="nav-link" activeClass="active" onClick={handleClose} /></li>
  )
  const headerNav = (
    <>
      <Col as="nav" lg="">
        <ul className="navbar-nav">
          {navData}
        </ul>
      </Col>
      <div className="navbar-cta">
        <MyLink obj={siteData?.headerButtonLink} addClasses="btn btn-outline-primary" onClick={handleClose}></MyLink>
      </div>
    </>
  )

  return (
    <header>
      <Navbar variant="dark" expand="lg">
        <Container fluid="lg">
          <Navbar.Brand as="div">
            <Link to="/" className="site-heading" id="top-of-page">
              <GatsbyImage image={siteData?.siteLogo.gatsbyImageData} className="site-logo" alt="site logo" />
              <p className="h1"><span>{siteData?.siteHeadingStart}</span> {siteData?.siteHeadingEnd}</p>
            </Link>
          </Navbar.Brand>
          <div className="desktop-nav">
            {headerNav}
          </div>
          <Navbar.Toggle aria-controls="mobilenav" onClick={handleShow} />
          <Offcanvas id="mobilenav" show={show} onHide={handleClose} placement="end" aria-labelledby="mobilenav-heading">
            <Offcanvas.Header closeButton="true" closeVariant="white">
              <Link to="/" className="site-heading">
                <GatsbyImage image={siteData?.siteLogo.gatsbyImageData} className="site-logo" alt="site logo" />
                <Offcanvas.Title as="p" className="h3" id="mobilenav-heading">{siteData?.siteHeadingStart} {siteData?.siteHeadingEnd}</Offcanvas.Title>
              </Link>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {headerNav}
              <GatsbyImage image={siteData?.menuBackground.gatsbyImageData} className="menu-background" alt={siteData?.menuBackground.description} />
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header

export const query = graphql`
  fragment Header on ContentfulSiteGlobals {
    headerNavigation {
      ... MyLink
    }
    headerButtonLink {
      ... MyLink
    }
    siteHeadingStart
    siteHeadingEnd
    siteLogo {
      gatsbyImageData(layout:FIXED,width:100)
    }
    menuBackground: siteBackground {
      gatsbyImageData(layout:FIXED,width:420)
    }
  }
`