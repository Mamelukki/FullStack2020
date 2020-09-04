import React from 'react'

const Course = (props) => {
  return (
    <div>
      <h1>Half Stack application development</h1>
      {props.courses.map(course => 
        <div key={course.id}>   
          <Header course={course.name} /> 
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      )}
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h2>{props.course}</h2>
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
      {props.parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <b>total of {props.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises </b>
    </div>
  )
} 

export default Course