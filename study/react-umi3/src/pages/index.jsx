import { useCallback, useMemo,useState } from 'react';
import styles from './index.less';
import{Button}from 'antd'
import { Button as V2Button } from 'antd-mobile-v2' //
import { Button as V5Button } from 'antd-mobile' //
import Child from './child'

import user from '../assets/images/test1.jpeg'

export default function IndexPage() {
  const [count,setCount] = useState(0)
  const [value,setValue] = useState('')

  const updateCount = useCallback(()=>console.log('父级组件的业务'),[count])

  // function getNum(){
  //   console.log('getNum',count)
  //   return count * 100
  // }

  // const getNumMemo = useMemo(()=>{
  //   console.log('getNum');
  //   return count * 100
  // },[count])
  return (
    <>
    <div>
      {/* <h1 className={styles.title}>Page index1</h1>
      <div>{count}</div>
      <Button type='primary' onClick={()=>{setCount(count+1)}}>主要按钮</Button>
      <V2Button type='primary' size='small' inline>V2</V2Button>
      <V5Button color='primary' size='small'>V5</V5Button> */}
      {/* <h3>写死</h3>
      <img src={user} alt=""width="100" />
      <img src={require('../assets/images/test1.jpeg')} alt=""width="100" />
      <h3>动态图片</h3>
      {/* 推荐图片丢到服务器 */}

      {/* 指向临时的public目录 */}
      {/* <img src="/img/test1.jpeg" width="100" /> */}

      {/* <h3>样式内部使用</h3> */}
      {/* <div style={{height:200,width:200}} className={styles.test1}></div> */}
      {/* <h2>变量-全局</h2> */}
      {/* <div className="myLink">测试</div> */}
      {/* <h2>局部变量</h2>
      <div className={styles.header}>123</div>
      <h2>混合</h2>
      <div id={styles.a1}>A1</div>
      <div className={styles.a2}>A2</div>
      <h2>嵌套</h2>
      <div className={styles.nesting}>
        这是div
        <h3>这是H3</h3>
        <p>这是P </p>
      </div>

      <h2>:global</h2>
      <div className={styles.bars_right}>
        <button className='ant_btn'>按钮</button>
      </div> */}
      <h3 className={styles.title}>父组件</h3>
      {/* <div>getNum:{getNumMemo}</div> */}
      <button onClick={()=>setCount(count + 1)}>+1</button>
      <input value={value} onChange={(ev)=>setValue(ev.target.value)} />
      <Child updateCount = {updateCount} count={count}></Child>
    </div>
    </>
  );
}
