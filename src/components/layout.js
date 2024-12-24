import React from 'react'

import "bootstrap/dist/css/bootstrap.min.css";
import './variables.css'
import './global.css'

import { useStaticQuery, graphql } from 'gatsby'
import { getSrc } from 'gatsby-plugin-image'
import Seo from './seo'
import Header from './header'
import Footer from './footer'

const Layout = (props) => {

  const { children } = props
  const { allContentfulSiteGlobals } = useStaticQuery(
    graphql`
query SiteGlobalsQuery {
  allContentfulSiteGlobals(limit: 1, sort: {siteTitle: DESC}) {
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
          gatsbyImageData(width:50)
        }
        siteIcon {
          gatsbyImageData(layout:FIXED)
        }
        siteBackground {
          gatsbyImageData(layout:FIXED)
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
      <style>{`body { background-image: url(${getSrc(siteData.siteBackground)}) }`}</style>
      <Seo defaultTitle={siteData?.siteTitle} image={getSrc(siteData.siteIcon)} />
      <Header navItems={siteData?.headerNavigation} siteLogo={siteData.siteLogo} />
      <main>{children}</main>
      <Footer copyrightLine={siteData?.copyrightLine} content={siteData?.footerContent} navItems={siteData?.footerNavigation} />
    </>
  )
}

export default Layout
