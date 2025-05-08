import { useState } from "react";

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from "react";

export default function PickExercise(props) {
  const Exercise = props.Exercise
  const pickedExercise = props.pickedExercise
  const insertWeight = props.insertWeight
  const insertReps = props.insertReps
  const setPickedExercise = props.setPickedExercise
  const exerciseArr = props.exerciseArr
  const setExerciseArr = props.setExerciseArr
  const addExerciseToggle = props.addExerciseToggle
  const setAddExerciseToggle = props.setAddExerciseToggle
  const exerciseData = props.exerciseData
  const setExerciseData = props.setExerciseData
  
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return(
    <div className="pickExerciseButton">
      <Button
      sx={{color: "lightblue", background: "#292929"}}
      id="exerciseButton"
      aria-controls={open ? "basic-menu" : undefined}
      aria-haspopup="true"
      aria-expanded={open ? "true" : undefined}
      onClick={handleClick}
      >
      { addExerciseToggle
        ? pickedExercise.name 
        : "Select Exercise" 
      }
      </Button>
      <Menu
      id="exerciseMenu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      // setter label til elementer med id exerciseButton
      MenuListProps={{
        "aria-labelledby": "exerciseButton"
      }}
      >
        {
          Exercise.map((exercise, index) => {
            return(
              <div>
                <MenuItem 
                  sx={{color: "lightblue", background: "#414141"}}
                  key = {index} 
                  onClick={() => {
                    setPickedExercise(exercise)
                    setAddExerciseToggle(true)
                    handleClose()
                }}>
                {exercise.name}
              </MenuItem>
            </div>
            )
          })
        }
      </Menu>
    </div>
  )
}