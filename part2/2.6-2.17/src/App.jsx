import { useState, useEffect } from 'react'
import personService from './services/person'
import Notification from './components/Notification'
import Error from './components/Error'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
  const personsToShow = persons.filter(person =>
    person.name.includes(nameFilter)
  )

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(p => p.name === newName)

    if (existingPerson) {
      if (existingPerson.number !== newNumber) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        editPerson(existingPerson.id, updatedPerson)
      setNotificationMessage(`${newName} Number changed to ${newNumber}`)
      }
      
      else {
        setNotificationMessage(`${newName} already exists with the same number.`)
      }
    } 
    else {
      const newPerson = { name: newName, number: newNumber }
      personService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName("")
          setNewNumber("")
        })
      setNotificationMessage(`Added ${newName}`)
    }
    setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
    setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
  }

  const editPerson = (id, updatedPerson) => {
    const confirmUpdate = window.confirm(
      `${updatedPerson.name} already exists. Do you want to replace the old number with the new one?`
    )

    if (confirmUpdate) {
      personService.update(id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person =>
            person.id !== id ? person : returnedPerson
          ))
          setNewName("")
          setNewNumber("")
        })
        .catch(error => {
          setErrorMessage(`The person '${updatedPerson.name}' was already deleted from the server`)
          setPersons(persons.filter(p => p.id !== id))
        })
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const removePerson = (id) => {
    const personToRemove = persons.find(p => p.id === id)
    const confirm = window.confirm(`Delete ${personToRemove.name}?`)
    if (confirm){
      personService.remove(id).then( 
      setPersons(persons.filter(person => person.id !== id))
    )
    }
    setTimeout(() => {
      setNotificationMessage(null)
    }, 3000)
  }


  const handleNameChanges = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChanges = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChanges = (event) => {
    console.log(event.target.value)
    setNameFilter(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
      <Filter nameFilter = {nameFilter} handleFilterChanges = {handleFilterChanges}></Filter>

      <h3>add a new</h3>
      <PersonForm addPerson = {addPerson} newName = {newName} handleNameChanges = {handleNameChanges} newNumber = {newNumber} handleNumberChanges = {handleNumberChanges}></PersonForm>
      
      <h3>Numbers</h3>
      <Person personsToShow = {personsToShow} action = {removePerson}></Person>

    </div>
    
  )
}

const PersonForm = (props) =>{
  return (
    <form onSubmit={props.addPerson}>
        <div>
          name: <input 
          value = {props.newName}
          onChange={props.handleNameChanges}/>
        </div>
        <div>
          number: <input 
          value = {props.newNumber}
          onChange={props.handleNumberChanges}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Filter = ({nameFilter, handleFilterChanges}) =>{
  return <div>     
        filter shown with:<input
        value={nameFilter}
        onChange={handleFilterChanges}>
        </input>
  </div>
}

const Person = ({ personsToShow, action}) => {
  return (
    <ul>
      {personsToShow.map(person =>
        <li key={person.id}>{person.name} {person.number}
            <button onClick={() => action(person.id)}>eliminate</button>
        </li>
      )}

    </ul>
  );
}


export default App