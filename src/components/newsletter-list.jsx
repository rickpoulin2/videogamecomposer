import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import NewsletterCard from './newsletter-card';

import './newsletter-list.scss';

const NewsletterList = ({ obj }) => {
  const newsData = useStaticQuery(
    graphql`
      query AllNewsletters {
        data: allContentfulNewsletter(
          sort: {publishedDate: DESC},
          filter: {
            url: {ne:null},
            heading: {ne:null},
            bodyContent: { raw: {ne:null} },
            publishedDate: {ne:null},
            tagLine: {ne:null},
            bannerImage: { contentful_id: {ne:null} }
          }) {
          nodes {
            id
            ...NewsletterCard
          }
        }
      }`);
  const items = newsData.data?.nodes?.map((i) =>
    <NewsletterCard key={i.id} obj={i} imageSizing="col-3 col-md-2 col-lg-3 col-xxl-3" />
  );
  const clz = "newsletter-list " + (obj.styles ? obj.styles : "col-12 col-md-12 col-lg-6 col-xxl-8")
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