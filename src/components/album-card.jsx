import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { OutboundLink } from 'gatsby-plugin-google-gtag'
import { Card, Button, Collapse } from 'react-bootstrap'
import RichText from './richtext'

import './album-card.scss'

const CHANNELS = [
  { title: "YouTube", icon: "youtube", fieldname: "YouTube" },
  { title: "Spotify", icon: "spotify", fieldname: "Spotify" },
  { title: "Bandcamp", icon: "bandcamp", fieldname: "Bandcamp" },
  { title: "itch.io", icon: "itch-io", fieldname: "Itchio" },
  { title: "Apple Music", icon: "apple", fieldname: "Itunes" },
  { title: "Amazon Music", icon: "amazon", fieldname: "Amazon" },
]

const AlbumCard = ({ obj }) => {
  const [open, setOpen] = useState(false)
  if (obj == null)
    return
  if (obj.title == null || obj.slug == null || obj.trackCount == null || obj.videoId == null || obj.albumDescription == null)
    return

  let collab = "";
  if (obj.collaboratorName) {
    if (obj.collaboratorLink) {
      collab = <span>with <OutboundLink href={obj.collaboratorLink} target="_blank" rel="noreferrer">{obj.collaboratorName}</OutboundLink></span>
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
      (<li key={fieldname}><span>Not available on {title}</span><i className={"fab fa-" + icon}></i></li>)
      :
      (<li key={fieldname}><OutboundLink href={href} title={title} aria-label={title} target="_blank" rel="noreferrer"><i className={"fab fa-" + icon}></i></OutboundLink></li>)
  })

  return (
    <Card className="album-card" id={obj.slug}>
      <Card.Header>
        <Card.Title as="h2">{obj.title}</Card.Title>
        <GatsbyImage image={obj.coverImage.gatsbyImageData} alt={obj.coverImage.description} />
        <Card.Subtitle>
          <span className="badge text-bg-secondary">{obj.publishedDate}</span>
          <span>{obj.trackCount} tracks</span>
          {collab}
        </Card.Subtitle>
        <div className="album-channels">
          <span>Listen on:</span>
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
        <RichText data={obj.albumDescription} />
      </Card.Body>
    </Card>
  )
}

export default AlbumCard

export const query = graphql`
  fragment ContentfulAlbum on ContentfulAlbum {
    title
    slug
    publishedDate(formatString: "MMM YYYY")
    tag: publishedDate(formatString: "YYYYMMDD")
    trackCount
    collaboratorName
    collaboratorLink
    coverImage {
      description
      gatsbyImageData(width: 300)
    }
    videoId
    linkYouTube
    linkSpotify
    linkBandcamp
    linkItchio
    linkItunes
    linkAmazon
    albumDescription {
      ...RichText
    }
  }
`