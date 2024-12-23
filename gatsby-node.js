const path = require('path')

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
  type RichText {
    raw: String!
  }
  union ContentfulLinkTypes = ContentfulInternalLink | ContentfulExternalLink
    type ContentfulInternalLink implements Node {
    id: ID!
    text: String!
    target: ContentfulPage
    icon: String
    styles: String
    hideText: Boolean
  }
  type ContentfulExternalLink implements Node {
    id: ID!
    text: String!
    href: String!
    icon: String
    styles: String
    hideText: Boolean
  }
  type ContentfulSiteGlobals implements Node {
    id: ID!
    siteTitle: String!
    headerNavigation: [ContentfulLinkTypes] @link(from: "headerNavigation___NODE")
    footerNavigation: [ContentfulLinkTypes] @link(from: "footerNavigation___NODE")
    siteIcon: ContentfulAsset @link(from: "siteIcon___NODE")
    siteLogo: ContentfulAsset @link(from: "siteLogo___NODE")
    siteBackground: ContentfulAsset @link(from: "siteBackground___NODE")
    footerContent: RichText
    copyrightLine: String
  }
  `);
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve('./src/templates/blog-post.js')

  const result = await graphql(
    `
      {
        allContentfulBlogPost {
          nodes {
            title
            slug
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allContentfulBlogPost.nodes

  // Create blog posts pages
  // But only if there's at least one blog post found in Contentful
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostSlug = index === 0 ? null : posts[index - 1].slug
      const nextPostSlug =
        index === posts.length - 1 ? null : posts[index + 1].slug

      createPage({
        path: `/blog/${post.slug}/`,
        component: blogPost,
        context: {
          slug: post.slug,
          previousPostSlug,
          nextPostSlug,
        },
      })
    })
  }
}
