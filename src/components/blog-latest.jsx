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
    <BlogLink key={i.id} obj={i} />
  );
  let cta = obj.linkToAll ? <MyLink obj={obj.linkToAll} addClasses="btn btn-primary" /> : "";
  if (!(blogData.data?.nodes?.length > 0)) {
    entries = <li>Nothing here yet! Check back soon.</li>
    cta = ""
  }
  return (
    <>
      <h2 class="pix"><span>{blogTitle}</span></h2>
      <ul class="date-list">
        {entries}
      </ul>
      <div class="text-center">
        {cta}
      </div>
    </>
  )
}

export default BlogLatest

const BlogLink = ({ obj }) => {
  const htmlid = `entry${obj.tag}`;
  return (
    <li>
      <Link to={"/reflections/#" + htmlid}>
        <span class="badge text-bg-secondary">{obj.publishedDate}</span>
        <span>{obj.title}</span>
      </Link>
    </li>)
}

export const query = graphql`
  fragment ContentfulComponentBlogLatest on ContentfulComponentBlogLatest {
    __typename
    heading
    styles
    linkToAll {
      ...MyLink
    }
  }
`