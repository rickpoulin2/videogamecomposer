import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'

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
    renderMark: {
      [MARKS.ITALIC]: (text) => {
        return <em>{text}</em>
      },
      [MARKS.BOLD]: (text) => {
        return <strong>{text}</strong>
      }
    },
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
  let body = renderRichText(obj.content, rtOptions);
  if (dateTag && !sawParagraph) {
    body = <>{dateTag} {body}</>
  }

  if (image) {
    return (
      <div className={styles}>
        {heading}
        <div class="row">
          <div class="col-3 col-lg-2">
            {image}
          </div>
          <div class="col">
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
      raw
    }
  }
`