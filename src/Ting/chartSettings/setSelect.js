import React from 'react'

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function SetSelect({selectSets, setSelectSets}) {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
    // setter anchorEl til button som ble clicked
    setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
    setAnchorEl(null)
    }

    const sets = [1,2,3]
 
    return (
        <div className='setSelect'>
            <Button
                sx={{
                    color: "lightblue", 
                    background: "#292929",
                    textTransform: "none",
                }}
                id="selectSet"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                {"Set " + selectSets }
        </Button>
        <Menu
            id="setMenu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            // setter label til elementer med id exerciseButton
            MenuListProps={{
            "aria-labelledby": "sessionButton"
            }}
            >
            {
                sets.map((se, index) => {
                return(
                    <div>
                    <MenuItem 
                        sx={{
                        color: "lightblue", 
                        background: "#414141",
                        }}
                        key = {index} 
                        onClick={() => {
                        setSelectSets(se)
                        handleClose()
                    }}>
                    {se}
                    </MenuItem>
                </div>
                )
                })
            }
            </Menu>
        </div>
    )
}
