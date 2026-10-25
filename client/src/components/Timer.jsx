import React from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Timer({ timeLeft, totalTime }) {
    const percentage = totalTime ? (timeLeft / totalTime) * 100 : 0;
    const isUrgent = timeLeft <= 10;

    return (
        <div className='w-20 h-20 sm:w-24 sm:h-24'>
            <CircularProgressbar
                value={percentage}
                text={`${timeLeft}s`}
                styles={buildStyles({
                    textSize: "24px",
                    pathColor: isUrgent ? "#f43f5e" : "#10b981",
                    textColor: isUrgent ? "#f43f5e" : "#ffffff",
                    trailColor: "rgba(255, 255, 255, 0.08)",
                    pathTransitionDuration: 0.5,
                })}
            />
        </div>
    )
}

export default Timer
