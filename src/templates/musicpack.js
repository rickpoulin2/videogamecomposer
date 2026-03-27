import React from 'react'
import { graphql } from 'gatsby'
import { Col } from 'react-bootstrap'
//import readingTime from 'reading-time'
import get from 'lodash/get'

import './musicpack.scss'

import AppContext from '../components/app-context'
import Seo from '../components/seo'
import PageTitle from '../components/page-title'
import Section from '../components/section'
import MusicPackCard from '../components/musicpack-card'
import MusicPackList from '../components/musicpack-list'

class NewsletterTemplate extends React.Component {
  render() {
    const pageData = this.props.data.contentfulMusicPack

    return (
      <AppContext.Provider value={this.props.pageContext}>
        <PageTitle title="Music Packs" asText={true} />
        <Section styles="nobg side-nav">
          <div className="box-flair">
            <div>
              <MusicPackList />
            </div>
          </div>
        </Section>
        <Section as="article" styles="packs wnav">
          <Col>
            <MusicPackCard obj={pageData} />
          </Col>
        </Section>
      </AppContext.Provider>
    )
  }
}

export default NewsletterTemplate

export const Head = ({ data }) => <Seo title={get(data, 'contentfulPage.title')} />

export const pageQuery = graphql`
  query MusicPackBySlug(
    $slug: String!
  ) {
    contentfulMusicPack(url: { eq: $slug }) {
      id
      ...ContentfulMusicPack
    }
  }
`
