import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 2rem auto;
`

const Attribution = () => (
  <Wrapper>
    <StaticQuery
      query={graphql`
        query {
          placeholderImage: file(relativePath: { eq: "powered-by-giphy.png" }) {
            childImageSharp {
              fixed {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      `}
      render={data => (
        <Img fixed={data.placeholderImage.childImageSharp.fixed} />
      )}
    />
  </Wrapper>
)

export default Attribution
