import "./submitEntry.css"

export default function SubmitEntry(props) {
    const insertDate = props.insertDate
    const insertWeight = props.insertWeight
    const insertReps = props.insertReps
    const pickedExercise = props.pickedExercise
    const entryArr = props.entryArr
    const setEntryArr = props.setEntryArr
    const exerciseArr = props.exerciseArr
    const setExerciseArr = props.setExerciseArr

    const insertSession = async () => {
            setEntryArr(prev => [...prev, exerciseArr]);
        const fullEntryArr = exerciseArr;
    
        try {
            const response = await fetch("http://localhost:8081/insertEntry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    date: insertDate,
                    fullEntryArr: fullEntryArr,
                }) 
            });
    
            const data = await response.json(); // reads json response from server 
    
            if (!response.ok) {
                // shows error message from server
                throw new Error(data.error || "Failed to add session");
            }
    
            console.log("Success:", data.message);
            alert("Entry added successfully")
            setEntryArr([])
            setExerciseArr([])
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    return(
        <div>
            <button className="submitBtn" id="submitEntry" onClick={insertSession}>Submit</button>
        </div>
    )
}