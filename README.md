# custom_hooks__use_everyday
Một vài custom của hook react mà developer sử dụng mỗi ngày

Code sẽ chạy khi component được mount lần đầu tiên, tương đương với componentDidMound của class.
```
--- Code nguyên bản -----
useEffect(() => {
  // fetch request...
}, [])
```

/* Code mới */

```
const useMount = (callback) => {
  React.useEffect(callback, [])
}

const UseMountDemo = () => {
  const [count, setCount] = React.useState(0)
  /* Chúng ta không cần truyền vào một mảng rỗng */
  useMount(() => {
    console.log("useMount")
  })
  
  return (
    <div>
      count: { count }
      <button onClick={() => setCount(count++)}>add</button>
    </div>
  )
}

============ useSetState ======== \
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
```

Code này sẽ chạy khi component unMount tương đương componentDidMount trong class \
```
----- Code nguyên bản -----
React.useEffect(() => {
  return () => {
    //Execute when component is Unmounted
  }
}, [])
```

============ useUnmount ======== \
```
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
```

============ useUpdateEffect ======== \
/* 
Đôi khi chúng ta muốn code chỉ chạy khi state thay đổi mà không cần code chạy cho lần đầu tiên component được mount
thì chúng ta sử dụng cách code này để giải quyết vấn đề

```
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
```

```
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
```

