import React from 'react';

export const PersonForm = ({addPerson, name, handleNumberChange, newNumber, handleNameChange}) => {
  
  return (  
       <form onSubmit={addPerson}>
        <div>
          name: <input value={name} onChange={handleNameChange} />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

  )
}

export default PersonForm