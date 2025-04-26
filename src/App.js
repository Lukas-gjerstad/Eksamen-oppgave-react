import './App.css'
import { useState, useEffect } from 'react';

import LineChartComponent from "./Ting/lineChart.js"
import DataTable from "./Ting/data/dataTable.js";
import DropdownExercise from './Ting/dropdownExercise.js';
import RepsWeightSelect from './Ting/reps/repsWeightSelect.js';

function App() {
    const [workoutEntries, setworkoutEntries] = useState([])
    const [exercises, setExercises] = useState([])
    const [session, setSession] = useState([])
    const [selectedExercise, setSelectedExercise] = useState(null)
    const [selectedReps, setSelectedReps] = useState([true])
    const [selectedWeight, setSelectedWeight] = useState([true])

    useEffect(() => {
        fetch("http://localhost:8081/")
        .then(res => res.json())
        .then(workoutEntries => {
            // sets workoutEntries to have the value of workoutEntries
            setworkoutEntries(workoutEntries.workoutEntries)
            setExercises(workoutEntries.exercise)
            setSession(workoutEntries.session)
        })
        .catch(err => console.log(err))
    }, [])
    const handleClickReps = (() => {
      setSelectedReps(!selectedReps)
    })
    const handleClickWeight = (() => {
        setSelectedWeight(!selectedWeight)
    })

    useEffect(() => {
      console.log("App test også PLSS: ", selectedExercise)
  }, [selectedExercise])
  return(
    <div>
      <DropdownExercise 
      workoutEntries={workoutEntries} 
      exercises={exercises} 
      session={session} 
      selectedExercise={selectedExercise} 
      setSelectedExercise={setSelectedExercise}
      />
      <DataTable 
      workoutEntries={workoutEntries} 
      exercises={exercises} 
      session={session}
      />
      <RepsWeightSelect 
      selectedReps={selectedReps} 
      setSelectedReps={setSelectedReps} 
      selectedWeight={selectedWeight} 
      setSelectedWeight={setSelectedWeight} 
      handleClickReps={handleClickReps} 
      handleClickWeight={handleClickWeight}
      />
      <LineChartComponent 
      workoutEntries={workoutEntries} 
      exercises={exercises} 
      session={session}
      selectedReps={selectedReps}
      selectedWeight={selectedWeight}
      selectedExercise={selectedExercise}
      onSelectExercise={(exercise) => setSelectedExercise(exercise)}

      /> 
    </div>
  )
        
}

export default App;
