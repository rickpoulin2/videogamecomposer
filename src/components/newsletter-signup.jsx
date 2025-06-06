import React, { useRef } from 'react'
import { graphql } from 'gatsby'
import { Button, Card } from 'react-bootstrap'
import RichText from './richtext'
import NewsletterForm from './newsletter-form'

import './newsletter-signup.scss'

const NewsletterSignup = ({ obj }) => {
  const clz = "newsletter-signup " + (obj.styles ? obj.styles : "col-12 col-lg-6 col-xxl-4")
  const submitRef = useRef();

  return (
    <div className={clz}>
      <Card>
        <Card.Header className="text-bg-primary">
          <h2>{obj.heading}</h2>
        </Card.Header>
        <Card.Body>
          <div className="intro">
            <RichText data={obj.introContent} />
          </div>
          <NewsletterForm submitRef={submitRef} obj={obj} />
          <Button variant="primary" ref={submitRef}>{obj.submitButtonLabel}</Button>
        </Card.Body>
      </Card>
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