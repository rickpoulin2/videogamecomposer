import React from 'react'
import { graphql } from 'gatsby'
import { getSrc } from 'gatsby-plugin-image'
import { Card } from 'react-bootstrap'
import VideoWidget from './video-widget'

import './videocard.scss'

const VideoCard = ({ obj }) => {
  if (obj == null)
    return
  if (obj.title == null || obj.cardType == null || obj.videoId == null)
    return

  const styles = "videocard " + (obj.styles ? obj.styles : "")
  const cardStyles = obj.backgroundImage?.gatsbyImageData ? { backgroundImage: `url(${getSrc(obj.backgroundImage.gatsbyImageData)})` } : {}
  const cardClass = obj.cardType === "no-border" ? "no-border" : "text-bg-" + obj.cardType

  if (obj.cardType === "none") {
    return (
      <div className={styles}>
        <div style={cardStyles}>
          <VideoWidget videoId={obj.videoId} placeholderImage={obj.coverImage} title={obj.title} />
        </div>
      </div>
    )
  }

  return (
    <div className={styles}>
      <Card className={cardClass} style={cardStyles}>
        <Card.Body>
          <div>
            <VideoWidget videoId={obj.videoId} placeholderImage={obj.coverImage} title={obj.title} />
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default VideoCard

export const query = graphql`
  fragment ContentfulComponentVideo on ContentfulComponentVideo {
    title
    styles
    cardType
    videoId
    backgroundImage {
      gatsbyImageData
    }
    coverImage {
      gatsbyImageData
    }
  }
`