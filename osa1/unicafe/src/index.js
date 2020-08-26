import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  if (props.all === 0) {
    return "no feedback given"
  }

  return (
    <div>
      <p>good {props.good} </p>
      <p>neutral {props.neutral} </p>
      <p>bad {props.bad} </p>
      <p>all {props.all}</p>
      <p>average {props.average}</p>
      <p>positive {props.positive} % </p>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allFeedback, setFeedback] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setFeedback(allFeedback + 1)
  }
  
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setFeedback(allFeedback + 1)
  }
  
  const handleBadClick = () => {
    setBad(bad + 1)
    setFeedback(allFeedback + 1)
  }

  const average = () => {
    return (good * 1 + neutral * 0 + bad * -1) / allFeedback
  }

  const positive = () => {
    return good / allFeedback 
  }

  return (
    <div>
      <h1>give feedback</h1>
        <Button handleClick={handleGoodClick} text="good" />
        <Button handleClick={handleNeutralClick} text="neutral" />
        <Button handleClick={handleBadClick} text="bad" />
      <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} all={allFeedback} average={average()} positive={positive()} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)