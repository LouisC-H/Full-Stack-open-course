const Filter = ({value, filterStateHandler}) => {
  return(
    <div>          
    name: <input 
    value={value}
    onChange={filterStateHandler}
    />
  </div>
  )
}

export default Filter