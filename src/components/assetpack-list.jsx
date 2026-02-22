import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import AssetPackCard from './assetpack-card'

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
  const packs = packsData.data?.nodes?.map((i) =>
    <AssetPackCard key={i.id} obj={i} />
  )
  const clz = "packs-list col " + (obj.styles ? obj.styles : "")
  return (
    <div className={clz}>
      {packs}
    </div>
  )
}

export default AssetPackList