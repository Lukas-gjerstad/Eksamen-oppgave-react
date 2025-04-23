import './App.css'
import { useState, useEffect } from 'react';

import LineChartComponent from "./Ting/lineChart.js"
import DataTable from "./Ting/data/dataTable.js";
import DropdownExercise from './Ting/dropdownExercise.js';
import RepsWeightSelect from './Ting/reps/repsWeightSelect.js';

function App() {
    const [workoutData, setWorkoutData] = useState([])
    const [exercises, setExercises] = useState([])
    const [session, setSession] = useState([])
    const [selectedExercise, setSelectedExercise] = useState([])
    const [selectedReps, setSelectedReps] = useState([true])
    const [selectedWeight, setSelectedWeight] = useState([false])

    useEffect(() => {
        fetch("http://localhost:8081/")
        .then(res => res.json())
        .then(workoutData => {
            // sets workoutData to have the value of workoutEntries
            setWorkoutData(workoutData.workoutEntries)
            setExercises(workoutData.exercise)
            setSession(workoutData.session)
        })
        .catch(err => console.log(err))
    }, [])
    const handleClickReps = (() => {
      setSelectedReps("clicked")
    })
    const handleClickWeight = (() => {
        setSelectedWeight(!selectedWeight)
    })
  return(
    <div>
      <DropdownExercise workoutData={workoutData} exercises={exercises} session={session} selectedExercise={selectedExercise} setSelectedExercise={setSelectedExercise}/>
      <DataTable workoutData={workoutData} exercises={exercises} session={session}/>
      <RepsWeightSelect selectedReps={selectedReps} setSelectedReps={setSelectedReps} selectedWeight={selectedWeight} setSelectedWeight={setSelectedWeight} handleClickReps={handleClickReps} handleClickWeight={handleClickWeight}/>
      <LineChartComponent workoutData={workoutData} exercises={exercises} session={session}/>
    </div>
  )
        
}

export default App;
