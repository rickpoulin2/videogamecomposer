import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import MyLink from './mylink'

import './hero.scss'

const Hero = ({ obj }) => {
  if (obj == null)
    return

  const heading = obj.heading ? <h1>{obj.heading}</h1> : ''
  const image = obj.portraitImage?.gatsbyImageData
  const buttons = obj.buttons?.map((btn, i, arr) => {
    const cl = 'btn btn-lg ' + (i === arr.length - 1 ? 'btn-secondary' : 'btn-outline-secondary');
    return <MyLink obj={btn} addClasses={cl} />
  });
  const styles = "hero nobg " + (obj.styles ? obj.styles : "");

  return (
    <section className={styles}>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-8 col-md-6 col-lg-8 col-xl-7 col-xxl-6">
            <div className="herocaption">
              <div>
                {heading}
                {renderRichText(obj.body)}
                {buttons}
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="portrait">
              <div>
                <GatsbyImage image={image} className="img-fluid" alt="composer portrait" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

export const query = graphql`
  fragment ContentfulComponentHero on ContentfulComponentHero {
    heading
    styles
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