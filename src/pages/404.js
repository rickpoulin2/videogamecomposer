import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Seo from '../components/seo'
import PageTitle from '../components/page-title'
import PageComponent from '../components/page-component'

class PageTemplate extends React.Component {
  render() {
    const pageData = this.props.data.contentfulPage
    const titleBlock = get(pageData, 'hideTitle') ? '' : <PageTitle title={get(pageData, 'title')} />

    const introBlock = get(pageData, 'introContent')?.map((x) => (<PageComponent key={x.id} obj={x} />));
    let mainBlock = get(pageData, 'mainContent')?.map((x) => (<PageComponent key={x.id} obj={x} />));
    if (pageData.mainContent?.length > 0) {
      mainBlock =
        <section>
          <div className="container">
            <div>
              <div className="row">
                {mainBlock}
              </div>
            </div>
          </div>
        </section>
    }
    //console.log(pageData.id);
    //console.log(pageData.mainContent);

    return (
      <>
        {titleBlock}
        {introBlock}
        {mainBlock}
      </>
    )
  }
}

export default PageTemplate

export const Head = ({ data }) => <Seo title={get(data, 'contentfulPage.title')} />

export const pageQuery = graphql`
  query ErrorPageBySlug {
    contentfulPage(url: { eq: "404" }) {
      id
      title
      hideTitle
      introContent {
        ...PageComponent
        ... on ContentfulComponentGroup {
          styles
          components:content {
            ...PageComponent
            ... on ContentfulComponentGroup {
              styles
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
          styles
          components:content {
            ...PageComponent
            ... on ContentfulComponentGroup {
              styles
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
