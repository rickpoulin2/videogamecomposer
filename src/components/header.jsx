import React, { useState, useEffect } from 'react'
import { Link, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image'
import { Navbar, Offcanvas } from 'react-bootstrap';
import MyLink from './mylink'

import './header.scss'

const Header = ({ siteLogo, siteHeadingStart = "", siteHeadingEnd = "", navItems = [], buttonLink }) => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  //useEffect(() => setShow(false))

  const navData = navItems?.map((i) =>
    <li className="nav-item" key={i.id}><MyLink obj={i} addClasses="nav-link" activeClass="active" onClick={handleClose} /></li>
  )
  const headerNav = (
    <>
      <nav className="col-lg">
        <ul className="navbar-nav">
          {navData}
        </ul>
      </nav>
      <div className="navbar-cta">
        <MyLink obj={buttonLink} addClasses="btn btn-outline-primary" onClick={handleClose}></MyLink>
      </div>
    </>
  )

  return (
    <header>
      <nav className="navbar navbar-dark navbar-expand-lg">
        <div className="container-lg">
          <div className="navbar-brand">
            <Link to="/" className="site-heading" id="top-of-page">
              <GatsbyImage image={siteLogo.gatsbyImageData} className="site-logo" alt="site logo" />
              <p className="h1"><span>{siteHeadingStart}</span> {siteHeadingEnd}</p>
            </Link>
          </div>
          <div className="desktop-nav">
            {headerNav}
          </div>
          <Navbar.Toggle aria-controls="mobilenav" onClick={handleShow} />
          <Offcanvas id="mobilenav" show={show} onHide={handleClose} placement="end" aria-labelledby="mobilenav-heading">
            <Offcanvas.Header closeButton="true" closeVariant="white">
              <Link to="/" className="site-heading">
                <GatsbyImage image={siteLogo.gatsbyImageData} className="site-logo" alt="site logo" />
                <Offcanvas.Title as="p" className="h3" id="mobilenav-heading">{siteHeadingStart} {siteHeadingEnd}</Offcanvas.Title>
              </Link>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {headerNav}
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </nav>
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
  }
`