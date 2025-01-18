import React from 'react'
import { Link, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image'
import MyLink from './mylink'

import './header.scss'

const Header = ({ siteLogo, siteHeadingStart = "", siteHeadingEnd = "", navItems = [], buttonLink }) => {
  const navData = navItems?.map((i) =>
    <li className="nav-item" key={i.id}><MyLink obj={i} addClasses="nav-link" activeClass="active" /></li>
  );
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
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div className="offcanvas-header">
              <Link to="/" className="site-heading">
                <GatsbyImage image={siteLogo.gatsbyImageData} className="site-logo" alt="site logo" />
                <p className="h3 offcanvas-title" id="offcanvasDarkNavbarLabel">{siteHeadingStart} {siteHeadingEnd}</p>
              </Link>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <nav className="col-lg">
                <ul className="navbar-nav">
                  {navData}
                </ul>
              </nav>
              <div className="navbar-cta">
                <MyLink obj={buttonLink} addClasses="btn btn-outline-primary"></MyLink>
              </div>
            </div>
          </div>
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