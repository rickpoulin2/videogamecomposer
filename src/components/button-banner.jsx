import React from 'react'
import { graphql } from 'gatsby'
import MyLink from './mylink'

import './button-banner.scss'

const ButtonBanner = ({ obj }) => {
  if (obj == null)
    return

  const subtext = obj.subtext ? <p className="card-subtitle">{obj.subtext}</p> : ""
  const styles = "button-banner " + (obj.styles ? obj.styles : "")
  const cardClass = "card text-bg-" + obj.cardType
  const buttonClass = "btn btn-lg btn-outline-" + (obj.cardType === "tertiary" || obj.cardType === "light" ? "dark" : "light")
  const buttons = obj.buttons?.map((btn, i, arr) => {
    return <MyLink obj={btn} addClasses={buttonClass} />
  });

  return (
    <div className={styles}>
      <div className={cardClass}>
        <div class="card-body">
          <div class="col">
            <h2 class="card-title">{obj.title}</h2>
            {subtext}
          </div>
          <div class="col">
            {buttons}
          </div>
        </div>
      </div>
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