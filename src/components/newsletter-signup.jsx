import React from 'react'
import { graphql } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { MARKS } from '@contentful/rich-text-types'

import './newsletter-signup.scss'

const NewsletterSignup = ({ obj }) => {
  const clz = "newsletter-signup " + (obj.styles ? obj.styles : "col-12 col-lg-6 col-xl-4 offset-xl-2")
  const rtOptions = {
    renderMark: {
      [MARKS.ITALIC]: (text) => {
        return <em>{text}</em>
      },
      [MARKS.BOLD]: (text) => {
        return <strong>{text}</strong>
      }
    }
  }
  let introContent = obj.introContent ? renderRichText(obj.introContent, rtOptions) : ""
  return (
    <>
      <div className={clz}>
        <div className="card">
          <div className="card-header text-bg-primary">
            <h2>{obj.heading}</h2>
          </div>
          <div className="card-body">
            <div className="intro">
              {introContent}
            </div>
            <form>
              <div className="field">
                <label for="email" className="form-label">Email address*</label>
                <input id="email" className="form-control" type="email" aria-describedby="emailHelp" required />
                <div id="emailHelp" className="form-text">I'll never share your email with anyone else.</div>
              </div>
              <div className="field">
                <label for="name" className="form-label">Your name</label>
                <input id="name" className="form-control" type="text" />
              </div>
              <div className="field">
                <label for="country" className="form-label">Country of residence</label>
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
      raw
    }
    submitButtonLabel
  }
`