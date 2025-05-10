import "./selectEntry.css"
import {useState, setState} from "react"

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from "react";

export default function SelectEntry({selectedEntry, setSelectedEntry, session, setSession}) {

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
      sx={{
        color: "lightblue", 
        background: "#292929",
        textTransform: "none",
      }}
      
      id="exerciseButton"
      aria-controls={open ? "basic-menu" : undefined}
      aria-haspopup="true"
      aria-expanded={open ? "true" : undefined}
      onClick={handleClick}
      >
        Select Session
      </Button>
      <Menu
      id="exerciseMenu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      // setter label til elementer med id exerciseButton
      MenuListProps={{
        "aria-labelledby": "sessionButton"
      }}
      >
        {
          session.map((se, index) => {
            const fixedDate = new Date(se.date).toLocaleDateString("en-GB")
            return(
              <div>
                <MenuItem 
                  sx={{
                    color: "lightblue", 
                    background: "#414141",
                  }}
                  key = {index} 
                  onClick={() => {
                  setSelectedEntry(se.sessionID)
                  handleClose()
                }}>

                {fixedDate}
              </MenuItem>
            </div>
            )
          })
        }
      </Menu>
    </div>
  )
}