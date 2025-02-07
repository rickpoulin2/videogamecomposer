import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Col } from 'react-bootstrap'
import MyLink from './mylink'
import RichText from './richtext'
import Section from './section';

import './hero.scss'

const Hero = ({ obj }) => {
  if (obj == null)
    return

  const heading = obj.heading ? <h1>{obj.heading}</h1> : ''
  const image = obj.portraitImage?.gatsbyImageData
  const buttons = obj.buttons?.map((btn, i, arr) => {
    const cl = 'btn btn-lg ' + (i === arr.length - 1 ? 'btn-secondary' : 'btn-outline-secondary');
    return <MyLink key={btn.id} obj={btn} addClasses={cl} />
  });
  const styles = "hero nobg " + (obj.styles ? obj.styles : "");

  return (
    <Section styles={styles}>
      <Col xs="12" sm="9" md="7" lg="8" xl="7" xxl="6">
        <div className="herocaption">
          <div>
            {heading}
            <RichText data={obj.body} />
            <div className="ctas">
              {buttons}
            </div>
          </div>
        </div>
      </Col>
      <Col xs="12" md={true} xl="4">
        <div className="portrait">
          <div>
            <GatsbyImage image={image} className="img-fluid" alt="composer portrait" />
          </div>
        </div>
      </Col>
    </Section>
  )
}

export default Hero

export const query = graphql`
  fragment ContentfulComponentHero on ContentfulComponentHero {
    heading
    styles
    body {
      ...RichText
    }
    buttons {
      ... MyLink
    }
    portraitImage {
      gatsbyImageData(width:850,aspectRatio:0.86)
    }
  }
`