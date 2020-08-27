import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )
}

const Statistics = (props) => {
  if (props.all === 0) {
    return "no feedback given"
  }

  return (
    <div>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.all} />
      <StatisticLine text="average" value={props.average} />
      <StatisticLine text="positive" value={100 * props.positive + " %"} />
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