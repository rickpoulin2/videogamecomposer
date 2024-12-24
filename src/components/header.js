import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, getSrc } from 'gatsby-plugin-image'

import * as styles from './header.scss'

const Header = ({ siteLogo }) => (
  <header>
    <nav className="navbar navbar-dark navbar-expand-lg">
      <div className="container-lg">
        <div className="navbar-brand">
          <a href="home.html" className="d-inline-flex link-body-emphasis text-decoration-none">
            <GatsbyImage image={siteLogo.gatsbyImageData} className="site-logo" alt="site logo" />
          </a>
          <p className="h1"><span>François</span> Gérin-Lajoie</p>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
          <div className="offcanvas-header">
            <a href="home.html" className="d-inline-flex link-body-emphasis text-decoration-none">
              <GatsbyImage image={siteLogo.gatsbyImageData} className="site-logo" alt="site logo" />
            </a>
            <p className="h3 offcanvas-title" id="offcanvasDarkNavbarLabel">François Gérin-Lajoie</p>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <nav className="col-lg">
              <ul className="navbar-nav justify-content-center">
                <li className="nav-item"><a href="home.html" className="nav-link px-3 active">Home</a></li>
                <li className="nav-item"><a href="albums.html" className="nav-link px-3">Albums</a></li>
                <li className="nav-item"><a href="credits.html" className="nav-link px-3">Credits</a></li>
                <li className="nav-item"><a href="blog.html" className="nav-link px-3">Reflections</a></li>
                <li className="nav-item"><a href="about.html" className="nav-link px-3">About</a></li>
                <li className="nav-item"><a href="contact.html" className="nav-link px-3">Contact</a></li>
              </ul>
            </nav>
            <div className="navbar-cta">
              <a href="#" className="btn btn-outline-primary">Join Mailing List</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
)

/*
const Navigation = () => (
  <nav role="navigation" classNameName={styles.container} aria-label="Main">
    <Link to="/" classNameName={styles.logoLink}>
      <span classNameName={styles.logo} />
      <span classNameName={styles.navigationItem}>Gatsby Starter Contentful</span>
    </Link>
    <ul classNameName={styles.navigation}>
      <li classNameName={styles.navigationItem}>
        <Link to="/" activeclassNameName="active">
          Home
        </Link>
      </li>
      <li classNameName={styles.navigationItem}>
        <Link to="/blog/" activeclassNameName="active">
          Blog
        </Link>
      </li>
    </ul>
  </nav>
)
*/

export default Header
