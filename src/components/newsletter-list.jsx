import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import NewsletterCard from './newsletter-card';

const NewsletterList = ({ obj }) => {
  const albumData = useStaticQuery(
    graphql`
      query AllNewsletters {
        data: allContentfulNewsletter(sort: {publishedDate: DESC}) {
          nodes {
            id
            ...NewsletterCard
          }
        }
      }`);
  const items = albumData.data?.nodes?.map((i) =>
    <NewsletterCard key={i.id} obj={i} imageSizing="col-3" />
  );
  const clz = "newsletter-list col " + (obj.styles ? obj.styles : "")
  return (
    <div className={clz}>
      <div className="col-12 col-md-9 col-lg-6">
        {items}
      </div>
    </div>
  )
}

export default NewsletterList

export const query = graphql`
  fragment ContentfulComponentNewsletterList on ContentfulComponentNewsletterList {
    __typename
    styles
  }
`