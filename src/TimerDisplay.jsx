import React, { useContext, useEffect, useRef, useState } from 'react'
import { CircularProgressbar, buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './App.css'
import PlayButton from './assets/icons/PlayButton';
import PauseButton from './assets/icons/PauseButton';
import ResetButton from './assets/icons/ResetButton';
import EditButton from './assets/icons/EditButton';
import TimeMenuContext from './TimeMenuContext';
import BackgroundImage from './assets/border-background.jpg';

export const TimerDisplay = () => {
  const TimeMenuInfo = useContext(TimeMenuContext);

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState('work');
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftR = useRef(secondsLeft);
  const isPausedR = useRef(isPaused);
  const modeR = useRef(mode);

  function tick() {
    secondsLeftR.current--;
    setSecondsLeft(secondsLeftR.current)
  }

  useEffect(() => {

    function switchMode() {
      const nextMode = modeR.current === 'work' ? 'break' : 'work';
      const nextSeconds = (nextMode === 'work' ? TimeMenuInfo.workTime : TimeMenuInfo.breakTime) * 60;
      setMode(nextMode);
      modeR.current = nextMode;
      setSecondsLeft(nextSeconds);
      secondsLeftR.current = nextSeconds;
    }

    secondsLeftR.current = TimeMenuInfo.workTime * 60;
    setSecondsLeft(secondsLeftR.current);
    
    const interval = setInterval(() => {
      if (isPausedR.current) {
        return;
      }
      if (secondsLeftR.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [TimeMenuInfo]);

  const totalSeconds = mode === 'work' ? TimeMenuInfo.workTime * 60 : TimeMenuInfo.breakTime * 60;
  const percentage = Math.round(secondsLeft / totalSeconds * 100);

  const minutes = Math.floor(secondsLeft/60);
  let seconds = secondsLeft % 60;
  if(seconds < 10) {
    seconds = '0' + seconds;
  }

  const handleReset = () => {
    setIsPaused(true);
    isPausedR.current = true;
    setSecondsLeft(TimeMenuInfo.workTime * 60);
    secondsLeftR.current = TimeMenuInfo.workTime * 60;
  }

  return (
    <main>
      <div className='timerDisplay'>
        <CircularProgressbar
          value={percentage}
          text={minutes + ':' + seconds}
          styles={buildStyles({
            pathColor:mode === 'work' ? 'orange': 'green',
            textColor: 'white',
          })}
        />

        <div className='button'>
          {isPaused ? <PlayButton id="play" onClick={() =>{setIsPaused(false); isPausedR.current = false;}}/> : <PauseButton id="pause" onClick={() =>{setIsPaused(true); isPausedR.current = true;}}/>}
          <ResetButton id='reset' onClick={handleReset}/>
        </div>
      </div>
      <div>
        <EditButton id="edit" onClick={() => TimeMenuInfo.setShowTimeMenu(true)} />
      </div>
    </main>
  )
}
