import React from 'react'
import { graphql } from 'gatsby'
import RichText from './richtext'

import './contact-form.scss'

const ContactForm = ({ obj }) => {
  const clz = "contact-form " + (obj.styles ? obj.styles : "col")

  function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const form = event.target;
    const topic = form.querySelector('select');
    if (topic.value == null || topic.value === "") {
      //isValid = false;
      topic.setCustomValidity("requied field");
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

    fetch(form.action ? form.action : window.location.pathname, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString()
    })
      .then((r) => {
        if (r == null || !r.ok || r.status !== 200) {
          setTimeout(updateResult, 500, form, origSubmitText, false, `Request failed: ${r.status}`);
          console.log(r);
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
      //isValid = false;
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
    const heading = isSuccess ? "Sent!" : "Error";
    const text = isSuccess ? "Your message has been sent successfully." : "The form submission failed, please try again later.";
    resultDiv.innerHTML = `
      <div class="alert alert-${clz}" role="alert">
        <h4 class="alert-heading">${heading}</h4>
        <p>${text}</p>
      </div>
    `;
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
            <form name="contact" data-netlify="true" onSubmit={handleSubmit} noValidate>
              <input type="hidden" name="form-name" value="contact" />
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
                <select id="topic" name="topic" className="form-select" required onChange={handleTopicChange}>
                  <option value="" selected disabled>- Please select an option -</option>
                  <option value="Commission Request">I need music for my project!</option>
                  <option value="Collaboration Request">I want to collaborate with you!</option>
                  <option value="Music Used In Project">I used your free music in my project!</option>
                  <option value="General Feedback">I have general feedback!</option>
                </select>
              </div>
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
              </div>
              <div className="field">
                <label htmlFor="message" className="form-label label-required">Message</label>
                <textarea id="message" name="message" className="form-control" rows="5" required></textarea>
              </div>
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
    submitButtonLabel
  }
`