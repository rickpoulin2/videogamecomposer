import React from 'react'
import { graphql } from 'gatsby'
import Hero from '../components/hero'
import Text from '../components/text'
import Video from '../components/video'
import ButtonBanner from '../components/button-banner'
import ContentCard from '../components/content-card'
import AlbumList from './album-list'
import BlogEntries from './blog-entry'
import BlogLatest from './blog-latest'
import ComponentGroup from './component-group'

const PageComponent = ({ obj }) => {
    const type = obj.__typename;

    if (type === 'ContentfulComponentGroup')
        return <ComponentGroup obj={obj} />
    if (type === 'ContentfulComponentHero')
        return <Hero obj={obj} />
    if (type === 'ContentfulComponentText')
        return <Text obj={obj} />
    if (type === 'ContentfulComponentVideo')
        return <Video obj={obj} />
    if (type === 'ContentfulComponentButtonBanner')
        return <ButtonBanner obj={obj} />
    if (type === 'ContentfulComponentContentCard')
        return <ContentCard obj={obj} />
    if (type === 'ContentfulComponentAlbumList')
        return <AlbumList obj={obj} />
    if (type === 'ContentfulComponentBlogEntries')
        return <BlogEntries obj={obj} />
    if (type === 'ContentfulComponentBlogLatest')
        return <BlogLatest obj={obj} />

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
        ...ContentfulComponentContentCard
        ...ContentfulComponentAlbumList
        ...ContentfulComponentBlogEntries
        ...ContentfulComponentBlogLatest
    }
`