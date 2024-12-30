import React from 'react'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import MyLink from './mylink'

import './footer.scss'

const Footer = ({ copyrightLine, content, navItems = [] }) => {
  const navData = navItems?.map((i) =>
    <li key={i.url}><MyLink obj={i} addClasses="nav-link" /></li>
  );
  return (
    <footer>
      <div>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8">
              <p className="footer-copyright">{copyrightLine}</p>
              {renderRichText(content)}
            </div>

            <nav className="col-12 col-md-4">
              <ul className="nav">
                {navData}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
