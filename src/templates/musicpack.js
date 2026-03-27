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

class MusicPackTemplate extends React.Component {
  render() {
    const pageData = this.props.data.contentfulMusicPack

    return (
      <AppContext.Provider value={this.props.pageContext}>
        <PageTitle title="Music Packs" asText={true} />
        <div className="page-reorder">
          <Section as="article" styles="packs wnav">
            <Col>
              <MusicPackCard obj={pageData} />
            </Col>
          </Section>
          <Section as="aside" styles="nobg side-nav left">
            <div className="box-flair">
              <div>
                <MusicPackList activeItem={pageData.id} />
              </div>
            </div>
          </Section>
        </div>
      </AppContext.Provider>
    )
  }
}

export default MusicPackTemplate

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
