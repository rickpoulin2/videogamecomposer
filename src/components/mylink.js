import React from 'react'
import { Link } from 'gatsby'

const MyLink = ({ obj, addClasses }) => {
    if (obj == null) {
        return '';
    }
    let linkTitle = "";
    let linkContent = obj.text;
    let linkStyles = "";
    if (addClasses) {
        linkStyles += addClasses + " ";
    }
    if (obj.styles) {
        linkStyles += obj.styles;
    }
    if (obj.hideText && obj.icon) {
        linkTitle = obj.text;
        const faLib = obj.icon == "envelope" ? "fas" : "fab";
        linkContent = <i className={faLib + " fa-" + obj.icon}></i>;
    }
    return obj.isInternal ?
        (<Link to={"/" + obj.targetPage?.url} className={linkStyles} activeClassName="active" title={linkTitle}>{linkContent}</Link>)
        :
        (<a href={obj.targetLink} target="_blank" rel="noreferrer" className={linkStyles} title={linkTitle}>{linkContent}</a>);
}

export default MyLink