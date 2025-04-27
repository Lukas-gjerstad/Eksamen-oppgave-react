import "./dropdownExercise.css"
import {useState, setState} from "react"

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from "react";

import LineChartComponent from "./lineChart.js"

export default function DropdownExercise(props) {
  let exercises = props.exercises
  let selectedExercise = props.selectedExercise
  let setSelectedExercise = props.setSelectedExercise 

  // anchorEl er elementet som popupen er anchored til
  const [anchorEl, setAnchorEl] = React.useState(null)
  // open er boolean verdien til anchorEl 
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    // setter anchorEl til button som ble clicked
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return(
    <div className="ExerciseButton">
      <Button
      sx={{color: "lightblue", background: "#292929"}}
      id="exerciseButton"
      aria-controls={open ? "basic-menu" : undefined}
      aria-haspopup="true"
      aria-expanded={open ? "true" : undefined}
      onClick={handleClick}
      >
        Select Excerisse
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
          exercises.map((exercise, index) => {
            return(
              <div>
                <MenuItem 
                  sx={{color: "lightblue", background: "#414141"}}
                  key = {index} 
                  onClick={() => {
                  setSelectedExercise(exercise)
                  handleClose()
                }}>

                {/* exercise.name er det som blir vist i liste */}
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