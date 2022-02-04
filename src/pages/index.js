import React, { useState } from "react"
import styled, { createGlobalStyle } from "styled-components"

import Head from "../components/Head"
import SearchBar from "../components/SearchBar"
import ResultsList from "../components/ResultsList"
import Attribution from "../components/Attribution"
import mixpanel from "../services/mixpanel"

const GlobalStyles = createGlobalStyle`
  html {
    height: 100%;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background-color: black;
    color: white;
    font-size: 16px;
    text-align: center;
    font-family: sans-serif;
    padding: 2vw;
    text-transform: uppercase;
  }

  * {
    box-sizing: border-box;
  }

  button {
    cursor: pointer;
  }
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  overflow-y: auto;
`

const IndexPage = () => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])

  mixpanel.track("load")

  return (
    <Main>
      <GlobalStyles />
      <Head title="Search" />
      <SearchBar
        query={query}
        setQuery={setQuery}
        setResults={setResults}
        results={results}
      />
      {!!results.length && (
        <ResultsList results={results} query={query} setResults={setResults} />
      )}
      <Attribution />
    </Main>
  )
}

export default IndexPage
