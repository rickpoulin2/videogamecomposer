import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import MyLink from './mylink'
import NewsletterCard from './newsletter-card'
import RichText from './richtext'

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
  let buttons = ""
  if (!(blogData.data?.nodes?.length > 0)) {
    entries = <li>Nothing here yet! Check back soon.</li>
  } else {
    buttons = obj.buttons?.map((btn, i, arr) => {
      const cl = 'btn ' + (i === arr.length - 1 ? 'btn-primary' : 'btn-outline-primary');
      return <MyLink key={btn.id} obj={btn} addClasses={cl} />
    });
  }
  return (
    <div className={"newsletter-latest " + obj.styles}>
      <h2 className="pix"><span>{obj.heading}</span></h2>
      {entries}
      <RichText data={obj.trailingBlurb} />
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
      ...RichText
    }
    buttons {
      ...MyLink
    }
  }
`