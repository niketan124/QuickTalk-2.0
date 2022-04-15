import React from 'react'
import styled from 'styled-components'
import Robot from '../assets/robot.gif'

export default function Welcome({currentUser}) {
  return (
    <Container>
        <img draggable='false' src={Robot} alt="robot" />
        <h1>
            Welcome, <span>{currentUser.username}!</span>
        </h1>
        <h3>Please select a chat to Start Messaging.</h3>
    </Container>
  )
}

const Container = styled.div`
user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    img {
        height: 20rem;
    }
    span {
        text-transform: capitalize;
        color: #4e0eff;
    }
`