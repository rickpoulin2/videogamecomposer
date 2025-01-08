import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { BLOCKS } from '@contentful/rich-text-types'
import RichText from './richtext'

import './text.scss'

const Text = ({ obj }) => {
  if (obj == null)
    return

  const styles = "textblock " + (obj.styles ? obj.styles : "")
  const heading = obj.fancyHeading ? <h2 className="pix"><span>{obj.fancyHeading}</span></h2> : ""
  const image = obj.image?.gatsbyImageData ? <GatsbyImage image={obj.image.gatsbyImageData} /> : ""
  const dateTag = obj.dateTag ? <span className="badge text-bg-secondary">{obj.dateTag}</span> : ""
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
        <div className="row">
          <div className="col-3 col-lg-2">
            {image}
          </div>
          <div className="col">
            {body}
          </div>
        </div>
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
      gatsbyImageData
    }
    content {
      ...RichText
    }
  }
`