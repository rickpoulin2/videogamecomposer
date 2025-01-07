import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import NewsletterCard from './newsletter-card';

const NewsletterList = ({ obj }) => {
  const newsData = useStaticQuery(
    graphql`
      query AllNewsletters {
        data: allContentfulNewsletter(sort: {publishedDate: DESC}) {
          nodes {
            id
            ...NewsletterCard
          }
        }
      }`);
  const items = newsData.data?.nodes?.map((i) =>
    <NewsletterCard key={i.id} obj={i} imageSizing="col-3" />
  );
  const clz = "newsletter-list " + (obj.styles ? obj.styles : "col-12 col-md-9 col-lg-6")
  return (
    <div className={clz}>
      {items}
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