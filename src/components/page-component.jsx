import React from 'react'
import { graphql } from 'gatsby'
import Hero from '../components/hero'
import Text from '../components/text'
import Video from '../components/video'
import ButtonBanner from '../components/button-banner'

const PageComponent = ({ obj }) => {
    const type = obj.__typename;

    if (type === 'ContentfulComponentHero')
        return <Hero obj={obj} />
    if (type === 'ContentfulComponentText')
        return <Text obj={obj} />
    if (type === 'ContentfulComponentVideo')
        return <Video obj={obj} />
    if (type === 'ContentfulComponentButtonBanner')
        return <ButtonBanner obj={obj} />

    console.log("unknown component: " + type);
    return <></>
}

export default PageComponent

export const query = graphql`
    fragment PageComponent on Node {
        __typename
        id
        ...ContentfulComponentHero
        ...ContentfulComponentText
        ...ContentfulComponentVideo
        ...ContentfulComponentButtonBanner
    }
`