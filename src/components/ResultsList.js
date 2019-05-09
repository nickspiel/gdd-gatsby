import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Bricks from 'bricks.js'

import { copy, imageElementString, markdownString } from '../services/clipboard'
import { search } from '../services/gif'
import Loader from './Loader'
import QuickSearch from './QuickSearch'

const List = styled.ul`
  margin: 0 auto 2rem;
  padding: 0;
  line-height: 0;
  list-style: none;
  box-sizing: border-box;
`

const ListItem = styled.li`
  position: relative;
  opacity: 0;
  transition: opacity 0.3s;
  overflow: visible;
  background: currentColor;
  border: solid 1px currentColor;
  box-shadow: 4px 4px 0 0 currentColor;
  &[data-packed] {
    opacity: 1;
  }
  &:nth-child(4n) {
    color: #111111;
  }
  &:nth-child(4n + 1) {
    color: #74FAA2;
  }
  &:nth-child(4n + 2) {
    color: #5ACAFA;
  }
  &:nth-child(4n + 3) {
    color: #8C43F6;
  }
  &:nth-child(4n + 4) {
    color: #ED706B;
  }
`

const Image = styled.img`
  position: relative;
`

const CopyOptions = styled.div`
  opacity: 0;
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: currentColor;
  transition: transform 0.5s, opacity 0.3s;
  &:hover {
    opacity: 1;
    transform: translate(-5px, -5px);
  }
`

const CopyButton = styled.button`
  padding: 0.5rem;
  margin: 0 0.5rem;
  font-size: inherit;
  border: solid 1px white;
  box-shadow: 2px 2px 0 0 white;
  color: white;
  background-color: transparent;
  &:focus {
    outline: none;
  }
  &:active {
    background-color: rgba(255, 255, 255, 0.25);
    transform: translate(2px, 2px);
    box-shadow: 0 0 0 0 white;
  }
`

const MoreButton = styled.button`
  height: 4rem;
  padding: 0 1rem;
  border: none;
  color: #74FAA2;
  border: solid 1px #74FAA2;
  box-shadow: 2px 2px 0 0 #74FAA2;
  font-size: inherit;
  text-transform: uppercase;
  margin-bottom: 3vw;
  background-color: transparent;
  &:focus {
    outline: none;
  }
  &:active {
    transform: translate(2px, 2px);
    box-shadow: 0 0 0 0 #74FAA2;
  }
`

const ResultsList = ({ results = [], setResults, query }) => {
  const [loading, setLoading] = useState(false)
  const appendResults = (resultUrls) => {
    setResults([...results, ...resultUrls])
  }
  const loadMoreResults = () => {
    setLoading(true)
    search(query, results, appendResults)
  }
  let instance
  useEffect(() => {
    instance = Bricks({
      container: 'ul',
      packed:    'data-packed',        // if not prefixed with 'data-', it will be added
      sizes:  [
        { columns: 1, gutter: 20 },                   // assumed to be mobile, because of the missing mq property
        { mq: '420px', columns: 2, gutter: 25 },
        { mq: '768px', columns: 3, gutter: 30 },
        { mq: '960px', columns: 4, gutter: 30 },
        { mq: '1160px', columns: 5, gutter: 30 },
      ]
    })
    instance
      .on('pack',   () => setLoading(false))
    instance
      .resize(true)
      .pack()
  })

  return (
    <>
      {!!results.length && <QuickSearch query={query} />}
      <List>
        {results.map(({ url, originalUrl, width, height }) => (
          <ListItem key={url} style={{ width: `${width}px`, height: `${height}px` }}>
            <Loader loading={loading} />
            <Image width={width} height={height} alt="" loading="lazy" src={url} />
            <CopyOptions>
              <CopyButton onClick={() => copy(imageElementString(originalUrl, query))}>IMG</CopyButton>
              <CopyButton onClick={() => copy(markdownString(originalUrl, query))}>MD</CopyButton>
            </CopyOptions>
          </ListItem>
        ))}
      </List>
      {results.length !== 0 && <MoreButton onClick={loadMoreResults} type="button">{loading ? 'Loading' : 'Moar'}</MoreButton>}
    </>
  )
}

ResultsList.propTypes = {
  query: PropTypes.string.isRequired,
  setResults: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(PropTypes.string),
}

export default ResultsList 
