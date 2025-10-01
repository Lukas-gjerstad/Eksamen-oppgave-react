import { useEffect, useRef, useState } from "react";
import "./pickExercise.css"

export default function PickExerciseT({exercise, pickedExercise, setPickedExercise, addExerciseToggle, setAddExerciseToggle}) {
    const [query, setQuery] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    const inputRef = useRef(null)


    useEffect(() => {
        document.addEventListener("click", toggle)
        return () => document.removeEventListener("click", toggle)
    }, [])

    console.log("testing exercise say gex", exercise.name)
    
    const selectOption = (option) => {
        setQuery(() => "") 
        //set "name" to key value of exercises 
        setPickedExercise(option["name"])
        setIsOpen((isOpen) => !isOpen)
    }
 
    function toggle(e) {
        setIsOpen(e && e.target === inputRef.current)
        // event handler returns value to e containing what element is clicked
    }

    const getDisplayValue = () => {
        // choses order of what is displayed in input field
        // goes from top to bottom
        if (query) return query
        if (pickedExercise) return pickedExercise

        return ""
    }

    const filter = (exercise) => {
        return exercise.filter(
            //indexOf checks substring (query) is found in ex.name. if it is returns the index value (keeps the exercise)
            //benchpress.indexOf(press) = 5 > -1 (returns value benchpress) 

            (ex) => ex["name"].toLowerCase().indexOf(query.toLowerCase()) > -1
        )
    }

    return (
        <div className="dropdown">
            <div className="control">
                <div className="selected-value">
                    <input
                        //sets inputRef target to this input field so when input field clicks it runs toggle func
                        ref={inputRef}
                        type="text"
                        value={getDisplayValue()}
                        name="searchTerm"
                        onChange={(e) => {
                            setQuery(e.target.value)
                            setPickedExercise(null)
                        }}
                        //redundant because toggle invoked by eventhandler 
                        onClick={toggle}
                    />
                </div>
            <div className={`arrow ${isOpen ? "open" : ""}`}></div>
            </div>
            
            <div className={`options ${isOpen ? "open" : ""}`}>
                {filter(exercise).map((option, index) => {
                    return (
                        <div className="optionList"> 
                            <div
                                onClick={() => selectOption(option)}
                                className={`option ${
                                    option["name"] === pickedExercise ? "selected" : ""
                                }`}
                                key={`${"id"}-${index}`}
                            >
                                {option["name"]}
                            </div> 
                        </div>
                        )
                    })}
                </div>
            </div>
        )
    }