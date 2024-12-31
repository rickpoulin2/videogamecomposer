import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import MyLink from './mylink'

import './hero.css'

const Hero = ({ obj }) => {
  if (obj == null)
    return

  const heading = obj.heading ? <h1>{obj.heading}</h1> : ''
  const image = obj.portraitImage?.gatsbyImageData
  console.log(obj.buttons);
  const buttons = obj.buttons?.map((btn, i, arr) => {
    const cl = 'btn btn-lg ' + (i === arr.length - 1 ? 'btn-secondary' : 'btn-outline-secondary');
    return <MyLink obj={btn} addClasses={cl} />
  });

  return (
    <section className="hero nobg">
      <div className="container g-0 gx-sm-4">
        <div className="row g-0 g-sm-4 py-5 d-flex align-items-center">
          <div className="col-12 col-sm-8 col-md-6 col-lg-8 col-xl-7 col-xxl-6">
            <div className="herocaption my-5">
              <div>
                {heading}
                {renderRichText(obj.body)}
                {buttons}
              </div>
            </div>
          </div>
          <div className="col-12 offset-sm-6 offset-md-0 col-sm-6 col-md-6 col-lg-4 col-xl-5 col-xxl-6">
            <div className="my-5 d-flex justify-content-center align-items-center p-2">
              <div className="portrait">
                <GatsbyImage image={image} className="img-fluid" alt="composer portrait" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  )
}

export default Hero

export const query = graphql`
  fragment ContentfulComponentHero on ContentfulComponentHero {
    heading
    body {
      raw
    }
    buttons {
      ... MyLink
    }
    portraitImage {
      gatsbyImageData
    }
  }
`