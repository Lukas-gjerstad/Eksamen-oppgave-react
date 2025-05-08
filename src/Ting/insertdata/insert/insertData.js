import "./insertData.css"
import InsertDataButton from "./insertDataButton"
import { useState, useEffect } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PickExercise from "../userInput/pickExercise";
import SessionTable from "../table/sessionTable"
import SubmitEntry from "../submit/submitEntry"
import SubmitExercise from "../submit/submitExercise";
import AddExercise from "../userInput/addExercise";

import "react-datepicker/dist/react-datepicker.css";

export default function InsertData({ TogglePage, setTogglePage, }) {
    const [Entries, setEntries] = useState([])
    const [Exercise, setExercises] = useState([])
    const [pickedExercise, setPickedExercise] = useState(null)
    const [exerciseArr, setExerciseArr] = useState([])
    const [entryArr, setEntryArr] = useState([])
    const [addExerciseToggle, setAddExerciseToggle] = useState(false)
    const [exerciseData, setExerciseData] = useState([])

    const [insertDate, setInsertDate] = useState(new Date())
    const [insertNewExercise, setInsertNewExercise] = useState("")
    const [insertWeight, setInsertWeight] = useState()
    const [insertReps, setInsertReps] = useState()

    const [sessionArr, setSessionArr] = useState([])

    console.log(exerciseArr)


    useEffect(() => {
        fetch("http://localhost:8081/")
        .then(res => res.json())
        .then(workoutEntries => {
            setEntries(workoutEntries.workoutEntries)
            setExercises(workoutEntries.exercise)
        })
        .catch(err => console.log(err))
    }, [])
    return(
    <div className="big"> 
            <div className="pageInsertDiv">
                <div className="insertDiv">
                    <InsertDataButton TogglePage={TogglePage} setTogglePage={setTogglePage}/>
                </div>

                <div className="textInput">
                    <div className="addEntryContainer">
                        <button className="addEntryBtn">Add Entry</button>
                    </div>
                    <ul className="entryList">
                        <li>
                        Select Session Date 
                            <div className="datePickerDiv">
                                <DatePicker className="datePicker" selected={insertDate} onChange={(date) => setInsertDate(date)} />
                            </div>
                        </li>
                        <li>
                            <div className="pickExerciseDiv">
                                <PickExercise 
                                Exercise={Exercise} 
                                pickedExercise={pickedExercise} 
                                setPickedExercise={setPickedExercise} 
                                insertWeight={insertWeight}
                                insertReps={insertReps}
                                addExerciseToggle={addExerciseToggle} 
                                setAddExerciseToggle={setAddExerciseToggle} 
                                exerciseData={exerciseData}
                                setExerciseData={setExerciseData}

                                />
                            </div>
                        </li>
                        <li>
                            Weight
                            <div className="weightInputDiv">
                                <label>
                                    <input 
                                    name="weightInput" 
                                    className="weightInput"
                                    value={insertWeight}
                                    onChange={e => setInsertWeight(e.target.value)}
                                    />
                                </label>
                            </div>
                        </li>
                        <li>
                            Reps
                            <div className="repsInputDiv">
                                <label>
                                    <input 
                                    name="repsInput" 
                                    className="repsInput"
                                    value={insertReps}
                                    onChange={e => setInsertReps(e.target.value)}
                                    />
                                </label>
                            </div>
                        </li>
                        <li>
                            <AddExercise 
                                setAddExerciseToggle={setAddExerciseToggle}
                                exerciseArr={exerciseArr} setExerciseArr={setExerciseArr} 
                                exerciseData={exerciseData} setExerciseData={setExerciseData}
                                pickedExercise={pickedExercise}
                                insertWeight={insertWeight} setInsertWeight={setInsertWeight}
                                insertReps={insertReps} setInsertReps={setInsertReps}
                                
                            />

                        </li>
                    </ul>
                </div>

                <div className="submitDiv">
                    <SubmitEntry
                    pickedExercise={pickedExercise} 
                    setPickedExercise={setPickedExercise}
                    insertDate={insertDate}  
                    setInsertDate={setInsertDate}
                    insertNewExercise={insertNewExercise} 
                    setInsertNewExercise={setInsertNewExercise}
                    insertWeight={insertWeight} insertReps={insertReps} 
                    setInsertWeight={setInsertWeight}
                    entryArr={entryArr} setEntryArr={setEntryArr}
                    sessionArr={sessionArr} setSessionArr={setSessionArr} 
                    exerciseArr={exerciseArr} setExerciseArr={setExerciseArr}
                    
                    />
                </div>

                <div className="tableDiv">
                    <SessionTable 
                    exerciseData = {exerciseData}
                    setExerciseData = {setExerciseData}
                    exerciseArr={exerciseArr}
                    />
                </div>
            </div>

            <div className="addExerciseDiv">
                <SubmitExercise insertNewExercise={insertNewExercise} setInsertNewExercise={setInsertNewExercise}/>
            </div>
        </div>
        )
}