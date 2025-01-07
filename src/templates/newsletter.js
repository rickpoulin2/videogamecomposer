import React from 'react'
import { Link, graphql } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { MARKS } from '@contentful/rich-text-types'
import readingTime from 'reading-time'
import get from 'lodash/get'

import './newsletter.scss'

import Seo from '../components/seo'
import Layout from '../components/layout'
import PageTitle from '../components/page-title'

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
    let body = renderRichText(pageData.bodyContent, rtOptions);

    return (
      <Layout location={this.props.location}>
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
                  {body}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
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
    }
    next: contentfulNewsletter(url: { eq: $nextPostSlug }) {
      heading
    }
  }
`
