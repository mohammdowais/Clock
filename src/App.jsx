import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const initialBreak = 5, initialSession = 25;
    const [sessionTime,setSessionTime] = useState(initialSession)
    const [breakTime,setBreakTime] = useState(initialBreak)
    const [minutes,setMinutes] = useState(initialSession)
    const [seconds,setSeconds] = useState(0)
    const [play,setPlay] = useState(false)
    const [session,setSession] = useState(true)

    const beepUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav'

    
    const audio = document.getElementById('beep')
    useEffect(() => { 
      let interval 
      if (play) {
        interval = setInterval(() => {
          if (seconds === 0) {
            if (minutes === 0) {
              clearInterval(interval);
              audio.currentTime=0
              audio.play()
              console.log('hello')
              setMinutes(breakTime)
              setSession(prev=>!prev)

            } else {
              setMinutes((prev) => prev - 1);
              setSeconds(59);
            }
          } else {
            setSeconds((prev) => prev - 1);
          }
        }, 1000);
      } 
  
      return () => clearInterval(interval);
    }, [play, minutes, seconds]);
    
    function updateSession(c){
      if(!play){
        setSessionTime((p) =>{
          const t = (p + c === 0)||(p+c === 61)? p: p +c
          if(session)
            setMinutes(t)
          return t
        })
      } 
    }
    function updateBreak(c){
      if(!play){
        setBreakTime((p) =>{
          const t = (p + c === 0)||(p+c === 61)? p: p +c
          if(!session)
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
      setPlay(false)
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
        <div id='time-left'>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</div>
      </div>
      <button id='start_stop' onClick={_=>setPlay(prev=>prev?false:true)}>{play?'pause':'play'}</button>
      <button id='reset'  onClick={handleReset}>Reset</button>
    </>
  )

  
}


export default App
