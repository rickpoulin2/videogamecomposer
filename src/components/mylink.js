import React from 'react'
import { Link, graphql } from 'gatsby'

const MyLink = ({ obj, addClasses }) => {
    if (obj == null) {
        return '';
    }
    let linkTitle = "";
    let linkContent = obj.text;
    let linkStyles = "";
    let linkIcon = "";
    if (addClasses) {
        linkStyles += addClasses + " ";
    }
    if (obj.styles) {
        linkStyles += obj.styles;
    }
    if (obj.icon) {
        const faLib = obj.icon === "envelope" ? "fas" : "fab";
        linkIcon = <i className={faLib + " fa-" + obj.icon}></i>;
        linkContent = obj.hideText ? linkIcon : <>{linkContent} {linkIcon}</>
    }
    return obj.isInternal ?
        (<Link to={"/" + obj.targetPage?.url} className={linkStyles} activeClassName="active" title={linkTitle}>{linkContent}</Link>)
        :
        (<a href={obj.targetLink} target="_blank" rel="noreferrer" className={linkStyles} title={linkTitle}>{linkContent}</a>);
}

export default MyLink

export const query = graphql`
  fragment MyLink on ContentfulLink {
    isInternal
    text
    targetLink
    targetPage {
        id
        title
        url
    }
    styles
    icon
    hideText
  }
`