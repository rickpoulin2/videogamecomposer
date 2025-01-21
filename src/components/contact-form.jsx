import React from 'react'
import ReactDOMServer from 'react-dom/server';
import { graphql } from 'gatsby'
import RichText from './richtext'
import Recaptcha from 'react-recaptcha';

import './contact-form.scss'

const RECAPTCHA_KEY = process.env.SITE_RECAPTCHA_KEY;

const ContactForm = ({ obj }) => {
  const clz = "contact-form " + (obj.styles ? obj.styles : "col")
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
  const successHead = obj.successHeading == null || obj.successHeading === "" ? "" : `<h4 class="alert-heading">${obj.successHeading}</h4>`
  const errorHead = obj.errorHeading == null || obj.errorHeading === "" ? "" : `<h4 class="alert-heading">${obj.errorHeading}</h4>`
  const successBody = ReactDOMServer.renderToStaticMarkup(<RichText data={obj.successBody} />)
  const errorBody = ReactDOMServer.renderToStaticMarkup(<RichText data={obj.errorBody} />)
  const captcha = <Recaptcha sitekey={RECAPTCHA_KEY} render="explicit" onloadCallback={callback} />

  function callback() {
    console.log("captcha ready");
  }

  function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const form = event.target;
    const topic = form.querySelector('select');
    if (topic.value == null || topic.value === "") {
      topic.setCustomValidity("required field");
    } else {
      topic.setCustomValidity("")
    }
    const isValid = form.checkValidity();
    form.classList.add('was-validated');
    if (!isValid) {
      return false;
    }

    const origSubmitText = form.querySelector(".btn").innerHTML;
    updateResult(form);
    const formData = new FormData(form);
    if (formData.get("newsletterSignup") !== "Yes") {
      formData.append("newsletterSignup", "No");
    }
    formData.append("form-name", form.getAttribute("name"));

    fetch(form.action ? form.action : window.location.pathname, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString()
    })
      .then((r) => {
        if (r == null || !r.ok || r.status !== 200) {
          setTimeout(updateResult, 500, form, origSubmitText, false, `Request failed: ${r.status}`);
          console.error(r);
          return;
        }
        setTimeout(updateResult, 500, form, origSubmitText, true);
      })
      .catch(error => {
        setTimeout(updateResult, 500, form, origSubmitText, false, `Failed: ${error}`);
      });
  }

  function handleTopicChange(event) {
    const topic = event.target;
    if (topic.value == null || topic.value === "") {
      topic.setCustomValidity("required field");
    } else {
      topic.setCustomValidity("")
    }
  }

  function updateResult(form, submitText, isSuccess, errorMsg) {
    const resultDiv = form.parentElement.querySelector(".result");
    const submitBtn = form.querySelector(".btn");

    if (submitText == null) {
      resultDiv.innerHTML = '';
      submitBtn.disabled = true;
      submitBtn.innerHTML = "<span class='spinner-border spinner-border-sm' aria-hidden='true'></span> <span role='status'>Sending...</span>";
      return;
    }

    submitBtn.innerHTML = submitText;
    submitBtn.disabled = false;
    const clz = isSuccess ? "success" : "danger";
    const heading = isSuccess ? successHead : errorHead;
    const text = isSuccess ? successBody : errorBody;
    resultDiv.innerHTML = `<div class="alert alert-${clz}" role="alert">${heading}${text}</div>`;
    if (isSuccess) {
      form.classList.add("visually-hidden");
    }
    if (errorMsg) {
      console.error(errorMsg);
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
            <form name="contact" data-netlify="true" onSubmit={handleSubmit} noValidate netlify-honeypot="winnie" data-netlify-recaptcha="true">
              <div style={{ display: "none" }}>
                <label htmlFor="winnie">Skip this field if you're human</label>
                <input id="winnie" name="winnie" type="text" />
              </div>
              <div className="field">
                <label htmlFor="email" className="form-label label-required">Email address</label>
                <input id="email" name="email" className="form-control" type="email" aria-describedby="emailHelp" required />
                <div id="emailHelp" className="form-text">I'll never share your email with anyone else.</div>
              </div>
              <div className="field">
                <label htmlFor="name" className="form-label">Your name</label>
                <input id="name" name="name" className="form-control" type="text" />
              </div>
              <div className="field">
                <label htmlFor="topic" className="form-label label-required">Topic</label>
                <select id="topic" name="topic" className="form-select" required defaultValue="" onChange={handleTopicChange}>
                  <option value="" disabled>- Please select an option -</option>
                  {topicOptions}
                </select>
              </div>
              {newsletterFragment}
              <div className="field">
                <label htmlFor="message" className="form-label label-required">Message</label>
                <textarea id="message" name="message" className="form-control" rows="5" required></textarea>
              </div>
              <div>{captcha}</div>
              <div>
                <button type="submit" className="btn btn-primary">{obj.submitButtonLabel}</button>
              </div>
            </form>
            <div className="result"></div>
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