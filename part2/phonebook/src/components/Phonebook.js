
export const Phonebook = ({person, handleDelButton, key}) => { 
  const clickHandler = () => {
    handleDelButton(person);
  }




  return(
    <div>
      {person.name} {person.number} 
      <button value={person.name}  onClick={clickHandler}>delete</button>
    </div>
  )

  }