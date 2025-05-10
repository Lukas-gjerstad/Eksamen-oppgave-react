import Joyride from 'react-joyride';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Tour() {
  const location = useLocation();

  const stepsHome = [
    { target:"#selectExercise", content: "Select exercise to display on chart." },
    { target:"#selectReps", content:"Toggle reps on chart." },
    { target:"#selectWeight", content:"Toggle weight on chart." },
    { target:"#exerciseButton", content:"Select a previous workout session to show." },
    { target:"#insertPageButton", content:"Go here to add a workout session." },
  ]
  const stepsInsert = [
    { target:"#datePick", content:"Pick a date for the session you want to add." },
    { target:"#pickExercise", content:"Select an exercise to add to your workout entry." },
    { target:"#pickWeight", content:"Input the weight you used on the selected exercise." },
    { target:"#pickReps", content:"Input the amount of reps you did on the selected exercise." },
    { target:"#addExercise", content:"Click here to add the exercise to the entry." },
    { target:"#submitEntry", content:"Click here to submit the entry." },
    { target:"#entryTable", content:"You can view your entry here before you submit it." },
    { target:"#inputExercise", content:"You can add a new exercise here. Type the name of the exercise and click add." },
  ]

  const [stepIndex, setStepIndex] = useState(() => {
    const stored = localStorage.getItem('joyrideStep');
    return stored ? parseInt(stored) : 0;
  });

  const [run, setRun] = useState(false);

  const handleJoyrideCallback = ({ action, index, type, status }) => {
    if (type === "step:after" && action === "next") {
      const nextStep = index + 1;
      setStepIndex(nextStep);
      localStorage.setItem("joyrideStep", nextStep);
    }

    //stanser joyride hvis den er finished eller hvis bruker skipper
    if (status === "finished" || status === "skipped") {
      localStorage.removeItem("joyrideStep");
      setRun(false);
    }
  };

  return (
    <div className='JoyrideDiv'>
        <button onClick={() => {
          setStepIndex(0);
          localStorage.setItem("joyrideStep", 0);
          setRun(true);
        }}>
          Start Tour
        </button>

      <Joyride 
        steps={location.pathname === "/" ? stepsHome : stepsInsert}
        run={run}
        stepIndex={stepIndex}
        continuous={true}
        showSkipButton={true}
        callback={handleJoyrideCallback}
        scrollToFirstStep
        styles={{
          options: {
            arrowColor: 'rgba(64, 64, 64)',
            backgroundColor: 'rgba(64, 64, 64)',
            overlayColor: 'rgba(64, 64, 64, 0.5)',
            primaryColor: '#999',
            textColor: '#000',
            width: 300,
            zIndex: 1000,
          }
        }}
      />
    </div>
  );
}
