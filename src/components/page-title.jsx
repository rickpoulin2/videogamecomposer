import React from 'react'

import './page-title.scss'

const PageTitle = ({ title }) => (
    <div className="container page-title">
        <div className="row">
            <div className="col">
                <h1>{title}</h1>
            </div>
        </div>
    </div>
)

export default PageTitle