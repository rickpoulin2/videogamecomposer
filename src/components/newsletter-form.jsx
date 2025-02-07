import React from 'react'
import NetlifyForm from './netlify-form';
import FormField from './form-field';

import './newsletter-form.scss'

const NewsletterForm = ({ submitRef, obj }) => {
  return (
    <NetlifyForm
      name="newsletter"
      submitRef={submitRef}
      successHeading={obj.successHeading}
      errorHeading={obj.errorHeading}
      successContent={obj.successBody}
      errorContent={obj.errorBody}>
      <FormField name="email" type="email" label="Email address" helpText="I'll never share your email with anyone else." required={true} />
      <FormField name="name" type="text" label="Your name" />
      <FormField name="country" type="text" label="Country of residence" />
    </NetlifyForm>
  )
}

export default NewsletterForm