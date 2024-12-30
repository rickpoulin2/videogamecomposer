const path = require('path')

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
  type RichText {
    raw: String!
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
  type ContentfulComponentText implements Node {
    styles: String
    content: RichText!
  }
  type ContentfulComponentHero implements Node {
    heading: String
    styles: String
    body: RichText!
    buttons: [ContentfulLink] @link(from: "buttons___NODE")
    portraitImage: ContentfulAsset @link(from: "portraitImage___NODE")
  }
  type ContentfulComponentGroup implements Node {
    styles: String
    content: [ContentfulPageContent] @link(from: "content___NODE")
  }
  union ContentfulPageContent = ContentfulComponentGroup | ContentfulComponentText | ContentfulComponentHero
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
      allContentfulPage {
        nodes {
          title
          url
        }
      }
    }`
  );

  await createPageTypes(graphql, actions, reporter,
    path.resolve('./src/templates/blog-post.js'),
    (slug) => `/blog/${slug}/`,
    `{
      allContentfulBlogPost {
        nodes {
          title
          slug
        }
      }
    }`
  )
}
