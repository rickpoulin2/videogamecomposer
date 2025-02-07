import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { BLOCKS } from '@contentful/rich-text-types'
import { Row, Col, Badge } from 'react-bootstrap'
import RichText from './richtext'

import './text.scss'

const Text = ({ obj }) => {
  if (obj == null)
    return
  if (obj.content == null)
    return

  const styles = "textblock " + (obj.styles ? obj.styles : "col-12")
  const heading = obj.fancyHeading ? <h2 className="pix"><span>{obj.fancyHeading}</span></h2> : ""
  const image = obj.image?.gatsbyImageData ? <GatsbyImage image={obj.image.gatsbyImageData} alt={obj.image.description} /> : ""
  const dateTag = obj.dateTag ? <Badge bg="secondary">{obj.dateTag}</Badge> : ""
  let sawParagraph = false;
  const rtOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => {
        if (!sawParagraph) {
          sawParagraph = true;
          return <p>{dateTag} {children}</p>
        }
        return <p>{children}</p>
      },
    }
  }
  let body = <RichText data={obj.content} addOptions={rtOptions} />

  if (image) {
    return (
      <div className={styles}>
        {heading}
        <Row>
          <Col xs="3" lg="2">
            {image}
          </Col>
          <Col>
            {body}
          </Col>
        </Row>
      </div>
    )
  }

  return (
    <div className={styles}>
      {heading}
      {body}
    </div>
  )
}

export default Text

export const query = graphql`
  fragment ContentfulComponentText on ContentfulComponentText {
    styles
    fancyHeading
    dateTag(formatString: "MMM YYYY")
    image {
      description
      gatsbyImageData(width:400)
    }
    content {
      ...RichText
    }
  }
`