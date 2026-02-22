import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Accordion, Badge, Col } from 'react-bootstrap'
import Scrollspy from 'react-scrollspy'
import Section from './section'
import EntryLink from './entry-link'
import AssetPackCard from './assetpack-card'

import './assetpack-list.scss'
import './side-nav.scss'

const AssetPackList = ({ obj }) => {
  const packsData = useStaticQuery(
    graphql`
      query AllAssetPacks {
        data: allContentfulAssetPack(
          sort: { publishedDate: DESC },
          filter: {
            title: {ne:null},
            slug: {ne:null},
            publishedDate: {ne:null},
            coverImage: { contentful_id: {ne:null} },
            videoId: {ne:null},
            description: { raw: {ne:null} }
        }) {
          nodes {
            id
            ...ContentfulAssetPack
          }
        }
      }`)

  const showNav = packsData.data?.nodes?.length > 3

  let entries = packsData.data?.nodes?.map((i) =>
    <AssetPackCard key={i.id} obj={i} />
  )
  let nav = <></>
  if (showNav) {
    const anchors = []
    let navEntries = packsData.data?.nodes?.map((i) => {
      anchors.push(`entry${i.tag}`)
      return <li className="meow" >
        <EntryLink type="ContentfulAssetPack" slug={i.slug}>
          <span className="badge">{i.publishedDate}</span>
          <span>{i.title}</span>
        </EntryLink>
      </li>
    })
    nav =
      <Section styles="nobg side-nav">
        <div className="box-flair">
          <div>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header><h2>Contents</h2></Accordion.Header>
                <Accordion.Body>
                  <Scrollspy items={anchors} className="blog-list" currentClassName="active">
                    {navEntries}
                  </Scrollspy>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </Section>
  }

  if (!(packsData.data?.nodes?.length > 0)) {
    entries =
      <p>Nothing here yet! Check back again soon.</p>
  }

  const clz = "packs-list " + (obj.styles ? obj.styles : "")
  return (
    <>
      {nav}
      <Section styles={showNav ? "packs wnav" : "packs"}>
        <Col className={clz}>
          {entries}
        </Col>
      </Section>
    </>
  )
}

export default AssetPackList