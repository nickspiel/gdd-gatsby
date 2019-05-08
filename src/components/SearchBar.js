import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { search } from '../services/gif'
import logoOpen from '../images/logo-open.svg'
import logoClose from '../images/logo-close.svg'

const Form = styled.form`
  display: inline-flex;
  align-items: flex-end;
  margin: 0 4vw;
`

const Input = styled.input`
  width: auto;
  max-width: 20rem;
  height: 3rem;
  border: none;
  border-bottom: solid #111111 2px;
  font-size: 24px;
  background-color: transparent;
  color: white;
  text-align: center;
  text-transform: uppercase;
  margin: 0 1rem 1.25rem;
  caret-color: #74FAA2;
  &:focus {
    outline: none;
    border-color: #000000;
  }
  &::placeholder {
    color: #555555;
  }
`

const SearchBar = ({ data, query, setQuery, setResults }) => {
  const fetchResults = (event) => {
    search(query, [], setResults)

    event.preventDefault()
  }

  return (
    <div>
      <Form onSubmit={fetchResults} >
        <img src={logoOpen} alt="" height="80" />
        <Input autoFocus onChange={(event) => setQuery(event.target.value) } />
        <img src={logoClose} alt="" height="80" />
      </Form>
    </div>
  )
}

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  setResults: PropTypes.func.isRequired,
}

export default SearchBar