const Header = (props) => {
    return (
      <h2>{props.headerText}</h2>
    )
  }
  
  const Part = (props) => {
    return (
      <p>{props.part.name} {props.part.exercises}</p>
    )
  }
  
	const Content = (props) => {  
    return (
			props.parts.map(coursePart =>
				<Part key={coursePart.id} part={coursePart}></Part>
			)
    )
  }

  const Total = (props) => {
    const exerciseSum = props.parts.reduce((runningTotal, element) => runningTotal += element.exercises , 0)
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