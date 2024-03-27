import React, { useState, useEffect } from 'react';
import './App.css';
import { TimerDisplay } from './TimerDisplay';
import TimerMenu from './TimerMenu';
import TimeMenuContext from './TimeMenuContext.jsx'

function App() {
  const [showTimeMenu, setShowTimeMenu] = useState(false);
  const [workTime, setWorkTime] = useState(40);
  const [breakTime, setBreakTime] = useState(20);

  return (
    <div>
      <TimeMenuContext.Provider value={{
        showTimeMenu,
        setShowTimeMenu,
        workTime,
        breakTime,
        setWorkTime,
        setBreakTime,
      }}>
        {showTimeMenu ? <TimerMenu /> : <TimerDisplay /> }
      </TimeMenuContext.Provider>
    </div>
  );
}

export default App;
