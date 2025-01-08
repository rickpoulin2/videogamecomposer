import React from 'react'
import { Link, graphql } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { INLINES, MARKS } from '@contentful/rich-text-types'

const RichText = ({ data, addOptions }) => {
  if (data == null)
    return

  const rtOptions = {
    renderMark: {
      [MARKS.ITALIC]: (text) => {
        return <em>{text}</em>
      },
      [MARKS.BOLD]: (text) => {
        return <strong>{text}</strong>
      },
      ...addOptions?.renderMark
    },
    renderNode: {
      [INLINES.ENTRY_HYPERLINK]: (node, children) => {
        //console.log(node.data)
        if (node.data?.target?.url) {
          return <Link to={"/" + node.data.target.url}>{children}</Link>
        }
        return (<>{children}</>)
      },
      ...addOptions?.renderNode
    }
  }
  return <>{renderRichText(data, rtOptions)}</>
}

export default RichText

export const query = graphql`
  fragment RichText on RichText {
    raw
    references {
      contentful_id
      __typename
      ... on ContentfulPage {
        url
      }
    }
  }
`