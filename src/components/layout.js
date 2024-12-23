import React from 'react'

import './variables.css'
import './global.css'

import { useStaticQuery, graphql } from 'gatsby'
import Seo from './seo'
import Header from './header'
import Footer from './footer'

const Layout = (props) => {

  const { children } = props
  const { allContentfulSiteGlobals } = useStaticQuery(
    graphql`
query SiteGlobalsQuery {
  allContentfulSiteGlobals(limit: 1, sort: {fields: siteTitle, order: DESC}) {
    edges {
      node {
        __typename
        siteTitle
        headerNavigation {
          __typename
        }
        footerNavigation {
          __typename
        }
        footerContent {
          raw
        }
        copyrightLine
        siteLogo {
          id
        }
        siteIcon {
          fluid {
            src
          }
        }
      }
    }
  }
}
    `
  )
  const siteData = allContentfulSiteGlobals?.edges[0]?.node;

  return (
    <>
      <Seo defaultTitle={siteData?.siteTitle} image={siteData.siteIcon.fluid.src} />
      <Header navItems={siteData?.headerNavigation} />
      <main>{children}</main>
      <Footer copyrightLine={siteData?.copyrightLine} content={siteData?.footerContent} navItems={siteData?.footerNavigation} />
    </>
  )
}

export default Layout
