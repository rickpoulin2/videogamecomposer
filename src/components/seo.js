import * as React from 'react'
import { Helmet } from 'react-helmet'

const Seo = ({ description = '', lang = 'en', meta = [], title, defaultTitle, image }) => {
  const metaDescription = description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      defaultTitle={defaultTitle}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `image`,
          content: image,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: image,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
      link={[
        {
          rel: `icon`,
          href: image,
        },
        {
          rel: `preconnect`,
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: `preconnect`,
          href: 'https://fonts.gstatic.com',
          crossOrigin: '',
        },
      ]}
    />
  )
}

export default Seo
