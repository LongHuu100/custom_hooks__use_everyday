/* 
----- Code nguyên bản ----
function UseUpdateEffectDemo() {
  const [count, setCount] = React.useState(0)
  React.useEffect(() => {
    console.log('count changed', count)
  }, [ count ])
  return (
    <div>
      count: {count}
      <button onClick={() => setCount(count + 1)}>change</button>
    </div>
  )
}
*/

const useUpdateEffect = function (effectCallback, deps = [])  {
  const isFirstMount = React.useRef(false)
  
  React.useEffect(() => {
    return () => {
      isFirstMount.current = false
    }
  }, [])
  
  React.useEffect(() => {
    // Không thực thi code cho lần đầu tiên watch
    if (!isFirstMount.current) {
      isFirstMount.current = true
    } else {
      return effectCallback()
    }
  }, deps)
}

function UseUpdateEffectDemo() {
  const [count, setCount] = React.useState(0)
  
  useUpdateEffect(() => {
    console.log('Count changed', count)
  }, [ count ])
  
  return (
    <div>
      count: {count}
      <button onClick={() => setCount(count + 1)}>change</button>
    </div>
  )
}
