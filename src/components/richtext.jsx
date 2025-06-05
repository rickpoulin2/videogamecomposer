import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { INLINES, MARKS, BLOCKS } from '@contentful/rich-text-types'
import { OutboundLink } from 'gatsby-plugin-google-gtag'
import EntryLink from './entry-link'

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
      [INLINES.HYPERLINK]: (node, children) => {
        return <OutboundLink href={node.data.uri} target="_blank" rel="noreferrer">{children}</OutboundLink>
      },
      [INLINES.ENTRY_HYPERLINK]: (node, children) => {
        const target = node.data.target
        return <EntryLink type={target.__typename} slug={target.slug ? target.slug : target.tag}>{children}</EntryLink>
      },
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        console.log(node.data.target.file)
        if (node.data?.target?.gatsbyImageData != null) {
          return <div className="inline-image"><GatsbyImage image={node.data.target.gatsbyImageData} alt={node.data.target.description} /></div>
        }
        if (node.data?.target?.file?.url) {
          return <div className="inline-file"><object data={node.data.target.file.url}></object></div>
        }
        return <></>
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
      __typename
      ... on ContentfulPage {
        contentful_id
        slug: url
      }
      ... on ContentfulBlogEntry {
        contentful_id
        tag: publishedDate(formatString: "YYYYMMDD")
      }
      ... on ContentfulNewsletter {
        contentful_id
        slug: url
      }
      ... on ContentfulAlbum {
        contentful_id
        slug
      }
      ... on ContentfulAsset {
        contentful_id
        description
        gatsbyImageData
        file {
          url
          fileName
        }
      }
    }
  }
`