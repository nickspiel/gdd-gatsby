import React from 'react'
import styled, { keyframes } from 'styled-components'

const expandAnimation = keyframes`
  0% {
    opacity: 0;
  }
  25% {
    transform: scale(2);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.5;
`

const Line = styled.div`
  animation: ${expandAnimation} 1s ease-in-out infinite;
  border-radius: 10px;
  display: inline-block;
  transform-origin: center center;
  margin: 0 7px;
  width: 2px;
  height: 20px;
  background: white;
  &:nth-child(2) {
    animation-delay: 180ms;
  }
  &:nth-child(3) {
    animation-delay: 360ms;
  }
  &:nth-child(4) {
    animation-delay: 540ms;
  }
`

const Loader = () => (
  <Wrapper>
    <Line />
    <Line />
    <Line />
    <Line />
  </Wrapper>
)

export default Loader
