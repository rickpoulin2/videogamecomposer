import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { MARKS } from '@contentful/rich-text-types'

import './blog-entry.scss';

const BlogEntries = () => {
  const blogData = useStaticQuery(
    graphql`
      query AllBlogEntries {
        data: allContentfulBlogEntry(sort: {publishedDate: DESC}) {
          nodes {
            id
            title
            publishedDate(formatString: "YYYY MMM DD")
            tag: publishedDate(formatString: "YYYYMMDD")
            content {
              raw
            }
          }
        }
      }`);
  let entries = blogData.data?.nodes?.map((i) =>
    <BlogEntry key={i.id} obj={i} />
  );
  if (!(blogData.data?.nodes?.length > 0)) {
    entries =
      <section>
        <div className="container">
          <div>
            <div className="row">
              <div className="col">
                <p>Nothing here yet! Check back again soon.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  }
  return (
    <>
      {entries}
    </>
  )
}

export default BlogEntries

const BlogEntry = ({ obj }) => {
  const htmlid = `entry${obj.tag}`;
  const rtOptions = {
    renderMark: {
      [MARKS.ITALIC]: (text) => {
        return <em>{text}</em>
      },
      [MARKS.BOLD]: (text) => {
        return <strong>{text}</strong>
      }
    },
  }
  let body = renderRichText(obj.content, rtOptions);
  return (
    <article id={htmlid} className="blog">
      <div className="container">
        <div>
          <div className="row">
            <div className="col">
              <div className="blog-heading">
                <h2>{obj.title}</h2>
                <span class="badge text-bg-secondary">{obj.publishedDate}</span>
              </div>
              {body}
            </div>
          </div>
        </div>
      </div>
    </article>)
}

export const query = graphql`
  fragment ContentfulComponentBlogEntries on ContentfulComponentBlogEntries {
    __typename
  }
`