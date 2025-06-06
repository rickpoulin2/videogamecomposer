import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import AppContext from '../components/app-context'
import Seo from '../components/seo'
import PageTitle from '../components/page-title'
import PageComponent from '../components/page-component'
import Section from '../components/section'

class PageTemplate extends React.Component {
  render() {
    const pageData = this.props.data.contentfulPage
    const titleBlock = get(pageData, 'hideTitle') ? '' : <PageTitle title={get(pageData, 'title')} />

    const introBlock = get(pageData, 'introContent')?.map((x) => (<PageComponent key={x.id} obj={x} />));
    let mainBlock = get(pageData, 'mainContent')?.map((x) => (<PageComponent key={x.id} obj={x} />));
    if (pageData.mainContent?.length > 0) {
      mainBlock =
        <Section>
          {mainBlock}
        </Section>
    }
    //console.log(pageData.id);
    //console.log(pageData.mainContent);

    return (
      <AppContext.Provider value={this.props.pageContext}>
        {titleBlock}
        {introBlock}
        {mainBlock}
      </AppContext.Provider>
    )
  }
}

export default PageTemplate

export const Head = ({ data }) => <Seo title={get(data, 'contentfulPage.title')} />

export const pageQuery = graphql`
  query PageBySlug(
    $slug: String!
  ) {
    contentfulPage(url: { eq: $slug }) {
      id
      title
      hideTitle
      introContent {
        ...PageComponent
        ... on ContentfulComponentGroup {
          id
          styles
          structureType
          components:content {
            ...PageComponent
            ... on ContentfulComponentGroup {
              id
              styles
              structureType
              components:content {
                ...PageComponent
              }
            }
          }
        }
      }
      mainContent {
        ...PageComponent
        ... on ContentfulComponentGroup {
            id
            styles
            structureType
            components:content {
            ...PageComponent
            ... on ContentfulComponentGroup {
              id
              styles
              structureType
              components:content {
                ...PageComponent
              }
            }
          }
        }
      }
    }
  }
`
