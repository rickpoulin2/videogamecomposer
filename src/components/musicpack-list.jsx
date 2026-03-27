import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Accordion } from 'react-bootstrap'
import EntryLink from './entry-link'

import './side-nav.scss'
import './musicpack-list.scss'

const MusicPackList = ({ activeItem = "" }) => {
  const packsData = useStaticQuery(
    graphql`
      query AllMusicPacks {
        data: allContentfulMusicPack(
          sort: { publishedDate: DESC },
          filter: {
            title: {ne:null},
            url: {ne:null},
            publishedDate: {ne:null},
            videoId: {ne:null},
            description: { raw: {ne:null} }
        }) {
          nodes {
            id
            title
            url
          }
        }
      }`)

  const anchors = []
  let navEntries = packsData.data?.nodes?.map((i) => {
    anchors.push(`entry${i.tag}`)
    return <li>
      <EntryLink type="ContentfulMusicPack" slug={i.url} activeClass="active">
        <span>{i.title}</span>
      </EntryLink>
    </li>
  })

  let error = <></>
  if (!(packsData.data?.nodes?.length > 0)) {
    error =
      <p>Nothing here yet! Check back again soon.</p>
  }

  return (
    <>
      <h2>Available music packs</h2>
      {error}
      <ul>
        {navEntries}
      </ul>
    </>
  )
}

export default MusicPackList