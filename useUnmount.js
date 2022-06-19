/*
Code này sẽ chạy khi component unMount tương đương componentDidMount trong class
----- Code nguyên bản -----
React.useEffect(() => {
  return () => {
    //Execute when component is Unmounted
  }
}, [])
*/

const useUnmount = (callback) => {
  const callbackRef = React.useRef(callback)
  callbackRef.current = callback
  React.useEffect(() => {
    return () => {
      callbackRef.current()
    }
  }, [])
}

const Child = () => {
  const [ count, setCount ] = useState(0)
  useUnmount(() => {
    console.log('useUnmount', count)
  })
  return (
    <div>
      count: {count}
      <button onClick={() => setCount(count + 1)}>add</button>
    </div>
  )
}

/* Sử dụng useUnmount trong Child */
const UseUnmountedDemo = () => {
  const [showChild, setShowChild] = React.useState(true);
  // We use "showChild" to control the display and hiding of the Child component
  return (
    <div>
      { !!showChild && <Child /> }
      <button onClick={() => setShowChild(false)}>Destroy child</button>
    </div>
  )
}
