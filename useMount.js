/*
Code sẽ chạy khi component được mount lần đầu tiên, tương đương với componentDidMound của class.
--- Code nguyên bản -----
useEffect(() => {
  // fetch request...
}, [])
*/

/* Code mới */

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
