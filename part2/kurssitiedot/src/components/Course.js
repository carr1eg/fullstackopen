import React from 'react'


const Course = ({course}) => {
  return (
    <div>
      <Header name = {course.name}/>
      <Content parts = {course.parts}/>
      <Total total = {course.parts}/>
    </div>    
  )
}

const Header = ({name}) => {
  return (
    <h1>{name}</h1>
  )
}


const Content = ({parts}) => {
  return (
    <div>
      {parts.map( (part, i) => 
        <Part key={parts[i].id} part={parts[i]} />
      )}
    </div>
  )
}

const Total = ({ total }) => {
  let sum = total.reduce((a, c, i, arr) => {
    return a + arr[i]['exercises']
  },0);
 return(
   <p><b>Number of exercises {sum}</b></p>
 ) 
}

const Part = ({part}) => {
  // console.log("partN is", part);
  return (
    <p > 
      {part.name} {part.exercises}
    </p>    
  )
}

export default Course