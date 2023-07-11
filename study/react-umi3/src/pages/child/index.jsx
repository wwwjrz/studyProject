import {memo} from 'react'

const Child = ({count,updateCount}) => {
  const show = () => console.log('child组件渲染')
  return(
    <>
      <h3>Child组件</h3>
      <div>{show()}</div>
      <div>{count}</div>
      <button onClick={updateCount}>按钮</button>
    </>
  )
}

export default memo(Child)