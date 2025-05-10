import './App.css'
import { useState, useEffect } from 'react';


import LineChartComponent from "./Ting/linechart/lineChart.js"
import DataTable from "./Ting/data/dataTable.js";
import DropdownExercise from './Ting/dropdown/dropdownExercise.js';
import RepsWeightSelect from './Ting/reps/repsWeightSelect.js';
import InsertData from "./Ting/insertdata/insert/insertData.js"
import InsertDataButton from "./Ting/insertdata/insert/insertDataButton.js"
import SelectEntry from "./Ting/data/selectEntry.js"
import Tour from "./Ting/tour/tour.js"

function App({ TogglePage, setTogglePage }) {
    const [workoutEntries, setworkoutEntries] = useState([])
    const [exercises, setExercises] = useState([])
    const [session, setSession] = useState([])
    const [selectedExercise, setSelectedExercise] = useState(null)
    const [selectedReps, setSelectedReps] = useState([true])
    const [selectedWeight, setSelectedWeight] = useState([true])
    const [selectedEntry, setSelectedEntry] = useState(null)

    useEffect(() => {
        fetch("http://localhost:8081/")
        .then(res => res.json())
        .then(data => {
            // sets workoutEntries to have the value of workoutEntries
            setworkoutEntries(data.workoutEntries)
            setExercises(data.exercise)
            setSession(data.session)

            // setter selectedExercise til benchpress automatisk
            // er her fordi hvis ikke blir den satt til benchpress automatisk hver re render  
            const benchpress = data.exercise.find(exercise => exercise.name === "Benchpress")
              if (benchpress) {
                setSelectedExercise(benchpress)
              }
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
      <div className='DropdownSelectContainer'>
        <DropdownExercise 
          workoutEntries={workoutEntries} 
          exercises={exercises} 
          session={session} 
          selectedExercise={selectedExercise} 
          setSelectedExercise={setSelectedExercise}
        />
        <div className='SelectContainer'>
          <RepsWeightSelect 
            selectedReps={selectedReps} 
            setSelectedReps={setSelectedReps} 
            selectedWeight={selectedWeight} 
            setSelectedWeight={setSelectedWeight} 
            handleClickReps={handleClickReps} 
            handleClickWeight={handleClickWeight}
          />
        </div>
        <div className='btnContainer'>
          <InsertDataButton 
          TogglePage={TogglePage} 
          setTogglePage={setTogglePage}
          workoutEntries={workoutEntries} 
          exercises={exercises} 
          session={session} 
          />
        </div>
      </div>
      <div className='selectEntryDiv'>
        <SelectEntry 
          selectedEntry={selectedEntry} setSelectedEntry={setSelectedEntry}
          session={session} setSession={setSession}
          exercises={exercises} 
        />
      </div>
      <div className='DatatableLinechartContainer'>
        <div className="DataTableContainer">
          <DataTable 
            workoutEntries={workoutEntries} setworkoutEntries={setworkoutEntries}
            selectedEntry={selectedEntry} setSelectedEntry={setSelectedEntry}
            exercises={exercises} 
            session={session}
          />
        </div>

        <div className="LineChartContainer">
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
      </div>
      <Tour />
    </div>
  )
        
}

export default App;
