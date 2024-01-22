import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const initialBreak = 5, initialSession = 25;
    const beepUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav'
    const [sessionTime,setSessionTime] = useState(initialSession)
    const [breakTime,setBreakTime] = useState(initialBreak)
    const [minutes,setMinutes] = useState(initialSession)
    const [seconds,setSeconds] = useState(0)
    const [play,setPlay] = useState(false)
    const [session,setSession] = useState(true)
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
          <div className='title'>25 + 5 clock</div>

          {/* settings */}
          <div className='settings-top'>          
            <div className='session'>
              <div id='session-label'>
                  Session Length
              </div>
              <div>
                <div onClick={_=>updateSession(+1,true)} id='session-increment' className='pointer'>&#9650;</div>
                  <div id='session-length'>
                    {sessionTime}
                  </div>              
                <div onClick={_=>updateSession(-1,true)} id='session-decrement' className='pointer'>&#9660;</div>
              </div>            
            </div>

            <div className='break'>
              <div id='break-label'>
                  Break Length
              </div>
              <div>
                <div onClick={_=>updateBreak(+1,false)} id='break-increment' className='pointer'>&#9650;</div>
                  <div id='break-length'>
                    {breakTime}
                  </div>                
                <div onClick={_=>updateBreak(-1,false)} id='break-decrement' className='pointer'>&#9660;</div>
              </div>
            </div>
          </div>
        
        <div className='display' style={{color:session?'green':'red',border: `1px solid ${session?'green':'red'}`}}>
          <div id='timer-label' >{session?'Session':'Break'}</div>
          <audio id="beep" src={beepUrl}/>
          <div id='time-left'>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</div>
        </div>

        <div className='bottom-settings'>
          <div id='start_stop' onClick={_=>setPlay(prev=>prev?false:true)}>{play?'||':<>&#9654;</>}</div>
          <div id='reset'  onClick={handleReset}>Reset</div>
        </div>
      </div>
    </>
  )

  
}


export default App
