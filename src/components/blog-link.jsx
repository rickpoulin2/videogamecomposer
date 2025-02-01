import React from 'react'
import EntryLink from './entry-link'

import './blog-link.scss'

const BlogLink = ({ obj, className }) => (
  <li className={className} >
    <EntryLink type="ContentfulBlogEntry" slug={obj.tag}>
      <span className="badge">{obj.publishedDate}</span>
      <span>{obj.title}</span>
    </EntryLink>
  </li>
)

export default BlogLink