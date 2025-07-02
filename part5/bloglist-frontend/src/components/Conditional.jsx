const Conditional = (props) => {
  
  // This component renders its children only if the boolean prop is true
  if (props.boolean) {
    return (
      <div>
        {props.children}
      </div>
    )
  }
}

export default Conditional