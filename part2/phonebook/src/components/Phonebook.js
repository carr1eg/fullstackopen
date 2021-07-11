
export const Phonebook = ({person, handleDelButton, key}) => { 
  return(
    <div>
      {person.name} {person.number} 
      <button value={person.name} data-mssg={person.id} onClick={handleDelButton}>delete</button>
    </div>
  )

  }