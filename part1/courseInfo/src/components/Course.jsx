const Header = ({headerText}) => {
    return (
      <h2>{headerText}</h2>
    )
  }
  
  const Part = ({part}) => {
    return (
      <p>{part.name} {part.exercises}</p>
    )
  }
  
	const Content = ({parts}) => {  
    return (
			parts.map(coursePart =>
				<Part key={coursePart.id} part={coursePart}></Part>
			)
    )
  }

  const Total = ({parts}) => {
    const exerciseSum = parts.reduce((runningTotal, element) => runningTotal += element.exercises , 0)
    return (
      <b>Number of exercises {exerciseSum}</b>
    )
  } 

const Course = ({course}) => {
  return (
      <div>
        <Header headerText={course.name}></Header>
        <Content parts={course.parts}></Content>
        <Total parts={course.parts}></Total>
      </div>
    )
  }

export default Course