const Filter = ({value, filterStateHandler}) => {
  return(
    <div>          
    Find countries: <input 
    value={value}
    onChange={filterStateHandler}
    />
  </div>
  )
}

export default Filter