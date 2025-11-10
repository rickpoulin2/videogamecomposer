import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import RichText from './richtext'

import './testimonials.scss'

const Testimonials = ({ obj }) => {
  if (obj == null)
    return

  const styles = "testimonials " + (obj.styles ? obj.styles : "")

  const image1 = obj.testimonial1Image?.gatsbyImageData ? <div className="pic"><GatsbyImage image={obj.testimonial1Image.gatsbyImageData} alt={obj.testimonial1Image.description} /></div> : ""
  const quote1 = obj.testimonial1Text == null ? "" : <blockquote>{image1}<RichText data={obj.testimonial1Text} /></blockquote>

  const image2 = obj.testimonial2Image?.gatsbyImageData ? <div className="pic"><GatsbyImage image={obj.testimonial2Image.gatsbyImageData} alt={obj.testimonial2Image.description} /></div> : ""
  const quote2 = obj.testimonial2Text == null ? "" : <blockquote>{image2}<RichText data={obj.testimonial2Text} /></blockquote>

  const image3 = obj.testimonial3Image?.gatsbyImageData ? <div className="pic"><GatsbyImage image={obj.testimonial3Image.gatsbyImageData} alt={obj.testimonial3Image.description} /></div> : ""
  const quote3 = obj.testimonial3Text == null ? "" : <blockquote>{image3}<RichText data={obj.testimonial3Text} /></blockquote>

  return (
    <div className={styles}>
      <h2 className="visually-hidden">{obj.heading}</h2>
      {quote1}
      {quote2}
      {quote3}
    </div>
  )
}

export default Testimonials

export const query = graphql`
  fragment ContentfulComponentTestimonials on ContentfulComponentTestimonials {
    heading
    testimonial1Image {
      description
      gatsbyImageData(layout:CONSTRAINED, height:70, aspectRatio:1, quality:95, placeholder:BLURRED, resizingBehavior:FILL, cropFocus:CENTER)
    }
    testimonial1Text {
      ...RichText
    }
    testimonial2Image {
      description
      gatsbyImageData(layout:CONSTRAINED, height:70, aspectRatio:1, quality:95, placeholder:BLURRED, resizingBehavior:FILL, cropFocus:CENTER)
    }
    testimonial2Text {
      ...RichText
    }
    testimonial3Image {
      description
      gatsbyImageData(layout:CONSTRAINED, height:70, aspectRatio:1, quality:95, placeholder:BLURRED, resizingBehavior:FILL, cropFocus:CENTER)
    }
    testimonial3Text {
      ...RichText
    }
  }
`