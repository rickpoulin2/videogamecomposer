import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import MyLink from './mylink'

//import './poster.scss'

const Poster = ({ obj }) => {
  if (obj == null)
    return

  const styles = "poster " + (obj.styles ? obj.styles : "col-12")
  const heading = obj.fancyHeading ? <h2 className="pix"><span>{obj.fancyHeading}</span></h2> : ""
  let image = ""
  if (obj.image?.gatsbyImageData != null) {
    image = <div className="inline-image"><GatsbyImage image={obj.image.gatsbyImageData} alt={obj.image.description} /></div>
  }
  if (obj.image?.file?.url) {
    image = <div className="inline-file"><object data={obj.image.file.url} alt={obj.image.description}></object></div>
  }

  let body = image
  console.log(obj.link)
  if (obj.link != null) {
    body = <MyLink obj={obj.link}>{body}</MyLink>
  }
  return (
    <div className={styles}>
      {heading}
      {body}
    </div>
  )
}

export default Poster

export const query = graphql`
  fragment ContentfulComponentPoster on ContentfulComponentPoster {
    styles
    fancyHeading
    image {
      description
      gatsbyImageData
    }
    link {
      ... MyLink
    }
  }
`