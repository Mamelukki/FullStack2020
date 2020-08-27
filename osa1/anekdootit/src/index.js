import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(new Uint8Array(anecdotes.length))
  const [mostVoted, setMostVoted] = useState(0) 

  const handleNextAnecdoteClick = () => { 
    setSelected(randomArrayIndex())
  }

  const randomArrayIndex = () => {
    return Math.floor(Math.random() * anecdotes.length)  
  }

  const handleVoteClick = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVote(copy)
    
    if (copy[selected] > copy[mostVoted]) {
      setMostVoted(selected)
    }
  }

  return (
    <div>
      <h1>Anecdote of the day </h1>
      {props.anecdotes[selected]}
      <p>has {votes[selected]} votes </p>
      <Button onClick={handleNextAnecdoteClick} text="next anecdote" />
      <Button onClick={handleVoteClick} text="vote" />
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[mostVoted]}
      <p>has {votes[mostVoted]} votes </p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
