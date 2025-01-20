require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  flags: { DEV_SSR: true },
  siteMetadata: {
    title: "Videogamecomposer",
    description: "francoisgerinlajoie.ca",
  },
  plugins: [
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        defaults: {
          placeholder: "blurred",
          quality: "90",
          backgroundColor: "transparent"
        }
      }
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-recaptcha",
      options: {
        async: true,
        defer: true,
        args: `?onload=onloadCallback&render=explicit`
      }
    },
    "gatsby-plugin-schema-export",
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: process.env.CONTENTFUL_HOST
      },
    },
  ],
};
