import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { copy, imageElementString } from '../services/clipboard'
import { random } from '../services/gif'
import mixpanel from '../services/mixpanel'

const Wrapper = styled.div`
  margin: 2rem 0;
`

const Button = styled.button`
  padding: 0.5rem;
  margin: 0 0.5rem;
  font-size: inherit;
  border: solid 1px #74FAA2;
  box-shadow: 2px 2px 0 0 #74FAA2;
  color: #74FAA2;
  background-color: transparent;
  text-transform: uppercase;
  &:focus {
    outline: none;
  }
  &:active {
    background-color: rgba(255, 255, 255, 0.25);
    transform: translate(2px, 2px);
    box-shadow: 0 0 0 0 #74FAA2;
  }
`

const SearchBar = ({ query }) => {
  const copyGif = (response) => {
    
    copy(imageElementString(response.data.images.original.gif_url, query));
  }
  const getRandom = () => {
    mixpanel.track('random');
    random(query, 'pg-13').then(copyGif);
  }

  const getRiskyRandom = () => {
    mixpanel.track('risky random');
    random(query).then(copyGif);
  }

  return (
    <Wrapper>
      <Button onClick={getRandom}>I'm Feeling Lucky</Button>
      <Button onClick={getRiskyRandom}>I'm Feeling Reeeal Lucky (Maybe NSFW)</Button>
    </Wrapper>
  )
}

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
}

export default SearchBar