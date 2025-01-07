import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { MARKS } from '@contentful/rich-text-types'
import MyLink from './mylink'

import './newsletter-latest.scss';

const NewsletterLatest = ({ obj }) => {
  const blogData = useStaticQuery(
    graphql`
      query LatestNewsletterEntries {
        data: allContentfulNewsletter(limit: 1, sort: {publishedDate: DESC}) {
          nodes {
            id
            heading
            url
            publishedDate(formatString: "MMMM YYYY")
            tagLine
            bannerImage {
                gatsbyImageData(layout:CONSTRAINED, height:400, aspectRatio:1, quality:95, placeholder:BLURRED, resizingBehavior:FILL, cropFocus:LEFT)
            }
          }
        }
      }`);

  let entries = blogData.data?.nodes?.map((i) =>
    <NewsletterLink key={i.id} obj={i} />
  );
  if (!(blogData.data?.nodes?.length > 0)) {
    entries = <li>Nothing here yet! Check back soon.</li>
    buttons = ""
  }
  const rtOptions = {
    renderMark: {
      [MARKS.ITALIC]: (text) => {
        return <em>{text}</em>
      },
      [MARKS.BOLD]: (text) => {
        return <strong>{text}</strong>
      }
    }
  }
  let blurb = renderRichText(obj.trailingBlurb, rtOptions);
  let buttons = obj.buttons?.map((btn, i, arr) => {
    const cl = 'btn ' + (i === arr.length - 1 ? 'btn-primary' : 'btn-outline-primary');
    return <MyLink obj={btn} addClasses={cl} />
  });
  return (
    <div className="newsletter-latest">
      <h2 className="pix"><span>{obj.heading}</span></h2>
      {entries}
      {blurb}
      {buttons}
      <div className="cta">
        <p>FIX THESE LINKS</p>
        <a href="#" class="btn btn-outline-primary">View archives</a>
        <a href="#" class="btn btn-primary">Sign up!</a>
      </div>
    </div>
  )
}

export default NewsletterLatest

const NewsletterLink = ({ obj }) => {
  const tagLine = obj.tagLine ? <p className="card-text">{obj.tagLine}</p> : ""
  return (
    <Link to={"/newsletter/" + obj.url} className="card">
      <div className="row">
        <div className="col-4 col-sm-3 col-md-2 col-lg-3 col-xl-6 col-xxl-3">
          <GatsbyImage image={obj.bannerImage.gatsbyImageData} />
        </div>
        <div className="col">
          <div className="card-body">
            <p className="card-title"><strong>{obj.heading} / {obj.publishedDate}</strong></p>
            {tagLine}
          </div>
        </div>
      </div>
    </Link>)
}

export const query = graphql`
  fragment ContentfulComponentNewsletterLatest on ContentfulComponentNewsletterLatest {
    __typename
    heading
    styles
    trailingBlurb {
        raw
    }
    buttons {
      ...MyLink
    }
  }
`