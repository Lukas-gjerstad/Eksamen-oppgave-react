
export default function AddExercise(props) {
    const setAddExerciseToggle = props.setAddExerciseToggle

    const pickedExercise = props.pickedExercise
    const insertSets = props.insertSets
    const setInsertSets = props.setInsertSets
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
                name: pickedExercise.name,
                sets: [
                        {
                            weight: insertWeight,
                            reps: insertReps,   
                        }
                    ]
            }
            ])
            setInsertWeight("")
            setInsertReps("")
        } 

        return(
            <div>
                <button className="addExerciseBtn" onClick={pickedExercise && handleClick} id="addExercise">
                    Add Exercise
                </button>
            </div>
        )
    }