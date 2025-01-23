import React from 'react'
import ReactDOMServer from 'react-dom/server';
import RichText from './richtext'
import Recaptcha from 'react-recaptcha';

const RECAPTCHA_KEY = process.env.SITE_RECAPTCHA_KEY;

const NetlifyForm = ({ name, formRef, successHeading, successContent, errorHeading, errorContent, children }) => {
  const successHead = successHeading == null || successHeading === "" ? "" : `<h4 class="alert-heading">${successHeading}</h4>`
  const errorHead = errorHeading == null || errorHeading === "" ? "" : `<h4 class="alert-heading">${errorHeading}</h4>`
  const successBody = ReactDOMServer.renderToStaticMarkup(<RichText data={successContent} />)
  const errorBody = ReactDOMServer.renderToStaticMarkup(<RichText data={errorContent} />)
  const captcha = <Recaptcha sitekey={RECAPTCHA_KEY} render="explicit" onloadCallback={callback} />

  function callback() {
    console.log("captcha ready");
  }

  function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const form = event.target;

    /*
    const topic = form.querySelector('select');
    if (topic.value == null || topic.value === "") {
        topic.setCustomValidity("required field");
    } else {
        topic.setCustomValidity("")
    }
    */

    const isValid = form.checkValidity();
    form.classList.add('was-validated');
    if (!isValid) {
      return false;
    }

    const origSubmitText = "";//form.querySelector(".btn").innerHTML;
    updateResult(form);
    const formData = new FormData(form);
    /*
    if (formData.get("newsletterSignup") !== "Yes") {
      formData.append("newsletterSignup", "No");
    }
    */
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

  function updateResult(form, submitText, isSuccess, errorMsg) {
    const resultDiv = form.parentElement.querySelector(".result");
    const submitBtn = form.querySelector(".btn");

    if (submitText == null) {
      resultDiv.innerHTML = '';
      //submitBtn.disabled = true;
      //submitBtn.innerHTML = "<span class='spinner-border spinner-border-sm' aria-hidden='true'></span> <span role='status'>Sending...</span>";
      return;
    }

    //submitBtn.innerHTML = submitText;
    //submitBtn.disabled = false;
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
      <form name={name} ref={formRef} data-netlify="true" onSubmit={handleSubmit} noValidate netlify-honeypot="winnie" data-netlify-recaptcha="true">
        <div style={{ display: "none" }}>
          <label htmlFor="winnie">Skip this field if you're human</label>
          <input id="winnie" name="winnie" type="text" />
        </div>
        {children}
        {captcha}
      </form>
      <div className="result"></div>
    </>
  )
}

export default NetlifyForm