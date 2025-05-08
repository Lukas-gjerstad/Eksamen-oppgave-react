
export default function AddExercise(props) {
    const setAddExerciseToggle = props.setAddExerciseToggle

    const pickedExercise = props.pickedExercise
    const insertWeight = props.insertWeight
    const insertReps = props.insertReps

    const setInsertReps =  props.setInsertReps
    const setInsertWeight =  props.setInsertWeight

    const setExerciseArr = props.setExerciseArr 

    const handleClick = () => {
        setAddExerciseToggle(false)

        // change to pickedExercise.exerciseID later
        setExerciseArr(prev => [
            ...prev, 
            {
                exercise: pickedExercise.exerciseID,
                weight: insertWeight,
                reps: insertReps,
            }
        ])
        setInsertWeight("")
        setInsertReps("")
    } 

    return(
        <div>
            <button className="addExerciseBtn" onClick={handleClick}>
                Add Exercise
            </button>
        </div>
    )
}