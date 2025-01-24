import React, { useState, useRef } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import MyLink from './mylink'
import NewsletterCard from './newsletter-card'
import RichText from './richtext'
import NewsletterForm from './newsletter-form'
import ModalDialog from './modal-dialog'
import { Button } from 'react-bootstrap'
import './newsletter-signup'

import './newsletter-latest.scss';

const NewsletterLatest = ({ obj }) => {
  const [showModal, setShowModal] = useState(false);
  let signupFormRef = useRef(null)

  const newsData = useStaticQuery(
    graphql`
      query LatestNewsletterEntries {
        data: allContentfulNewsletter(limit: 1, sort: {publishedDate: DESC}) {
          nodes {
            ...NewsletterCard
          }
        }
      }`);

  let entries = newsData.data?.nodes?.map((i) =>
    <NewsletterCard key={i.id} obj={i} />
  );

  const showDialog = () => setShowModal(true)
  const hideDialog = () => setShowModal(false)
  const submitForm = () => signupFormRef.requestSubmit()
  const showSignup = obj.signupButtonLabel != null && obj.signupButtonLabel !== "" && obj.signupForm != null;
  const signupButton = showSignup ? <button className="btn btn-primary" onClick={showDialog}>{obj.signupButtonLabel}</button> : null
  const modalFooter = !showSignup ? null :
    <>
      <Button variant="outline-primary" onClick={hideDialog}>Close</Button>
      <Button variant="primary" onClick={submitForm}>{obj.signupForm.submitButtonLabel}</Button>
    </>
  const modal = !showSignup ? null :
    <ModalDialog heading={obj.signupForm.heading} footer={modalFooter} showModal={showModal} onClose={hideDialog}>
      <NewsletterForm formRef={el => signupFormRef = el} obj={obj.signupForm} />
    </ModalDialog >

  let buttons = ""
  if (!(newsData.data?.nodes?.length > 0)) {
    entries = <li>Nothing here yet! Check back soon.</li>
  } else {
    buttons = obj.buttons?.map((btn, i, arr) => {
      const cl = 'btn ' + (signupButton == null && i === arr.length - 1 ? 'btn-primary' : 'btn-outline-primary');
      return <MyLink key={btn.id} obj={btn} addClasses={cl} />
    });
  }

  return (
    <div className={"newsletter-latest " + obj.styles}>
      <h2 className="pix"><span>{obj.heading}</span></h2>
      {entries}
      <RichText data={obj.trailingBlurb} />
      <div className="cta">
        {buttons}
        {signupButton}
      </div>
      {modal}
    </div>
  )
}

export default NewsletterLatest

export const query = graphql`
  fragment ContentfulComponentNewsletterLatest on ContentfulComponentNewsletterLatest {
    __typename
    heading
    styles
    trailingBlurb {
      ...RichText
    }
    buttons {
      ...MyLink
    }
    signupButtonLabel
    signupForm {
      ...ContentfulComponentNewsletterSignup
    }
  }
`