import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { MARKS } from '@contentful/rich-text-types'
import readingTime from 'reading-time'
import get from 'lodash/get'

import './newsletter.scss'

import Seo from '../components/seo'
import Layout from '../components/layout'
import PageTitle from '../components/page-title'
import NewsletterCard from '../components/newsletter-card'
import RichText from '../components/richtext'

class NewsletterTemplate extends React.Component {
  render() {
    const pageData = this.props.data.contentfulNewsletter

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

    const cardClasses = "col-3 col-md-2 col-lg-3"
    const prev = !this.props.data.previous ? "" : <><h3>Later issue</h3><NewsletterCard obj={this.props.data.previous} imageSizing={cardClasses} /></>
    const next = !this.props.data.next ? "" : <><h3>Earlier issue</h3><NewsletterCard obj={this.props.data.next} imageSizing={cardClasses} /></>

    return (
      <>
        <PageTitle title="Newsletters" asText={true} />
        <section className="newsletter">
          <div className="container">
            <div>
              <div className="row">
                <div className="col-12 newsletter-banner">
                  <GatsbyImage image={pageData.bannerImage.gatsbyImageData} />
                </div>
                <div className="col-12 newsletter-body">
                  <h1>{pageData.heading} / {pageData.publishedDate}</h1>
                  <RichText data={pageData.bodyContent} />
                </div>
                <div className="col-12 newsletter-links">
                  <h2 className="visually-hidden">Navigation</h2>
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      {prev}
                    </div>
                    <div className="col-12 col-lg-6">
                      {next}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
