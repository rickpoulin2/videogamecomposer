import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import AlbumCard from './album-card';

const AlbumList = ({ obj }) => {
  const albumData = useStaticQuery(
    graphql`
      query AllAlbums {
        data: allContentfulAlbum(
          sort: { publishedDate: DESC },
          filter: {
            title: {ne:null},
            slug: {ne:null},
            trackCount: {ne:null},
            publishedDate: {ne:null},
            coverImage: { contentful_id: {ne:null} },
            videoId: {ne:null},
            albumDescription: { raw: {ne:null} }
        }) {
          nodes {
            id
            ...ContentfulAlbum
          }
        }
      }`);
  const albums = albumData.data?.nodes?.map((i) =>
    <AlbumCard key={i.id} obj={i} />
  );
  const clz = "album-list col " + (obj.styles ? obj.styles : "")
  return (
    <div className={clz}>
      {albums}
    </div>
  )
}

export default AlbumList

export const query = graphql`
  fragment ContentfulComponentAlbumList on ContentfulComponentAlbumList {
    __typename
    styles
  }
`