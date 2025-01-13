import React from 'react'
import { graphql } from 'gatsby'
import PageComponent from './page-component'

const ComponentGroup = ({ obj }) => {
  if (obj == null)
    return

  const styles = "cgroup " + (obj.styles ? obj.styles : "")
  const components = obj.components?.map((x) => (<PageComponent key={x.id} obj={x} />));

  if (obj.structureType === "section")
    return (
      <section className={styles}>
        <div className="container">
          <div className="row">
            {components}
          </div>
        </div>
      </section>
    )


  if (obj.structureType === "container")
    return (
      <div className={styles}>
        <div className="row">
          {components}
        </div>
      </div>
    )

  return (
    <div className={styles}>
      {components}
    </div>
  )
}

export default ComponentGroup

// this query isn't actually used because of infinite nesting, edit in page.js instead
export const query = graphql`
  fragment ContentfulComponentGroup on ContentfulComponentGroup {
    styles
    structureType
    ...PageComponent
  }`