import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { OutboundLink } from 'gatsby-plugin-google-gtag'
import { Card, Button, Collapse } from 'react-bootstrap'
import RichText from './richtext'

import './assetpack-card.scss'

const CHANNELS = [
  { title: "Unity", icon: "unity", fieldname: "Unity" },
  { title: "Unreal Engine", icon: "unreal-engine", fieldname: "Unreal" },
  { title: "itch.io", icon: "itch-io", fieldname: "Itchio" },
  { title: "GameDev Market", icon: "gdm", fieldname: "Gdm" }
]

const AssetPackCard = ({ obj }) => {
  const [open, setOpen] = useState(false)
  if (obj == null)
    return
  if (obj.title == null || obj.slug == null || obj.videoId == null || obj.description == null)
    return

  const channelLinks = CHANNELS.map(({ title, icon, fieldname }) => {
    let href = obj["link" + fieldname]
    if ((href == null || href === "") && fieldname === "YouTube") {
      href = "https://youtube.com/watch?v=" + obj.videoId
    }
    return (href == null || href === "") ?
      (<li key={fieldname}><span>Not available on {title}</span><i className={"fab fa-" + icon}></i></li>)
      :
      (<li key={fieldname}><OutboundLink href={href} title={title} aria-label={title} target="_blank" rel="noreferrer"><i className={"fab fa-" + icon}></i></OutboundLink></li>)
  })

  return (
    <Card className="musicpack-card" id={obj.slug}>
      <Card.Header>
        <Card.Title as="h2">{obj.title}</Card.Title>
        <GatsbyImage image={obj.coverImage.gatsbyImageData} alt={obj.coverImage.description} />
        <Card.Subtitle>
          <span className="badge text-bg-secondary">{obj.publishedDate}</span>
        </Card.Subtitle>
        <div className="album-channels">
          <span>Find on:</span>
          <ul>
            {channelLinks}
          </ul>
        </div>
      </Card.Header>
      <div className="card-aside">
        <Button variant="outline-secondary" onClick={() => { setOpen(!open) }}>Show YouTube clip inline <i class="fab fa-youtube"></i></Button>
        <Collapse in={open}>
          <div>
            <iframe src={"https://www.youtube.com/embed/" + obj.videoId} title="Album video on YouTube"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin" allowFullScreen enablejsapi="1"></iframe>
          </div>
        </Collapse>
      </div>
      <Card.Body>
        <RichText data={obj.description} />
      </Card.Body>
    </Card>
  )
}

export default AssetPackCard

export const query = graphql`
  fragment ContentfulAssetPack on ContentfulAssetPack {
    title
    slug
    publishedDate(formatString: "MMM YYYY")
    tag: publishedDate(formatString: "YYYYMMDD")
    coverImage {
      description
      gatsbyImageData(width: 300)
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