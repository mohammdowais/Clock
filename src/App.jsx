import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const initialBreak = 5, initialSession = 25;
    const [sessionTime,setSessionTime] = useState(initialSession)
    const [breakTime,setBreakTime] = useState(initialBreak)
    const [minutes,setMinutes] = useState(initialSession)
    const [seconds,setSeconds] = useState(0)
    const [start,setStart] = useState(false)
    const [session,setSession] = useState(true)

    const beepUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav'
    
    useEffect(()=>{
      const timeout = setTimeout(()=>{
        

          const audio = document.getElementById('beep')
        if((!minutes && !seconds)){
          audio.currentTime=0
          audio.play()

          setSession(prev=>{
            const isSession = !prev
            isSession
            ? setMinutes(sessionTime)
            : setMinutes(breakTime)
            return isSession
          })
          
        } 
        if (start) {
          setSeconds((prev) => (prev === 0 ? 59  : prev - 1));
          setMinutes((prev) => (prev > 0 && seconds === 0 ? prev - 1 : prev));
        }   
  
      },1000)
  
      return ()=> clearTimeout(timeout)
    },[seconds,start])
    
    function updateSession(c){
      if(!start){
        setSessionTime((p) =>{
          const t = (p + c === 0)||(p+c === 61)? p: p +c
          setMinutes(t)
          return t
        })
      } 
    }
    function updateBreak(c){
      if(!start){
        setBreakTime((p) =>{
          const t = (p + c === 0)||(p+c === 61)? p: p +c
          setMinutes(t)
          return t
        })
      }
    }

    function handleReset(){
      const audio = document.getElementById('beep')
        audio.pause()
          audio.currentTime=0
      setSession(true)
      setBreakTime(initialBreak)
      setSessionTime(initialSession)
      setMinutes(initialSession)
      setSeconds(0)
      setStart(false)
    }
  return (
    <>
      <div className='container'>
        <div>25 + 5 clock</div>

        {/* settings */}
        <div className='settings'>
          <div className='session'>
            <div id='session-label'>
                Session Length
            </div>
            <div>
              <button onClick={_=>updateSession(+1,true)} id='session-increment'>up minute</button>
              <div id='session-length'>
                {sessionTime}
              </div>              
              <button onClick={_=>updateSession(-1,true)} id='session-decrement'>down minute</button>
            </div>
            
          </div>
          <div className='break'>
            <div id='break-label'>
                Break Length
            </div>
            <div>
              <button onClick={_=>updateBreak(+1,false)} id='break-increment'>up minute</button>
              <div id='break-length'>
                {breakTime}
              </div>                
              <button onClick={_=>updateBreak(-1,false)} id='break-decrement'>down minute</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div id='timer-label'>{session?'Session':'Break'}</div>
        <audio id="beep" src={beepUrl}/>
        <div id='time-left'>{minutes>9?minutes:`0${minutes}`}:{seconds>9?seconds:`0${seconds}`}</div>
      </div>
      <button id='start_stop' onClick={_=>setStart(prev=>prev?false:true)}>{start?'pause':'start'}</button>
      <button id='reset'  onClick={handleReset}>Reset</button>
    </>
  )

  
}


export default App
