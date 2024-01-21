import { useEffect, useState } from 'react'

const useCountdown = (m) => {
    const [minutes, setMinutes] = useState(m)
    const [seconds,setSeconds] = useState(0)
    const [start,setStart] = useState(false)
    
    useEffect(()=>{
      const timeout = setTimeout(()=>{
        if(!minutes && !seconds){
          setStart(false)
          return
        }
        if (start) {
          setSeconds((prev) => (prev === 0 ? 59 : prev - 1));
          setMinutes((prev) => (prev > 0 && seconds === 0 ? prev - 1 : prev));
        }   
  
      },1000)
  
      return ()=> clearTimeout(timeout)
    },[seconds,start])
    
    function updateTime(change,valueToUpdate){
      if(valueToUpdate == 's' && ! start)
        setSeconds((prev) => (prev + change + 60) % 60)
      if(valueToUpdate == 'm' && !start)
        setMinutes((prev) => (prev + change + 60) % 60)
    }
  
  return {seconds,minutes,updateTime,setStart}
}

export default useCountdown