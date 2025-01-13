import React from 'react'
import { graphql } from 'gatsby'
import RichText from './richtext'

import './newsletter-signup.scss'

const NewsletterSignup = ({ obj }) => {
  const clz = "newsletter-signup " + (obj.styles ? obj.styles : "col-12 col-lg-6 col-xl-4 offset-xl-2")
  return (
    <>
      <div className={clz}>
        <div className="card">
          <div className="card-header text-bg-primary">
            <h2>{obj.heading}</h2>
          </div>
          <div className="card-body">
            <div className="intro">
              <RichText data={obj.introContent} />
            </div>
            <form>
              <div className="field">
                <label htmlFor="email" className="form-label">Email address*</label>
                <input id="email" className="form-control" type="email" aria-describedby="emailHelp" required />
                <div id="emailHelp" className="form-text">I'll never share your email with anyone else.</div>
              </div>
              <div className="field">
                <label htmlFor="name" className="form-label">Your name</label>
                <input id="name" className="form-control" type="text" />
              </div>
              <div className="field">
                <label htmlFor="country" className="form-label">Country of residence</label>
                <input id="country" className="form-control" type="text" />
              </div>
              <button type="submit" className="btn btn-primary">{obj.submitButtonLabel}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewsletterSignup

export const query = graphql`
  fragment ContentfulComponentNewsletterSignup on ContentfulComponentNewsletterSignup {
    __typename
    heading
    styles
    introContent {
      ...RichText
    }
    submitButtonLabel
  }
`