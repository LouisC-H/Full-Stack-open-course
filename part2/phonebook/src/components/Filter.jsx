const Filter = ({value, filterStateHandler}) => {
  return(
    <div>          
    filter shown with: <input 
    value={value}
    onChange={filterStateHandler}
    />
  </div>
  )
}

export default Filter