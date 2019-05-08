import React, { useState } from "react"

import SEO from "../components/seo"
import SearchBar from '../components/SearchBar'
import ResultsList from '../components/ResultsList'
import mixpanel from '../services/mixpanel';

const IndexPage = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  mixpanel.track('load');

  return (
    <div>
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
