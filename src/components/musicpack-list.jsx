import React, { useContext, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { navigate } from 'gatsby'
import AppContext from './app-context'
import EntryLink from './entry-link'

import './side-nav.scss'
import './musicpack-list.scss'

const MusicPackList = ({ obj, asSidebar = false }) => {
  const linkSlugs = useContext(AppContext).linkSlugs
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

  let navEntries = packsData.data?.nodes?.map((i) => {
    return <li key={i.id}>
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
  useEffect(() => {
    if (!asSidebar) {
      let slug = packsData.data?.nodes[0]?.url
      console.log('meow', `/${linkSlugs.musicpacksPage}/${slug}`)
      navigate(`/${linkSlugs.musicpacksPage}/${slug}`)
    }
  })

  return (
    <div className="musicpack-list side-menu">
      <h2>Available music packs</h2>
      {error}
      <ul>
        {navEntries}
      </ul>
    </div>
  )
}

export default MusicPackList