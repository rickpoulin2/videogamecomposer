import React, { useRef } from 'react'
import { graphql } from 'gatsby'
import RichText from './richtext'
import NewsletterForm from './newsletter-form'

import './newsletter-signup.scss'

const NewsletterSignup = ({ obj }) => {
  const clz = "newsletter-signup " + (obj.styles ? obj.styles : "col-12 col-lg-6 col-xl-4 offset-xl-2")
  let signupFormRef = useRef(null)

  return (
    <div className={clz}>
      <div className="card">
        <div className="card-header text-bg-primary">
          <h2>{obj.heading}</h2>
        </div>
        <div className="card-body">
          <div className="intro">
            <RichText data={obj.introContent} />
          </div>
          <NewsletterForm formRef={el => signupFormRef = el} obj={obj} />
        </div>
      </div>
    </div>
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
    successHeading
    successBody {
      ...RichText
    }
    errorHeading
    errorBody {
      ...RichText
    }
  }
`