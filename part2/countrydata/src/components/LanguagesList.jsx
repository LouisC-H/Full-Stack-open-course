const LanguagesList= ({languages}) => {  
  
  const ulStyle= {
    listStyleType: 'disc'
  }
  
  return (
    <ul style={ulStyle}>
    {Object.entries(languages)
    .map(([key, language]) => 
      <li key={key}>{language}</li>
    )}
    </ul>
  )

}

export default LanguagesList