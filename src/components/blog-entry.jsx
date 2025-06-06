import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Accordion, Badge, Col } from 'react-bootstrap'
import Scrollspy from 'react-scrollspy'
import RichText from './richtext'
import BlogLink from './blog-link'
import Section from './section'

import './blog-entry.scss';

const BlogEntries = () => {
  const blogData = useStaticQuery(
    graphql`
      query AllBlogEntries {
        data: allContentfulBlogEntry(
          sort: {publishedDate: DESC},
          filter: {
            title: {ne:null},
            publishedDate: {ne:null},
            content: { raw: {ne:null} }
        }) {
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
  const showNav = blogData.data?.nodes?.length > 3

  let entries = blogData.data?.nodes?.map((i) =>
    <BlogEntry key={i.id} obj={i} showNav={showNav} />
  );
  let nav = <></>
  if (showNav) {
    const anchors = [];
    let navEntries = blogData.data?.nodes?.map((i) => {
      anchors.push(`entry${i.tag}`)
      return <BlogLink key={i.id} obj={i} />
    })
    nav =
      <Section styles="nobg blog-nav">
        <div className="box-flair">
          <div>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header><h2>Contents</h2></Accordion.Header>
                <Accordion.Body>
                  <Scrollspy items={anchors} className="blog-list" currentClassName="active">
                    {navEntries}
                  </Scrollspy>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </Section>
  }

  if (!(blogData.data?.nodes?.length > 0)) {
    entries =
      <Section>
        <Col>
          <p>Nothing here yet! Check back again soon.</p>
        </Col>
      </Section>
  }
  return (
    <>
      {nav}
      {entries}
    </>
  )
}

export default BlogEntries

const BlogEntry = ({ obj, showNav }) => {
  const htmlid = `entry${obj.tag}`;
  return (
    <Section as="article" id={htmlid} styles={showNav ? "blog blog-wnav" : "blog"}>
      <Col className="blog-entry">
        <div className="blog-heading">
          <h2>{obj.title}</h2>
          <Badge bg="secondary">{obj.publishedDate}</Badge>
        </div>
        <RichText data={obj.content} />
        <div className="top-link">
          <a href="#top-of-page">Back to top <i className="fas fa-caret-up"></i></a>
        </div>
      </Col>
    </Section>)
}

export const query = graphql`
  fragment ContentfulComponentBlogEntries on ContentfulComponentBlogEntries {
    __typename
  }
`