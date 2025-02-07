import React from 'react'
import { graphql } from 'gatsby'
import { Card, Col } from 'react-bootstrap'
import MyLink from './mylink'

import './button-banner.scss'

const ButtonBanner = ({ obj }) => {
  if (obj == null)
    return
  if (obj.title == null || obj.cardType == null)
    return

  const subtext = obj.subtext ? <p className="card-subtitle">{obj.subtext}</p> : ""
  const styles = "button-banner " + (obj.styles ? obj.styles : "")
  const cardClass = "text-bg-" + obj.cardType
  const buttonClass = "btn btn-lg btn-outline-" + (obj.cardType === "tertiary" || obj.cardType === "light" ? "dark" : "light")
  const buttons = obj.buttons?.map((btn, i, arr) => {
    return <MyLink key={btn.id} obj={btn} addClasses={buttonClass} />
  });

  return (
    <div className={styles}>
      <Card className={cardClass}>
        <Card.Body>
          <Col>
            <Card.Title as="h2">{obj.title}</Card.Title>
            {subtext}
          </Col>
          <Col>
            {buttons}
          </Col>
        </Card.Body>
      </Card>
    </div>
  )
}

export default ButtonBanner

export const query = graphql`
  fragment ContentfulComponentButtonBanner on ContentfulComponentButtonBanner {
    title
    subtext
    styles
    cardType
    buttons {
      ... MyLink
    }
  }
`