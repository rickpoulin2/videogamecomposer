import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import RichText from './richtext'

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
              ...RichText
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
  return (
    <article id={htmlid} className="blog">
      <div className="container">
        <div>
          <div className="row">
            <div className="col blog-entry">
              <div className="blog-heading">
                <h2>{obj.title}</h2>
                <span class="badge text-bg-secondary">{obj.publishedDate}</span>
              </div>
              <RichText data={obj.content} />
              <div className="top-link">
                <a href="#top-of-page">Back to top <i className="fas fa-caret-up"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article >)
}

export const query = graphql`
  fragment ContentfulComponentBlogEntries on ContentfulComponentBlogEntries {
    __typename
  }
`