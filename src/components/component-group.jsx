import React from 'react'
import { graphql } from 'gatsby'
import PageComponent from './page-component'

const ComponentGroup = ({ obj }) => {
  if (obj == null)
    return

  const styles = "cgroup " + (obj.styles ? obj.styles : "")
  const components = obj.components?.map((x) => (<PageComponent key={x.id} obj={x} />));

  return (
    <div className={styles}>
      {components}
    </div>
  )
}

export default ComponentGroup

export const query = graphql`
  fragment ContentfulComponentGroup on ContentfulComponentGroup {
    styles
    ...PageComponent
  }
`