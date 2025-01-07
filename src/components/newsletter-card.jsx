import React from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import './newsletter-card.scss'

const NewsletterCard = ({ obj, imageSizing }) => {
  const tagLine = obj.tagLine ? <p className="card-text">{obj.tagLine}</p> : ""
  const imgClasses = imageSizing ? imageSizing : "col-4 col-sm-3 col-md-2 col-lg-3 col-xl-6 col-xxl-3"
  return (
    <Link to={"/newsletter/" + obj.url} className="card newsletter-card">
      <div className="row">
        <div className={imgClasses}>
          <GatsbyImage image={obj.bannerImage.gatsbyImageData} />
        </div>
        <div className="col">
          <div className="card-body">
            <p className="card-title"><strong>{obj.heading} / {obj.publishedDate}</strong></p>
            {tagLine}
          </div>
        </div>
      </div>
    </Link>)
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
        gatsbyImageData(layout:CONSTRAINED, height:400, aspectRatio:1, quality:95, placeholder:BLURRED, resizingBehavior:FILL, cropFocus:LEFT)
    }
  }
`