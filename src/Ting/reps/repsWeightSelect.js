import { useState, } from "react";
import "./repsWeightSelect.css"

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: {"aria-label": "Checkbox demo"}}

export default function RepsWeightSelect(props) {
    let selectedReps = props.selectedReps
    let setSelectedReps = props.setSelectedReps
    let selectedWeight = props.selectedWeight
    let setSelectedWeight = props.setSelectedWeight
    let handleClickReps = props.handleClickReps
    let handleClickWeight = props.handleClickWeight

    return(
        <div className="RepsWeightSelect">
            <div className="SelectRepsDiv">
                <label htmlFor="selectReps">Show Reps</label>
                <input 
                type="checkbox"
                id="selectReps"
                checked={selectedReps}
                onChange={handleClickReps}
            />
           </div>
           
           <div className="selectWeightDiv">
            <label htmlFor="selectWeight">Show Weight</label>
            <input 
                type="checkbox"
                id="selectWeight"
                checked={selectedWeight}
                onChange={handleClickWeight}
           />
           </div>
        </div>
    )
}
