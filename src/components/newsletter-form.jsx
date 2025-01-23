import React from 'react'

import './newsletter-form.scss'
import NetlifyForm from './netlify-form';
import FormField from './form-field';

export function meow() { console.log('meow') }

const NewsletterForm = ({ formRef, obj }) => {

  return (
    <NetlifyForm
      name="newsletter"
      formRef={formRef}
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