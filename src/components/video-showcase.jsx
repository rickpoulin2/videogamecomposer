import React from 'react'
import { graphql } from 'gatsby'
import { getSrc } from 'gatsby-plugin-image'
import { Card } from 'react-bootstrap'

import './video-showcase.scss'
import VideoWidget from './video-widget'

const VideoShowcase = ({ obj }) => {
  if (obj == null)
    return
  if (obj.heading == null || obj.videos == null || obj.videos.length === 0)
    return

  let typeClz = obj.videos.length === 1 ? "video-single" : "video-grid"

  const cardStyles = obj.backgroundImage?.gatsbyImageData ? { backgroundImage: `url(${getSrc(obj.backgroundImage.gatsbyImageData)})` } : {}
  const cardClass = obj.cardType === "no-border" ? "no-border" : "text-bg-" + obj.cardType
  const styles = `video-showcase ${typeClz} ` + (obj.styles ? obj.styles : "")
  const heading = obj.heading !== null && obj.heading !== "" && obj.headingStyle !== "invisible" ? <h2 className={obj.headingStyle}><span>{obj.heading}</span></h2> : ""

  let i = 0
  const videos = obj.videos.map(e => {
    i++
    let vidclz = i < 3 ? "span-3" : "span-2"
    return <div data-vidid={i} className={vidclz}>
      <VideoWidget videoId={e.videoId} playlistId={e.youTubePlaylistId} timestamp={e.timestamp} title={e.title} placeholderImage={e.coverImage} locale={e.node_locale} />
    </div>
  })

  if (obj.cardType === "none") {
    return (
      <div className={styles}>
        <div style={cardStyles}>
          {heading}
          <div className="video-layout">
            {videos}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles}>
      <Card className={cardClass} style={cardStyles}>
        <Card.Body>
          {heading}
          <div className="video-layout">
            {videos}
          </div>
        </Card.Body>
      </Card>
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