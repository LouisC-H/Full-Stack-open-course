import personsAPI from "../../services/personsAPI"

const PeopleList = (props) => {
  var filteredPeople = props.people.reduce((filteredList, person) => {
        if (person.name.toLowerCase().includes(props.nameFilter)){
          filteredList.push(person)
        }
        return filteredList
      }, []
    )
    return (
    filteredPeople.map(person => 
      <p key={person.name}>
        {person.name} {person.number} 
        <button onClick={() => props.deleteFunc(person.id, person.name)}>delete</button>
      </p> 
    )
  )
}

export default PeopleList