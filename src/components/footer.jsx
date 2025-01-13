import React from 'react'
import { graphql } from 'gatsby'
import MyLink from './mylink'
import RichText from './richtext'

import './footer.scss'

const Footer = ({ copyrightLine, content, navItems = [], buildTime }) => {
  const navData = navItems?.map((i) =>
    <li key={i.url}><MyLink obj={i} addClasses="nav-link" /></li>
  );
  return (
    <footer>
      <div>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-7">
              <p className="footer-copyright">{copyrightLine}</p>
              <RichText data={content} />
            </div>

            <nav className="col-12 col-md-5">
              <ul className="nav">
                {navData}
              </ul>
              <div className="last-built">
                Last built: {new Date(buildTime).toLocaleString('en-CA', { timeZone: 'America/Toronto' })} ET
              </div>
            </nav>
          </div>
        </div>
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
