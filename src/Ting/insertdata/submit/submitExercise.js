
export default function SubmitExercise(props) {
    const insertNewExercise = props.insertNewExercise;
    const setInsertNewExercise = props.setInsertNewExercise;

    const handleClick = async () => {
        const formatEx = insertNewExercise.trim();
        if (!formatEx) return;

        const splitEx = formatEx.split(" ")
        const capitalizeFirst = splitEx.map(
            word => word.charAt(0).toUpperCase() + word.slice(1)
        ) 
        const finishedEx = capitalizeFirst.join(" ") 
        console.log(finishedEx)
       

        try {
            const response = await fetch("http://localhost:8080/addExercise", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: finishedEx })
            });

            console.log("Response status:", response.status);

            if (response.status === 409) {
                alert("Exercise already exists!");
                return;
            } else if (!response.ok) {
                console.error("Failed response:", response);
                throw new Error("Failed to add exercise");
            }

            const data = await response.json();
            console.log("Exercise added:", data);

            alert("Exercise Added");
            setInsertNewExercise("");
        } catch (error) {
            console.error("Error adding exercise:", error);
            alert("Something went wrong");
        }
    };

    return (
        <div>
            Add New Exercise 
            <div className="exerciseInputDiv">
                <label>
                    <input 
                        name="exerciseInput" 
                        className="exerciseInput"
                        value={insertNewExercise}
                        onChange={e => setInsertNewExercise(e.target.value)}
                    />
                </label>
            </div>
            <button className="newExercise" onClick={handleClick} id="inputExercise">
                Add
            </button>
        </div>
    );
}