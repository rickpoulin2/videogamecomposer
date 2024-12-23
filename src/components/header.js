import React from 'react'
import { Link } from 'gatsby'

import * as styles from './header.scss'

/*
{
  allContentfulSiteGlobals(limit: 1, sort: {fields: siteTitle, order: DESC}) {
    edges {
      node {
        __typename
        siteTitle
        headerNavigation {
          __typename
          id
          text
          hideText
          target {
            title
          }
        }
      }
    }
  }
}
*/

const Header = () => (
  <header>
    <nav class="navbar navbar-dark navbar-expand-lg">
      <div class="container-lg">
        <div class="navbar-brand">
          <a href="home.html" class="d-inline-flex link-body-emphasis text-decoration-none">
            <img src="/img/sitelogo.png" style={{ maxHeight: '50px' }} />
          </a>
          <p class="h1"><span>François</span> Gérin-Lajoie</p>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
          <div class="offcanvas-header">
            <a href="home.html" class="d-inline-flex link-body-emphasis text-decoration-none">
              <img src="/img/sitelogo.png" style={{ maxHeight: '30px', marginRight: '1em' }} />
            </a>
            <p class="h3 offcanvas-title" id="offcanvasDarkNavbarLabel">François Gérin-Lajoie</p>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <nav class="col-lg">
              <ul class="navbar-nav justify-content-center">
                <li class="nav-item"><a href="home.html" class="nav-link px-3 active">Home</a></li>
                <li class="nav-item"><a href="albums.html" class="nav-link px-3">Albums</a></li>
                <li class="nav-item"><a href="credits.html" class="nav-link px-3">Credits</a></li>
                <li class="nav-item"><a href="blog.html" class="nav-link px-3">Reflections</a></li>
                <li class="nav-item"><a href="about.html" class="nav-link px-3">About</a></li>
                <li class="nav-item"><a href="contact.html" class="nav-link px-3">Contact</a></li>
              </ul>
            </nav>
            <div class="navbar-cta">
              <a href="#" class="btn btn-outline-primary">Join Mailing List</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
)

/*
const Navigation = () => (
  <nav role="navigation" className={styles.container} aria-label="Main">
    <Link to="/" className={styles.logoLink}>
      <span className={styles.logo} />
      <span className={styles.navigationItem}>Gatsby Starter Contentful</span>
    </Link>
    <ul className={styles.navigation}>
      <li className={styles.navigationItem}>
        <Link to="/" activeClassName="active">
          Home
        </Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/blog/" activeClassName="active">
          Blog
        </Link>
      </li>
    </ul>
  </nav>
)
*/

export default Header
