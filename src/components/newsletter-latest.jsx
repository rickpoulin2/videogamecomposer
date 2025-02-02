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
  const [showModal, setShowModal] = useState(false)
  const submitRef = useRef()

  const newsData = useStaticQuery(
    graphql`
      query LatestNewsletterEntries {
        data: allContentfulNewsletter(limit: 1,
          sort: { publishedDate: DESC },
          filter: {
            url: {ne:null},
            heading: {ne:null},
            bodyContent: { raw: {ne:null} },
            publishedDate: {ne:null},
            tagLine: {ne:null},
            bannerImage: { contentful_id: {ne:null} }
          }) {
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
  const showSignup = obj.signupButtonLabel != null && obj.signupButtonLabel !== "" && obj.signupForm != null;
  const signupButton = showSignup ? <Button variant="primary" onClick={showDialog}>{obj.signupButtonLabel}</Button> : null
  const modalFooter = !showSignup ? null :
    <>
      <Button variant="outline-primary" onClick={hideDialog}>Close</Button>
      <Button variant="primary" ref={submitRef}>{obj.signupForm.submitButtonLabel}</Button>
    </>
  const modal = !showSignup ? null :
    <ModalDialog id="signupModal" heading={obj.signupForm.heading} footer={modalFooter} showModal={showModal} onClose={hideDialog}>
      <div className="intro">
        <RichText data={obj.signupForm.introContent} />
      </div >
      <NewsletterForm submitRef={submitRef} obj={obj.signupForm} />
    </ModalDialog>

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