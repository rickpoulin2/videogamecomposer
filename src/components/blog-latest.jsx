import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import MyLink from './mylink'

import './blog-latest.scss';

const BlogLatest = ({ obj }) => {
  const blogData = useStaticQuery(
    graphql`
      query LatestBlogEntries {
        data: allContentfulBlogEntry(limit: 3, sort: {publishedDate: DESC}) {
          nodes {
            id
            title
            publishedDate(formatString: "YYYY MMM DD")
            tag: publishedDate(formatString: "YYYYMMDD")
          }
        }
      }`);

  const blogTitle = obj.heading
  let entries = blogData.data?.nodes?.map((i) =>
    <BlogLink key={i.id} obj={i} base={obj.blogPage.url} />
  );
  let buttons = obj.buttons?.map((btn, i, arr) => {
    const cl = 'btn ' + (i === arr.length - 1 ? 'btn-primary' : 'btn-outline-primary');
    return <MyLink key={btn.id} obj={btn} addClasses={cl} />
  });
  if (!(blogData.data?.nodes?.length > 0)) {
    entries = <li>Nothing here yet! Check back soon.</li>
    buttons = ""
  }
  return (
    <div className={"blog-latest " + obj.styles}>
      <h2 className="pix"><span>{blogTitle}</span></h2>
      <ul className="date-list">
        {entries}
      </ul>
      <div className="cta">
        {buttons}
      </div>
    </div>
  )
}

export default BlogLatest

const BlogLink = ({ obj, base }) => {
  const htmlid = `entry${obj.tag}`;
  return (
    <li>
      <Link to={`/${base}/#${htmlid}`}>
        <span className="badge text-bg-secondary">{obj.publishedDate}</span>
        <span>{obj.title}</span>
      </Link>
    </li>)
}

export const query = graphql`
  fragment ContentfulComponentBlogLatest on ContentfulComponentBlogLatest {
    __typename
    heading
    styles
    blogPage {
      url
    }
    buttons {
      ...MyLink
    }
  }
`