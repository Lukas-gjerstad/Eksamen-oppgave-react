import "./submitEntry.css"

export default function SubmitEntry(props) {
    const insertDate = props.insertDate
    const insertTitle = props.insertTitle
    const description = props.description
    const exerciseArr = props.exerciseArr
    const setExerciseArr = props.setExerciseArr

    const insertSession = async () => {
        console.log("Submitting:", exerciseArr)
        try {
            const response = await fetch("http://localhost:8080/insertEntry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    date: insertDate,
                    title: insertTitle,
                    description: description,
                    fullEntryArr: exerciseArr,
                })
            });
        
            const data = await response.json() // reads json response from server 
        
            if (!response.ok) {
                // shows error message from server
                throw new Error(data.error || "Failed to add session")
            }
    
            console.log("Success:", data.message)
            alert("Ze entry was added a sucsessfollay")
            setExerciseArr([])
        } catch (error) {
            console.error("Error:", error.message)
        }
    }

    return(
        <div>
            <button className="submitBtn" id="submitEntry" onClick={insertSession}>Submit</button>
        </div>
    )
}