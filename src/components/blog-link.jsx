import React from 'react'
import { Link } from 'gatsby'
import './blog-link.scss'

const BlogLink = ({ obj, base, className }) => {
  const anchor = `#entry${obj.tag}`
  const content = <>
    <span className="badge">{obj.publishedDate}</span>
    <span>{obj.title}</span>
  </>
  const link = base ?
    <Link to={`/${base}/${anchor}`}>{content}</Link>
    :
    <a href={anchor}>{content}</a>

  // scrollspy doesn't like internal links
  return <li className={className}>{link}</li>
}

export default BlogLink