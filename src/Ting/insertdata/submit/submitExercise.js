export default function SubmitExercise(props) {
    const insertNewExercise = props.insertNewExercise;
    const setInsertNewExercise = props.setInsertNewExercise;

    const handleClick = async () => {
        const formatExercise = insertNewExercise.trim()
        if (!formatExercise) return

        const capitalizedExercise = formatExercise.charAt(0).toUpperCase() + formatExercise.slice(1).toLowerCase()
    
        try {
            const response = await fetch("http://localhost:8081/addExercise", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: capitalizedExercise })
            });
    
            if (response.status === 409) {
                alert("Exercise already exists!");
                return;
            } else if (!response.ok) {
                throw new Error("Failed to add exercise");
            }
    
            const data = await response.json();
            console.log("Exercise added:", data);
    
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
            <button className="newExercise" onClick={handleClick}>
                Add
            </button>
        </div>
    );
}