import React, { useState } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import YouTube from 'react-youtube'

import './video-widget.scss'
import { Button } from 'react-bootstrap'

const VideoWidget = ({ videoId, title, placeholderImage, opts }) => {
    const [playing, setPlaying] = useState(false)
    const [vidref, setVidref] = useState(null)

    if (videoId == null)
        return
    let img = placeholderImage == null ?
        <img src={"https://img.youtube.com/vi/" + videoId + "/hqdefault.jpg"} /> :
        <GatsbyImage image={placeholderImage.gatsbyImageData} alt={placeholderImage.description} />

    const videoReady = function (event) {
        setVidref(event.target)
    }
    const play = function () {
        setPlaying(true)
        console.log(vidref)
        if (vidref != null) {
            vidref.playVideo()
        }
    }
    const stop = function () {
        setPlaying(false)
    }

    let styles = "video-widget"
    if (playing) {
        styles += " playing"
    }

    const vidOpts = {
        playerVars: {
            controls: 1,
            rel: 0,
            iv_load_policy: 3
        }
    }

    return (
        <div className={styles}>
            <button className="vidplaceholder" onClick={play}>
                {img}
                <Button as="div" variant="secondary">
                    <i className="fas fa-headphones"></i>
                </Button>
            </button>
            <YouTube videoId={videoId} title={title} onReady={videoReady} opts={vidOpts} onPause={stop} onEnd={stop} />
        </div>
    )
}

export default VideoWidget