import React from 'react'
import { graphql } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-gtag'

import EntryLink from './entry-link'

const MyLink = ({ obj, addClasses, activeClass, onClick, children, skipContent = false }) => {
  if (obj == null) {
    return ''
  }
  let linkTitle = ""
  let linkContent = skipContent === false ? children : obj.text
  let linkStyles = ""
  let linkIcon = ""
  if (addClasses) {
    linkStyles += addClasses + " "
  }
  if (obj.styles) {
    linkStyles += obj.styles
  }
  if (obj.icon) {
    const faLib = obj.icon === "envelope" ? "fas" : "fab"
    linkIcon = <i className={faLib + " fa-" + obj.icon}></i>
    linkContent = obj.hideText ? linkIcon : <>{linkContent} {linkIcon}</>
    if (obj.hideText) {
      linkTitle = obj.text
    }
  }
  return obj.isInternal ?
    (<EntryLink
      type={obj.targetPage?.__typename}
      slug={obj.targetPage?.slug ? obj.targetPage.slug : obj.targetPage?.tag}
      className={linkStyles}
      activeClassName={activeClass}
      title={linkTitle}
      onClick={onClick}>{linkContent}</EntryLink>)
    :
    (<OutboundLink href={obj.targetLink} target="_blank" rel="noreferrer" className={linkStyles} title={linkTitle} onClick={onClick}>{linkContent}</OutboundLink>)
}

export default MyLink

export const query = graphql`
  fragment MyLink on ContentfulLink {
    id
    isInternal
    text
    targetLink
    targetPage {
      __typename
      ... on ContentfulPage {
        contentful_id
        slug: url
      }
      ... on ContentfulBlogEntry {
        contentful_id
        tag: publishedDate(formatString: "YYYYMMDD")
      }
      ... on ContentfulNewsletter {
        contentful_id
        slug: url
      }
      ... on ContentfulAlbum {
        contentful_id
        slug
      }
    }
    styles
    icon
    hideText
  }
`