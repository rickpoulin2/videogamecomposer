const path = require('path')

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
  type RichText {
    raw: String!
    references: [ContentfulPage] @link(from: "references___NODE")
  }
  type ContentfulLink implements Node {
    isInternal: Boolean!
    text: String!
    targetPage: ContentfulPage @link(from: "targetPage___NODE")
    targetLink: String
    icon: String
    styles: String
    hideText: Boolean
  }
  type ContentfulAlbum implements Node {
    title: String!
    publishedDate: Date @dateformat(formatString: "YYYY-MM-DD")
    trackCount: Int!
    collaboratorName: String
    collaboratorLink: String
    coverImage: ContentfulAsset @link(from: "coverImage___NODE")
    videoId: String!
    linkYouTube: String
    linkSpotify: String
    linkBandcamp: String
    linkItchio: String
    linkItunes: String
    albumDescription: RichText!
  }
  type ContentfulBlogEntry implements Node {
    title: String!
    publishedDate: Date @dateformat(formatString: "YYYY-MM-DD")
    content: RichText!
  }
  type ContentfulNewsletter implements Node {
    heading: String!
    url: String!
    publishedDate: Date @dateformat(formatString: "YYYY-MM-DD")
    bannerImage: ContentfulAsset @link(from: "bannerImage___NODE")
    tagLine: String
    bodyContent: RichText!
  }
  type ContentfulComponentText implements Node {
    styles: String
    fancyHeading: String
    dateTag: Date @dateformat(formatString: "YYYY-MM-DD")
    image: ContentfulAsset @link(from: "image___NODE")
    content: RichText!
  }
  type ContentfulComponentContentCard implements Node {
    styles: String
    fancyHeading: String
    cardType: String!
    image: ContentfulAsset @link(from: "image___NODE")
    content: RichText!
    buttons: [ContentfulLink] @link(from: "buttons___NODE")
  }
  type ContentfulComponentHero implements Node {
    heading: String
    styles: String
    body: RichText!
    buttons: [ContentfulLink] @link(from: "buttons___NODE")
    portraitImage: ContentfulAsset @link(from: "portraitImage___NODE")
  }
  type ContentfulComponentVideo implements Node {
    title: String!
    styles: String
    cardType: String!
    videoId: String!
    backgroundImage: ContentfulAsset @link(from: "backgroundImage___NODE")
  }
  type ContentfulComponentButtonBanner implements Node {
    title: String!
    subtext: String
    styles: String
    cardType: String!
    buttons: [ContentfulLink] @link(from: "buttons___NODE")
  }
  type ContentfulComponentAlbumList implements Node {
    id: ID!
    styles: String
  }
  type ContentfulComponentNewsletterList implements Node {
    id: ID!
    styles: String
  }
  type ContentfulComponentBlogEntries implements Node {
    id: ID!
  }
  type ContentfulComponentBlogLatest implements Node {
    heading: String
    styles: String
    buttons: [ContentfulLink] @link(from: "buttons___NODE")
  }
  type ContentfulComponentNewsletterLatest implements Node {
    heading: String
    styles: String
    trailingBlurb: RichText
    buttons: [ContentfulLink] @link(from: "buttons___NODE")
  }
  type ContentfulComponentNewsletterSignup implements Node {
    heading: String
    styles: String
    introContent: RichText
    submitButtonLabel: String
  }
  type ContentfulComponentContactForm implements Node {
    heading: String
    styles: String
    introContent: RichText
    submitButtonLabel: String
  }
  type ContentfulComponentCommissionCard implements Node {
    title: String!
    coverImage: ContentfulAsset @link(from: "coverImage___NODE")
    developer: String
    publisher: String
    releaseYear: String
    steamLink: String
    itchioLink: String
    youTubeLink: String
    otherLink: String
  }
  type ContentfulComponentGroup implements Node {
    styles: String
    content: [ContentfulPageContent] @link(from: "content___NODE")
  }
  union ContentfulPageContent = ContentfulComponentGroup | ContentfulComponentText | ContentfulComponentHero | ContentfulComponentVideo | ContentfulComponentButtonBanner | ContentfulComponentContentCard | ContentfulComponentAlbumList | ContentfulComponentBlogEntries | ContentfulComponentBlogLatest | ContentfulComponentNewsletterLatest | ContentfulComponentNewsletterList | ContentfulComponentNewsletterSignup | ContentfulComponentContactForm | ContentfulComponentCommissionCard
  type ContentfulSiteGlobals implements Node {
    siteTitle: String!
    siteHeadingStart: String
    siteHeadingEnd: String!
    headerNavigation: [ContentfulLink] @link(from: "headerNavigation___NODE")
    headerButtonLink: ContentfulLink @link(from: "headerButtonLink___NODE")
    footerNavigation: [ContentfulLink] @link(from: "footerNavigation___NODE")
    siteIcon: ContentfulAsset @link(from: "siteIcon___NODE")
    siteLogo: ContentfulAsset @link(from: "siteLogo___NODE")
    siteBackground: ContentfulAsset @link(from: "siteBackground___NODE")
    footerContent: RichText
    copyrightLine: String
  }
  type ContentfulPage implements Node {
    title: String!
    url: String!
    hideTitle: Boolean!
    introContent: [ContentfulPageContent] @link(from: "introContent___NODE")
    mainContent: [ContentfulPageContent] @link(from: "mainContent___NODE")
  }
  `);
}

createPageTypes = async (graphql, actions, reporter, template, pathTransform, query) => {
  const { createPage } = actions
  const results = await graphql(query)
  if (results.errors) {
    reporter.panicOnBuild(`Can't find Contentful results`, results.errors)
    return
  }
  Object.keys(results.data).forEach((x) => {
    const items = results.data[x].nodes;

    if (items.length > 0) {
      items.forEach((item, index) => {
        const previousPostSlug = index === 0 ? null : items[index - 1].url
        const nextPostSlug = index === items.length - 1 ? null : items[index + 1].url

        createPage({
          path: pathTransform(item.url),
          component: template,
          context: {
            slug: item.url,
            previousPostSlug,
            nextPostSlug,
          },
        })
      })
    }
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createPageTypes(graphql, actions, reporter,
    path.resolve('./src/templates/page.js'),
    (slug) => `/${slug}/`,
    `{
      items: allContentfulPage {
        nodes {
          url
        }
      }
    }`
  );

  await createPageTypes(graphql, actions, reporter,
    path.resolve('./src/templates/newsletter.js'),
    (slug) => `/newsletter/${slug}/`,
    `{
      items: allContentfulNewsletter(sort: {publishedDate: DESC}) {
        nodes {
          url
        }
      }
    }`
  );

}
