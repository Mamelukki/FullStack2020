import React from 'react'

const Course = (props) => {
  return (
    <div>
      <Header course={props.course} />
      <Content course={props.course} />
      <Total course={props.course} />
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercises} </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.course.parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <b>total of {props.course.parts.reduce((sum, part) => sum + part.exercises, 0)} </b>
    </div>
  )
} 

export default Course