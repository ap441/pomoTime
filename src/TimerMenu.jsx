import { useContext } from 'react';
import './App.css'
import ReactSlider from 'react-slider'
import TimeMenuContext from './TimeMenuContext';
import BackButton from './assets/icons/BackButton';

function TimerMenu() {
    const TimeMenuInfo = useContext(TimeMenuContext);
    return (
        <main>
            <h1 id='header1'>Timer Menu</h1>

            <h2 id="wt">Work Timer: {TimeMenuInfo.workTime}:00</h2>
            <div className="slider1-div">
                <ReactSlider
                    className='slider'
                    thumbClassName='thumb'
                    trackClassName='track'
                    value={TimeMenuInfo.workTime}
                    onChange={newValue => TimeMenuInfo.setWorkTime(newValue)}
                    min={1}
                    max={120}
                />
            </div>

            <h2 id="bt">Break TImer: {TimeMenuInfo.breakTime}:00</h2>
            <div className="slider2-div">
                <ReactSlider
                    className='slider-break'
                    thumbClassName='thumb-break'
                    trackClassName='track-break'
                    value={TimeMenuInfo.breakTime}
                    onChange={newValue => TimeMenuInfo.setBreakTime(newValue)}
                    min={1}
                    max={120}
                />
            </div>
            <div className='back-btn'>
                <BackButton id="back" onClick={() => TimeMenuInfo.setShowTimeMenu(false)}/>
            </div>
        </main>
    );
}

export default TimerMenu