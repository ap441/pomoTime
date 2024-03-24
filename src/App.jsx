import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [timer, setTimer] = useState(600);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          clearInterval(interval);
          alert("askjfdgasjfsadf");
          return 0;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function updateTimerDisplay(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    return `${minutes}:${formattedSeconds}`;
  }

  return (
    <div className='timer'>
      <span id='timer'>{updateTimerDisplay(timer)}</span>
    </div>
  );
}

export default App;
