import "./insertDataButton.css"
import { useNavigate, useLocation } from "react-router-dom"
import { useState } from "react";

export default function InsertDataButton({ TogglePage, setTogglePage }) {
    const navigate = useNavigate()
    const location = useLocation()

    const HandleClick = () => {
        if (location.pathname === "/") {
            navigate("/insert")
        } else {
            navigate("/")
        }
    }

    return(
        <div className="btnContainer">
            <button onClick={HandleClick} id="insertPageButton">
                {location.pathname === "/" ? "Insert" : "Home"}
            </button>
        </div>
    )
}