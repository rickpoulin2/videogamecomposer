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
    if (!form.checkValidity()) {
      console.log("here");
    }
    form.classList.add('was-validated');

    const formData = new FormData(form);
    const result = document.querySelector(".result");

    fetch(form.action ? form.action : window.location.pathname, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString()
    })
      .then((r) => {
        if (r == null || !r.ok || r.status !== 200) {
          result.innerText = `Request failed!`;
          console.log(r);
          return;
        }
        result.innerText = "Success";
        console.log(r);
      })
      .catch(error => {
        result.innerText = `Failed: ${error}`;
      });
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
                <label htmlFor="topic" className="form-label">Topic*</label>
                <select id="topic" className="form-select" required>
                  <option selected disabled>- Please select an option -</option>
                  <option value="1">I need music for my project!</option>
                  <option value="2">I want to collaborate with you!</option>
                  <option value="3">I used your free music in my project!</option>
                  <option value="4">I have general feedback!</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea id="message" className="form-control" rows="5"></textarea>
              </div>
              <div className="field">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                  <label className="form-check-label" htmlFor="flexCheckDefault">Sign up for mailing list</label>
                </div>
              </div>
              <div>
                <button type="submit" className="btn btn-primary">{obj.submitButtonLabel}</button>
              </div>
              <div className="result"></div>
            </form>
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