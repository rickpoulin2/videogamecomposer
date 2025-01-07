import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { MARKS } from '@contentful/rich-text-types'
import MyLink from './mylink'
import NewsletterCard from './newsletter-card'

import './newsletter-latest.scss';

const NewsletterLatest = ({ obj }) => {
  const blogData = useStaticQuery(
    graphql`
      query LatestNewsletterEntries {
        data: allContentfulNewsletter(limit: 1, sort: {publishedDate: DESC}) {
          nodes {
            ...NewsletterCard
          }
        }
      }`);

  let entries = blogData.data?.nodes?.map((i) =>
    <NewsletterCard key={i.id} obj={i} />
  );
  if (!(blogData.data?.nodes?.length > 0)) {
    entries = <li>Nothing here yet! Check back soon.</li>
    buttons = ""
  }
  const rtOptions = {
    renderMark: {
      [MARKS.ITALIC]: (text) => {
        return <em>{text}</em>
      },
      [MARKS.BOLD]: (text) => {
        return <strong>{text}</strong>
      }
    }
  }
  let blurb = renderRichText(obj.trailingBlurb, rtOptions);
  let buttons = obj.buttons?.map((btn, i, arr) => {
    const cl = 'btn ' + (i === arr.length - 1 ? 'btn-primary' : 'btn-outline-primary');
    return <MyLink obj={btn} addClasses={cl} />
  });
  return (
    <div className="newsletter-latest">
      <h2 className="pix"><span>{obj.heading}</span></h2>
      {entries}
      {blurb}
      <div className="cta">
        {buttons}
        <p className="badge text-bg-danger">Add mailing sign up</p>
      </div>
    </div>
  )
}

export default NewsletterLatest

export const query = graphql`
  fragment ContentfulComponentNewsletterLatest on ContentfulComponentNewsletterLatest {
    __typename
    heading
    styles
    trailingBlurb {
        raw
    }
    buttons {
      ...MyLink
    }
  }
`