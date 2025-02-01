import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import EntryLink from './entry-link'

import './newsletter-card.scss'

const NewsletterCard = ({ obj, imageSizing }) => {
  console.log(this)
  if (obj == null) {
    return ""
  }
  const tagLine = obj.tagLine ? <p className="card-text">{obj.tagLine}</p> : ""
  const imgClasses = imageSizing ? imageSizing : "col-4 col-sm-3 col-md-2 col-lg-3 col-xl-6 col-xxl-3"
  return (
    <EntryLink type="ContentfulNewsletter" slug={obj.url} className="card newsletter-card">
      <div className="row">
        <div className={imgClasses}>
          <GatsbyImage image={obj.bannerImage.gatsbyImageData} alt={obj.bannerImage.description} />
        </div>
        <div className="col">
          <div className="card-body">
            <p className="card-title"><strong>{obj.heading} / {obj.publishedDate}</strong></p>
            {tagLine}
          </div>
        </div>
      </div>
    </EntryLink>)
}

export default NewsletterCard

export const query = graphql`
  fragment NewsletterCard on ContentfulNewsletter {
    id
    heading
    url
    publishedDate(formatString: "MMMM YYYY")
    tagLine
    bannerImage {
      description
      gatsbyImageData(layout:CONSTRAINED, height:400, aspectRatio:1, quality:95, placeholder:BLURRED, resizingBehavior:FILL, cropFocus:LEFT)
    }
  }
`