import { useEffect } from 'react'
import './App.css'
import useCountdown from './useCountdown'

function App() {
  const session = useCountdown(25)
  const rest  = useCountdown(5)

  return (
    <>
      <div>{session.minutes}:{session.seconds}</div>
      <Settings obj={session}/>
    </>
  )
}

const Settings = ({obj})=>{
  
  return (
    <div>
        <button onClick={_=>obj.updateTime(+1,'m')}>up minute</button>
        <button onClick={_=>obj.updateTime(-1,'m')}>down minute</button>
        <button onClick={_=>obj.updateTime(+1,'s')}>up Second</button>
        <button onClick={_=>obj.updateTime(-1,'s')}>down Second</button>
        <button onClick={_=>obj.setStart(prev=>prev?false:true)}>{obj.start?"Stop":"Start"}</button>
      </div>
  )
}

export default App
