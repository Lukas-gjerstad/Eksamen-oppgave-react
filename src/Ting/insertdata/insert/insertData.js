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
    const [insertSets, setInsertSets] = useState()
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
        <div>
        <div className="big"> 
        <div className="massive">
                <div className="pageInsertDiv">
                    <div className="insertDiv">
                        <InsertDataButton TogglePage={TogglePage} setTogglePage={setTogglePage}/>
                    </div>

                    <div className="textInput">
                        <ul className="entryList" id="entryList">
                            <li>
                            Select Session Date 
                                <div className="datePickerDiv" id="datePick">
                                    <DatePicker className="datePicker" selected={insertDate} onChange={(date) => setInsertDate(date)} />
                                </div>
                            </li>
                            <li>
                                <div className="pickExerciseDiv" id="pickExercise">
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
                                Sets
                                <div className="setsInputDiv">
                                    <label>
                                        <input 
                                        name="setsInput"
                                        className="setsInput"
                                        value={insertSets}
                                        onChange={e => setInsertSets(e.target.value)}
                                        />
                                    </label>
                                    
                                </div>
                            </li>
                            <li>
                                Weight
                                <div className="weightInputDiv" id="pickWeight">
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
                                <div className="repsInputDiv" id="pickReps">
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
                                <div >
                                    <AddExercise
                                        setAddExerciseToggle={setAddExerciseToggle}
                                        exerciseArr={exerciseArr} setExerciseArr={setExerciseArr} 
                                        exerciseData={exerciseData} setExerciseData={setExerciseData}
                                        pickedExercise={pickedExercise}
                                        insertSets={insertSets} setInsertSets={setInsertSets}
                                        insertWeight={insertWeight} setInsertWeight={setInsertWeight}
                                        insertReps={insertReps} setInsertReps={setInsertReps}
                                    />
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="submitDiv"> 
                        <SubmitEntry id="submitEntry"
                        pickedExercise={pickedExercise} setPickedExercise={setPickedExercise}
                        insertDate={insertDate}  setInsertDate={setInsertDate}
                        insertNewExercise={insertNewExercise} setInsertNewExercise={setInsertNewExercise}
                        insertSets={insertSets}
                        insertWeight={insertWeight}  setInsertWeight={setInsertWeight}
                        insertReps={insertReps}
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
                    <SubmitExercise 
                        id="submitExercise"
                        insertNewExercise={insertNewExercise} setInsertNewExercise={setInsertNewExercise}
                    />
                </div>
            </div>
            </div>
            </div>
        )
}