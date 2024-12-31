import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Seo from '../components/seo'
import Layout from '../components/layout'
import PageTitle from '../components/page-title'
import PageComponent from '../components/page-component'

class PageTemplate extends React.Component {
  render() {
    const pageData = this.props.data.contentfulPage
    const titleBlock = get(pageData, 'hideTitle') ? '' : <PageTitle title={get(pageData, 'title')} />

    const introBlock = get(pageData, 'introContent')?.map((x) => (<PageComponent key={x.id} obj={x} />));

    return (
      <Layout location={this.props.location}>
        {titleBlock}
        {introBlock}
      </Layout>
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
      title
      hideTitle
      introContent {
        ...PageComponent
      }
      mainContent {
        ...PageComponent
      }
    }
  }
`
