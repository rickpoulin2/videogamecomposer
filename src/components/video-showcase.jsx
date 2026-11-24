import React from 'react'
import { graphql } from 'gatsby'

import './video-showcase.scss'
import VideoWidget from './video-widget'

const VideoShowcase = ({ obj }) => {
  if (obj == null)
    return
  if (obj.heading == null || obj.type == null || obj.videos == null || obj.videos.length === 0)
    return

  let typeClz = ""
  switch (obj.type) {
    case "Single":
      typeClz = "video-single"
      break
    case "Horizontal Grid":
      typeClz = "video-hgrid"
      break
    case "Vertical Grid":
      typeClz = "video-vgrid"
      break
    default:
  }

  let showTitles = typeClz === "video-vgrid"

  const heading = obj.showHeading ? <h2>{obj.heading}</h2> : ""
  const styles = `pageblock video-showcase ${typeClz} ` + (obj.styles ? obj.styles : "")
  const videos = obj.videos.map(e => {
    let title = showTitles ? <h3><span>{e.type}</span> {e.title}</h3> : ""
    return <div>
      {title}
      <VideoWidget videoId={e.videoId} playlistId={e.youTubePlaylistId} timestamp={e.timestamp} title={e.title} placeholderImage={e.coverImage} locale={e.node_locale} />
    </div>
  })

  return (
    <div className={styles}>
      {heading}
      <div>
        <div className="video-layout">
          {videos}
        </div>
      </div>
    </div>
  )
}

export default VideoShowcase

export const query = graphql`
  fragment ContentfulComponentVideoShowcase on ContentfulComponentVideoShowcase {
    node_locale
    heading
    headingStyle
    styles
    cardType
    backgroundImage {
        gatsbyImageData
    }
    videos {
      ...ContentfulVideo
    }
  }
`