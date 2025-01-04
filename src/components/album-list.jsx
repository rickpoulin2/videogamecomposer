import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import AlbumCard from './album-card';

const AlbumList = () => {
  const albumData = useStaticQuery(
    graphql`
      query AllAlbums {
        data: allContentfulAlbum(sort: {publishedDate: DESC}) {
          nodes {
            id
            ...ContentfulAlbum
          }
        }
      }`);
  const albums = albumData.data?.nodes?.map((i) =>
    <AlbumCard key={i.id} obj={i} />
  );
  return (
    <div className="album-list col">
      {albums}
    </div>
  )
}

export default AlbumList

export const query = graphql`
  fragment ContentfulComponentAlbumList on ContentfulComponentAlbumList {
    __typename
  }
`