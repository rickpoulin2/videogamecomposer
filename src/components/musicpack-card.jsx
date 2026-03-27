import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-gtag'
import { Card } from 'react-bootstrap'
import RichText from './richtext'
import VideoWidget from './video-widget'

import './musicpack-card.scss'

const CHANNELS = [
  { title: "Unity Asset Store", clz: "store-unity", fieldname: "Unity" },
  { title: "Fab (Unreal Engine Marketplace)", clz: "store-fab", fieldname: "Unreal" },
  { title: "itch.io", clz: "store-itch", fieldname: "Itchio" },
  { title: "GameDev Market", clz: "store-gdm", fieldname: "Gdm" }
]

const MusicPackCard = ({ obj }) => {
  if (obj == null)
    return
  if (obj.title == null || obj.url == null || obj.videoId == null || obj.description == null)
    return

  const channelLinks = CHANNELS.map(({ title, clz, fieldname }) => {
    let href = obj["link" + fieldname]
    return (href == null || href === "") ?
      (<li key={fieldname}><a className="inactive"><i className={clz}>Not available on {title}</i></a></li>)
      :
      (<li key={fieldname}><OutboundLink className="btn" href={href} title={title} aria-label={title} target="_blank" rel="noreferrer"><i className={clz}>{title}</i></OutboundLink></li>)
  })

  return (
    <Card className="musicpack-card" id={obj.slug}>
      <Card.Header>
        <Card.Title as="h2">{obj.title}</Card.Title>
        <Card.Subtitle>
          <span className="badge text-bg-secondary">{obj.publishedDate}</span>
        </Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <VideoWidget videoId={obj.videoId} placeholderImage={obj.coverImage} obj={{ title: obj.title, cardType: "no-border", videoId: obj.videoId }} />
        <RichText data={obj.description} />
      </Card.Body>
      <Card.Footer>
        <div className="pack-channels">
          <span>Available on your favourite marketplace</span>
          <ul>
            {channelLinks}
          </ul>
        </div>
      </Card.Footer>
    </Card>
  )
}

export default MusicPackCard

export const query = graphql`
  fragment ContentfulMusicPack on ContentfulMusicPack {
    title
    url
    publishedDate(formatString: "MMM YYYY")
    tag: publishedDate(formatString: "YYYYMMDD")
    coverImage {
      description
      gatsbyImageData(width: 640)
    }
    videoId
    linkUnity
    linkUnreal
    linkItchio
    linkGdm
    description {
      ...RichText
    }
  }
`