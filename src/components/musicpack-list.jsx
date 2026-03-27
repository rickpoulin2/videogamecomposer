import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Accordion } from 'react-bootstrap'
import EntryLink from './entry-link'

import './side-nav.scss'
import './musicpack-list.scss'

const MusicPackList = ({ obj }) => {
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
      <EntryLink type="ContentfulMusicPack" slug={i.url}>
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
      {error}

      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header><h2>See also</h2></Accordion.Header>
          <Accordion.Body>
            <ul>
              {navEntries}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  )
}

export default MusicPackList