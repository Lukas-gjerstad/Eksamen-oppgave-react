import './App.css'
import { useState, useEffect } from 'react';


import LineChartComponent from "./Ting/linechart/lineChart.js"
import DataTable from "./Ting/data/dataTable.js";
import DropdownExercise from './Ting/dropdown/dropdownExercise.js';
import RepsWeightSelect from './Ting/chartSettings/repsWeightSelect.js';
import InsertData from "./Ting/insertdata/insert/insertData.js"
import SetSelect from './Ting/chartSettings/setSelect.js';
import InsertDataButton from "./Ting/insertdata/insert/insertDataButton.js"
import SelectEntry from "./Ting/data/selectSession.js"

function App({ TogglePage, setTogglePage }) {
    const [workoutEntries, setworkoutEntries] = useState([])
    const [exercises, setExercises] = useState([])
    const [selectedExercise, setSelectedExercise] = useState(null)
    const [selectedReps, setSelectedReps] = useState([true])
    const [selectedWeight, setSelectedWeight] = useState([true])
    const [selectSets, setSelectSets] = useState([1])
    const [selectedEntry, setSelectedEntry] = useState(null)

    useEffect(() => {
        fetch("http://localhost:8080/")
        .then(res => res.json())
        .then(data => {
            setworkoutEntries(data.workoutEntries)
            setExercises(data.exercise)
            console.log(data)

            const benchpress = data.exercise.find(exercise => exercise.name === "benchpress")
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

  return(
    <div className='bigContainer'>
      <div className='DropdownSelectContainer'>
        <DropdownExercise  
          workoutEntries={workoutEntries}  
          exercises={exercises} 
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
          <div className='setSelectContainer'>
            <SetSelect
            selectSets={selectSets} setSelectSets={setSelectSets}
            />
          </div>
          

        </div>
        <div className='btnContainer'>
          <InsertDataButton 
          TogglePage={TogglePage} 
          setTogglePage={setTogglePage}
          workoutEntries={workoutEntries} 
          exercises={exercises} 
          />
        </div>
      </div>
      <div className='selectEntryDiv'>
        <SelectEntry 
           selectedEntry={selectedEntry} setSelectedEntry={setSelectedEntry}
          exercises={exercises} 
          workoutEntries={workoutEntries}
        />
      </div>
      <div className='DatatableLinechartContainer'>
        <div className="DataTableContainer">
          <DataTable 
            workoutEntries={workoutEntries} setworkoutEntries={setworkoutEntries}
            selectedEntry={selectedEntry} setSelectedEntry={setSelectedEntry}
            exercises={exercises} 
          />
        </div>
        <div className="LineChartContainer">
          <LineChartComponent 
            workoutEntries={workoutEntries} 
            exercises={exercises} 
            selectedReps={selectedReps}
            selectedWeight={selectedWeight}
            selectSets={selectSets}
            selectedExercise={selectedExercise}
            onSelectExercise={(exercise) => setSelectedExercise(exercise)}
          /> 
        </div>
      </div>
    </div>
  )
}

export default App;
