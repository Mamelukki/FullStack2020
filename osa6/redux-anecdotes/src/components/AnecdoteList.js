import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes

  const vote = (id) => {
    props.addVote(id)
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    props.setNotification(`You voted '${anecdote.content}'`, 5)
  }

  return (
    <div>
      {props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {  
  const anecdotesToShow = state.filter === null ? state.anecdotes : state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  return {
    anecdotes: anecdotesToShow
  }
}

const mapDispatchToProps = {  
  addVote,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)