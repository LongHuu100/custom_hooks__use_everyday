/* 
---- Code nguyên bản ----
const [ person, setPerson ] = React.useState({
  name: 'fatfish',
  age: 100
})
// Modify name
setPerson({
  ...person,
  name: 'medium'
})
// Modify age
setPerson({
  ...person,
  age: 1000
})
*/

const useSetState = (initState) => {
  const [ state, setState ] = React.useState(initState)
  const setMergeState = (value) => {
    setState((prevValue) => {
      const newValue = typeof value === 'function' ? value(prevValue) : value
      return newValue ? { ...prevValue, ...newValue } : prevValue
    })
  }
  return [ state, setMergeState ]
}

function useSetStateDemo() {
  const [ person, setPerson ] = useSetState({
    name: 'fatfish',
    age: 100
  })
  
  // Change the value of person in the normal setting mode
  const onSetName = () => {
    setPerson({ name: 'medium' })
  }
  
  //Use the callback function to change the value of person
  const onSetAge = () => {
    setPerson(() => {
      return {
        age: 1000
      }
    })
  }
  
  return (
    <div>
      <p>name: { person.name }</p>
      <p>age: { person.age }</p>
      <button onClick={onSetName}>change name</button>
      <button onClick={onSetAge}>change age</button>
    </div>
  )
}
