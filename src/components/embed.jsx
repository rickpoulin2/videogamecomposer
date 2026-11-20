import React from 'react'
import { graphql } from 'gatsby'

import './embed.scss'

const Embed = ({ obj }) => {
  if (obj == null || obj.embedUrl == null)
    return

  const isReelcrafter = ("" + obj.embedUrl).match(/reelcrafter/)
  const heading = obj.heading ? <h2 className={obj.useFancyHeading ? "pix" : ""}><span>{obj.heading}</span></h2> : ""
  const styles = "cembed " + (obj.styles ? obj.styles : "") + (isReelcrafter ? " reelcrafter" : "")
  const height = obj.height ? obj.height : 400

  return (
    <div className={styles}>
      {heading}
      <div>
        <iframe
          height={height}
          frameborder="no"
          scrolling="no"
          src={obj.embedUrl}>
        </iframe>
      </div>
    </div>
  )
}

export default Embed

export const query = graphql`
  fragment ContentfulComponentEmbed on ContentfulComponentEmbed {
    heading
    useFancyHeading
    styles
    height
    embedUrl
  }
`