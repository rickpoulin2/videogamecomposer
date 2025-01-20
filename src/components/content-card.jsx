import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import RichText from './richtext'
import MyLink from './mylink'

import './content-card.scss'

const ContentCard = ({ obj }) => {
  if (obj == null)
    return

  const styles = "content-card " + (obj.styles ? obj.styles : "")
  const heading = obj.fancyHeading ? <h2 className="pix"><span>{obj.fancyHeading}</span></h2> : ""
  const image = obj.image?.gatsbyImageData ? <GatsbyImage image={obj.image.gatsbyImageData} alt={obj.image.description} /> : ""
  const cardClass = "card text-bg-" + obj.cardType
  const buttonClass = "btn btn-lg btn-outline-" + (obj.cardType === "tertiary" || obj.cardType === "light" ? "dark" : "light")
  const buttons = obj.buttons?.map((btn, i, arr) => {
    return <MyLink key={btn.id} obj={btn} addClasses={buttonClass} />
  });

  if (image) {
    return (
      <div className={styles}>
        <div className={cardClass}>
          <div className="card-body">
            {heading}
            <div className="row">
              <div className="col-8">
                <RichText data={obj.content} />
                {buttons}
              </div>
              <div className="col-4 col-lg-3 offset-lg-1 col-xl-2 offet-xl-2">
                {image}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles}>
      <div className={cardClass}>
        <div className="card-body">
          {heading}
          <RichText data={obj.content} />
          {buttons}
        </div>
      </div>
    </div>
  )
}

export default ContentCard

export const query = graphql`
  fragment ContentfulComponentContentCard on ContentfulComponentContentCard {
    styles
    cardType
    fancyHeading
    image {
      description
      gatsbyImageData(width:450)
    }
    content {
      ...RichText
    }
    buttons {
      ... MyLink
    }
  }
`