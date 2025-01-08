import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { MARKS } from '@contentful/rich-text-types'

import './commission-card.scss'

const CHANNELS = [
  { title: "YouTube", icon: "youtube", fieldname: "youTube" },
  { title: "Steam", icon: "steam", fieldname: "steam" },
  { title: "itch.io", icon: "itch-io", fieldname: "itchio" },
  { title: "Other", icon: "link", fieldname: "other" },
]

const CommissionCard = ({ obj }) => {
  if (obj == null)
    return

  const developer = obj.developer ? <li><strong>Developer:</strong> {obj.developer}</li> : ""
  const publisher = obj.publisher ? <li><strong>Publisher:</strong> {obj.publisher}</li> : ""
  const releaseYear = obj.releaseYear ? <li><strong>Release Year:</strong> {obj.releaseYear}</li> : ""

  let hasLinks = false;
  const channelLinks = CHANNELS.map(({ title, icon, fieldname }) => {
    let href = obj[fieldname + "Link"];
    if (href == null || href === "")
      return;
    let iconClz = (fieldname === "other" ? "fas " : "fab ") + "fa-" + icon;
    hasLinks = true;
    return (<li><a href={href} title={title} target="_blank" rel="noreferrer"><i className={iconClz}></i></a></li>)
  })
  const footer = hasLinks ? <div className="card-footer"><ul>{channelLinks}</ul></div> : ""

  return (
    <div className="commission-card col-12 col-sm-6 col-lg-4">
      <div className="card">
        <div className="card-top">
          <GatsbyImage image={obj.coverImage.gatsbyImageData} />
        </div>
        <div className="card-body">
          <h3>{obj.title}</h3>
          <ul>
            {developer}
            {publisher}
            {releaseYear}
          </ul>
        </div>
        {footer}
      </div>
    </div>
  )
}

export default CommissionCard

export const query = graphql`
  fragment ContentfulComponentCommissionCard on ContentfulComponentCommissionCard {
    title
    coverImage {
      gatsbyImageData(layout:CONSTRAINED, aspectRatio:1.778)
    }
    developer
    publisher
    releaseYear
    steamLink
    youTubeLink
    itchioLink
    otherLink
  }
`