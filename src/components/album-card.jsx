import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { MARKS } from '@contentful/rich-text-types'

import './album-card.scss'

const CHANNELS = [
  { title: "YouTube", icon: "youtube", fieldname: "YouTube" },
  { title: "Spotify", icon: "spotify", fieldname: "Spotify" },
  { title: "Bandcamp", icon: "bandcamp", fieldname: "Bandcamp" },
  { title: "itch.io", icon: "itch-io", fieldname: "Itchio" },
  { title: "iTunes", icon: "apple", fieldname: "Itunes" },
]

const AlbumCard = ({ obj }) => {
  if (obj == null)
    return

  const rtOptions = {
    renderMark: {
      [MARKS.ITALIC]: (text) => {
        return <em>{text}</em>
      },
      [MARKS.BOLD]: (text) => {
        return <strong>{text}</strong>
      }
    },
  }
  let body = renderRichText(obj.albumDescription, rtOptions);

  let collab = "";
  if (obj.collaboratorName) {
    if (obj.collaboratorLink) {
      collab = <span>with <a href={obj.collaboratorLink} target="_blank" rel="noreferrer">{obj.collaboratorName}</a></span>
    } else {
      collab = <span>with {obj.collaboratorName}</span>
    }
  }

  const channelLinks = CHANNELS.map(({ title, icon, fieldname }) => {
    let href = obj["link" + fieldname];
    if ((href == null || href === "") && fieldname === "YouTube") {
      href = "https://youtube.com/watch?v=" + obj.videoId;
    }
    return (href == null || href === "") ?
      (<li><span>Not available on {title}</span><i className={"fab fa-" + icon}></i></li>)
      :
      (<li><a href={href} title={title} target="_blank" rel="noreferrer"><i className={"fab fa-" + icon}></i></a></li>)
  })

  return (
    <div className="card album-card">
      <div className="card-header">
        <h2 className="card-title">{obj.title}</h2>
        <GatsbyImage image={obj.coverImage.gatsbyImageData} />
        <div className="card-subtitle">
          <span className="badge text-bg-secondary">{obj.publishedDate}</span>
          <span>{obj.trackCount} tracks</span>
          {collab}
        </div>
        <div className="album-channels">
          <span>Listen on:</span>
          <ul>
            {channelLinks}
          </ul>
        </div>
      </div>
      <div className="card-aside">
        <iframe src={"https://www.youtube.com/embed/" + obj.videoId} title="Album video on YouTube" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
      <div className="card-body">{body}</div>
    </div>
  )
}

export default AlbumCard

export const query = graphql`
  fragment ContentfulAlbum on ContentfulAlbum {
    title
    publishedDate(formatString: "MMM YYYY")
    trackCount
    collaboratorName
    collaboratorLink
    coverImage {
      gatsbyImageData(layout:FIXED,width:150)
    }
    videoId
    linkYouTube
    linkSpotify
    linkBandcamp
    linkItchio
    linkItunes
    albumDescription {
      raw
    }
  }
`