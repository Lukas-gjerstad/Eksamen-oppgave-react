import "./insertData.css"
import "../../../variables.css"
import InsertDataButton from "./insertDataButton"
import { useState, useEffect, useRef} from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SessionTable from "../table/sessionTable"
import SubmitEntry from "../submit/submitEntry"
import SubmitExercise from "../submit/submitExercise";
import AddSession from "../userInput/addSession";
import PickExercise from "../userInput/pickExercise";

import "react-datepicker/dist/react-datepicker.css";

export default function InsertData({ TogglePage, setTogglePage, }) {
    const [Entries, setEntries] = useState([])
    const [exercise, setExercises] = useState([])
    const [pickedExercise, setPickedExercise] = useState(null)
    const [exerciseArr, setExerciseArr] = useState([])
    const [addExerciseToggle, setAddExerciseToggle] = useState(false)
    const [exerciseData, setExerciseData] = useState([])

    const [insertDate, setInsertDate] = useState(new Date())
    const [insertNewExercise, setInsertNewExercise] = useState("")
    const [insertTitle, setInsertTitle] = useState("")
    const [insertWeight, setInsertWeight] = useState()
    const [insertReps, setInsertReps] = useState()
    const [insertNote, setInsertNote] = useState()
    const [description, setDescription] = useState()

    const  addExRef = useRef(null)

    useEffect(() => { 
        fetch("http://localhost:8080/")
        .then(res => res.json())
        .then(data => { 
            setEntries(data.workoutEntries)
            setExercises(data.exercise)
            console.log(data)
    })
        .catch(err => console.log(err))
    }, [])

    return(
        <div className="big"> 
            <div className="container">
                <h1 id="title">Insert Training Data</h1>
                    <div className="insertDiv">
                        <InsertDataButton TogglePage={TogglePage} setTogglePage={setTogglePage}/>
                    </div>

                    <ul className="metadataList">
                        <li>
                        Select Session Date 
                            <div className="datePickerDiv" id="datePick">
                                <DatePicker className="datePicker" selected={insertDate} onChange={(date) => setInsertDate(date)} />
                            </div>
                        </li>
                        <li>
                            Title
                            <div className="titleInputDiv">
                                <label>
                                    <input 
                                    name="titleInput" 
                                    className="titleInput"
                                    value={insertTitle}
                                    onChange={e => setInsertTitle(e.target.value)}
                                    />
                                </label>
                            </div>
                        </li>
                        <li>
                            Description
                            <div>
                                <label>
                                    <input 
                                    name="descriptionInput" 
                                    className="descriptionInput"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    />
                                </label>
                            </div>
                        </li>
                    </ul>

                    <div className="mainContent">
                        <div className="contentRow">
                            <div className="textInput">
                                <ul id="insertLi">
                                    <li>
                                        Pick Exercise
                                        <div className="pickExerciseDiv" id="pickExercise">
                                            <PickExercise 
                                                exercise={exercise} 
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
                                        Note
                                        <div className="noteInput">
                                            <label>
                                                <input                             
                                                name="noteInput"
                                                className="noteInput"
                                                value={insertNote} onChange={e => setInsertNote(e.target.value)}
                                                /> </label>
                                        </div>
                                    </li>
                                    <li> 
                                        <div >
                                            <AddSession
                                                setAddExerciseToggle={setAddExerciseToggle}
                                                exerciseArr={exerciseArr} setExerciseArr={setExerciseArr} 
                                                exerciseData={exerciseData} setExerciseData={setExerciseData}
                                                pickedExercise={pickedExercise}
                                                insertWeight={insertWeight} setInsertWeight={setInsertWeight}
                                                insertReps={insertReps} setInsertReps={setInsertReps}
                                                insertNote={insertNote} setInsertNote={setInsertNote}
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="submitTable">
                                <div className="tableDiv">
                                    <SessionTable 
                                        exerciseData = {exerciseData}
                                        setExerciseData = {setExerciseData}
                                        exerciseArr={exerciseArr}
                                    />
                                </div>
                                
                            </div>
                        </div>
                    <div className="submitExDiv">
                        <SubmitExercise
                            id="submitExercise"
                            insertNewExercise={insertNewExercise} setInsertNewExercise={setInsertNewExercise}
                            ref={addExRef}
                        />
                        <div className="submitDiv"> 
                            <SubmitEntry id="submitEntry"
                                insertDate={insertDate}  setInsertDate={setInsertDate}
                                insertTitle={insertTitle}
                                description={description}
                                exerciseArr={exerciseArr} setExerciseArr={setExerciseArr}
                            />
                        </div>
                    </div>
                </div>
            </div>
    </div>
    )
}
