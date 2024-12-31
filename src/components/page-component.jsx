import React from 'react'
import { graphql } from 'gatsby'
import Hero from '../components/hero'

const PageComponent = ({ obj }) => {
    const type = obj.__typename;

    if (type === 'ContentfulComponentHero')
        return <Hero obj={obj} />

    return <></>
}

export default PageComponent

export const query = graphql`
    fragment PageComponent on Node {
        __typename
        id
        ...ContentfulComponentHero
    }
`