import React from 'react'

import './page-title.scss'

const PageTitle = ({ title, asText }) => {
    const heading = asText ? <p className="h1">{title}</p> : <h1>{title}</h1>
    return (
        <div className="container page-title">
            <div className="row">
                <div className="col">
                    {heading}
                </div>
            </div>
        </div>)
}

export default PageTitle