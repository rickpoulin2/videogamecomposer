import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Col, Row } from 'react-bootstrap'
//import readingTime from 'reading-time'
import get from 'lodash/get'

import './newsletter.scss'

import Seo from '../components/seo'
import PageTitle from '../components/page-title'
import NewsletterCard from '../components/newsletter-card'
import RichText from '../components/richtext'
import Section from '../components/section'

class NewsletterTemplate extends React.Component {
  render() {
    const pageData = this.props.data.contentfulNewsletter
    const cardClasses = "col-3 col-md-2 col-lg-3"
    const prev = !this.props.data.previous ? "" : <><h3>Later issue</h3><NewsletterCard obj={this.props.data.previous} imageSizing={cardClasses} /></>
    const next = !this.props.data.next ? "" : <><h3>Earlier issue</h3><NewsletterCard obj={this.props.data.next} imageSizing={cardClasses} /></>

    return (
      <>
        <PageTitle title="Newsletters" asText={true} />
        <Section as="article" styles="newsletter">
          <Col className="newsletter-banner" xs="12">
            <GatsbyImage image={pageData.bannerImage.gatsbyImageData} alt={pageData.bannerImage.description} />
          </Col>
          <Col className="newsletter-body" xs="12">
            <h1>{pageData.heading} / {pageData.publishedDate}</h1>
            <RichText data={pageData.bodyContent} />
          </Col>
          <Col className="newsletter-links" xs="12">
            <h2 className="visually-hidden">Navigation</h2>
            <Row>
              <Col xs="12" lg="6">
                {prev}
              </Col>
              <Col xs="12" lg="6">
                {next}
              </Col>
            </Row>
          </Col>
        </Section>
      </>
    )
  }
}

export default NewsletterTemplate

export const Head = ({ data }) => <Seo title={get(data, 'contentfulPage.title')} />

export const pageQuery = graphql`
  query BlogPostBySlug(
    $slug: String!
    $previousPostSlug: String
    $nextPostSlug: String
  ) {
    contentfulNewsletter(url: { eq: $slug }) {
      id
      heading
      url
      publishedDate(formatString: "MMMM YYYY")
      bannerImage {
        description
        gatsbyImageData(placeholder:BLURRED)
      }
      bodyContent {
        raw
      }
    }
    previous: contentfulNewsletter(url: { eq: $previousPostSlug }) {
      heading
      url
      publishedDate(formatString: "MMMM YYYY")
      tagLine
      bannerImage {
          gatsbyImageData(layout:CONSTRAINED, height:400, aspectRatio:1, quality:95, placeholder:BLURRED, resizingBehavior:FILL, cropFocus:LEFT)
      }
    }
    next: contentfulNewsletter(url: { eq: $nextPostSlug }) {
      heading
      url
      publishedDate(formatString: "MMMM YYYY")
      tagLine
      bannerImage {
          gatsbyImageData(layout:CONSTRAINED, height:400, aspectRatio:1, quality:95, placeholder:BLURRED, resizingBehavior:FILL, cropFocus:LEFT)
      }
    }
  }
`
