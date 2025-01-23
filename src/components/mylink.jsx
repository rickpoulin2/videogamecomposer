import React from 'react'
import { Link, graphql } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-gtag';

const MyLink = ({ obj, addClasses, activeClass, onClick }) => {
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
        if (obj.hideText) {
            linkTitle = obj.text;
        }
    }
    return obj.isInternal ?
        (<Link to={"/" + obj.targetPage?.url} className={linkStyles} activeClassName={activeClass} title={linkTitle} onClick={onClick}>{linkContent}</Link>)
        :
        (<OutboundLink href={obj.targetLink} target="_blank" rel="noreferrer" className={linkStyles} title={linkTitle} onClick={onClick}>{linkContent}</OutboundLink>);
}

export default MyLink

export const query = graphql`
  fragment MyLink on ContentfulLink {
    id
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