import React from 'react'
import { graphql } from 'gatsby'
import AlbumList from './album-list'
import MusicPackList from './musicpack-list'

const ContentList = ({ obj }) => {
  if (obj.type === "Albums") {
    return <AlbumList obj={obj} />
  }
  if (obj.type === "Asset Packs") {
    return <MusicPackList obj={obj} />
  }
  return <></>
}

export default ContentList

export const query = graphql`
  fragment ContentfulComponentContentList on ContentfulComponentContentList {
    __typename
    styles
    type
  }
`