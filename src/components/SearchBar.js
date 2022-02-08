import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { search } from '../services/gif'
import logoOpen from '../images/logo-open.svg'
import logoClose from '../images/logo-close.svg'
import mixpanel from '../services/mixpanel'

const Form = styled.form`
  display: flex;
  align-items: center;
  margin: 0 4vw;
`

const Label = styled.label`
  display: none;
`

const Input = styled.input`
  width: auto;
  min-height: 3rem;
  border: none;
  border-bottom: solid #111111 2px;
  font-size: 4vw;
  background-color: transparent;
  color: white;
  text-align: center;
  text-transform: uppercase;
  margin: 0 1rem;
  caret-color: #74faa2;
  width: 30vw;
  max-width: 25rem;
  &:focus {
    outline: none;
    border-color: #000000;
  }
  &::placeholder {
    color: #555555;
  }
  @media (min-width: 760px) {
    font-size: 3vw;
  }
`

const LogoOpen = styled.img`
  width: 36vw;
  max-width: 24rem;
`

const LogoClose = styled.img`
  width: 5.25vw;
  max-width: 3.75rem;
`

const SearchBar = ({ query, setQuery, setResults }) => {
  const fetchResults = event => {
    search(query, [], setResults)

    mixpanel.track('search', { query })

    event.preventDefault()
  }

  return (
    <Form onSubmit={fetchResults}>
      <LogoOpen src={logoOpen} alt="" />
      <Label htmlFor="search">Search</Label>
      <Input
        name="search"
        id="search"
        autoFocus
        onChange={event => setQuery(event.target.value)}
      />
      <LogoClose src={logoClose} alt="" />
    </Form>
  )
}

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  setResults: PropTypes.func.isRequired,
}

export default SearchBar
