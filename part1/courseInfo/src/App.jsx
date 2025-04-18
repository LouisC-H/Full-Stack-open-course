import Course from "./components/Course"

const Courses = ({parts}) => {
  return(
    parts.map(part => 
      <Course key={part.id} course={part}></Course>
    )
  )
}

const Title = ({titleText}) => {
  return (
    <h1>{titleText}</h1>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Title titleText="Web development curriculum"></Title>
      <Courses parts={courses}></Courses>
    </div>
  )
}

export default App