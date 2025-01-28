import React, { useRef } from 'react'
import { graphql } from 'gatsby'
import RichText from './richtext'
import { Button } from 'react-bootstrap';
import NetlifyForm from './netlify-form';
import FormField from './form-field';

import './contact-form.scss'

const ContactForm = ({ obj }) => {
  const clz = "contact-form " + (obj.styles ? obj.styles : "col")
  const submitRef = useRef()
  const newsletterFragment = obj.showNewsletterSignup ? (
    <div className="field">
      <fieldset>
        <legend className="form-label">Sign up for mailing list?</legend>
        <div className="form-check">
          <label className="form-check-label">
            <input className="form-check-input" type="checkbox" value="Yes" id="newsletterSignup" name="newsletterSignup" />
            Yes!
          </label>
        </div>
      </fieldset>
    </div>)
    : "";
  const topicOptions = obj.availableTopics.map((e) => <option key={e} value={e}>{e}</option>);
  const modSubmitData = formData => {
    if (formData.get("newsletterSignup") !== "Yes") {
      formData.append("newsletterSignup", "No")
    }
  }

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
            <NetlifyForm
              name="contact"
              submitRef={submitRef}
              successHeading={obj.successHeading}
              errorHeading={obj.errorHeading}
              successContent={obj.successBody}
              errorContent={obj.errorBody}
              modSubmitData={modSubmitData}>
              <FormField name="email" type="email" label="Email address" helpText="I'll never share your email with anyone else." required={true} />
              <FormField name="name" type="text" label="Your name" />
              <FormField name="topic" type="select" label="Topic" required={true}>
                {topicOptions}
              </FormField>
              {newsletterFragment}
              <FormField name="message" type="textarea" label="Message" required={true} />
            </NetlifyForm>
            <div>
              <Button variant="primary" ref={submitRef}>{obj.submitButtonLabel}</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactForm

export const query = graphql`
  fragment ContentfulComponentContactForm on ContentfulComponentContactForm {
    __typename
    heading
    styles
    introContent {
      ...RichText
    }
    availableTopics
    showNewsletterSignup
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