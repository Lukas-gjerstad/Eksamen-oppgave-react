import { useState, useEffect } from "react"
export default function AddSession(props) {
    const setAddExerciseToggle = props.setAddExerciseToggle

    const pickedExercise = props.pickedExercise
    const insertWeight = props.insertWeight
    const insertReps = props.insertReps
    const setInsertReps =  props.setInsertReps
    const setInsertWeight =  props.setInsertWeight
    const insertNote = props.insertNote
    const setInsertNote = props.setInsertNote
    

    const setExerciseArr = props.setExerciseArr 

    const handleClick = () => {
        setAddExerciseToggle(false)

        // change to pickedExercise.exerciseID later
        setExerciseArr(prev => [
            ...prev, 
            {
                name: pickedExercise.name,
                sets: [
                        {
                            weight: insertWeight,
                            reps: insertReps,
                            ...(insertNote ? { insertNote } : {}) 
                        }
                    ]
            }
            ])
            setInsertReps("")
            setInsertNote("")
        } 
        useEffect(() => {
            const handleKeyDown = (e) => {
                if (e.key === "Enter") {
                    handleClick()
                }
        }

        // Attach to window or document (depending on use case)
        window.addEventListener("keydown", handleKeyDown)

        // Clean up on unmount
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [pickedExercise, insertWeight, insertReps, insertNote]) // deps used in handleClick

    return (
        <div>
            <button
                className="addExerciseBtn"
                onClick={pickedExercise && handleClick}
                id="addExercise"
            >
                Add Exercise
            </button>
        </div>
    )
}