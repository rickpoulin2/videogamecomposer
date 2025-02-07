import React, { useContext } from 'react'
import { Link } from 'gatsby'
import AppContext from './app-context';

const EntryLink = ({ title, type, slug, className, activeClass, onClick, children }) => {
    const linkSlugs = useContext(AppContext).linkSlugs

    let href = null
    if (type === "ContentfulPage")
        href = "/" + slug
    if (type === "ContentfulAlbum")
        href = `/${linkSlugs.albumsPage}/#${slug}`
    if (type === "ContentfulBlogEntry")
        href = `/${linkSlugs.blogPage}/#entry${slug}`
    if (type === "ContentfulNewsletter")
        href = `/${linkSlugs.newsletterPage}/${slug}`

    if (href == null) {
        console.log(`unknown link type ${type} for slug ${slug}`)
        return <>{children}</>
    }

    return <Link to={href} className={className} activeClassName={activeClass} title={title} onClick={onClick}>{children}</Link>
}

export default EntryLink