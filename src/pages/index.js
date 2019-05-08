import React, { useState } from 'react'
import { createGlobalStyle } from 'styled-components'

import SEO from '../components/seo'
import SearchBar from '../components/SearchBar'
import ResultsList from '../components/ResultsList'
import mixpanel from '../services/mixpanel'

const GlobalStyles = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin: 0;
    background-color: black;
    color: white;
    font-size: 16px;
    text-align: center;
    font-family: sans-serif;
    padding: 2vw;
  }

  * {
    box-sizing: border-box;
  }
`

const IndexPage = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  mixpanel.track('load');

  return (
    <div>
      <GlobalStyles />
      <SEO title="Search" />
      <SearchBar
        query={query}
        setQuery={setQuery}
        setResults={setResults}
        results={results}
      />
      <ResultsList
        results={results}
        query={query}
        setResults={setResults}
      />
    </div>
  )
}

export default IndexPage
