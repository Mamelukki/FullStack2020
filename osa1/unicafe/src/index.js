import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

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
        <p>good {good} </p>
        <p>neutral {neutral} </p>
        <p>bad {bad} </p>
        <p>all {allFeedback}</p>
        <p>average {average()}</p>
        <p>positive {positive()} % </p>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)