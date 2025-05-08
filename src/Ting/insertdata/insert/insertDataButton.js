import "./insertDataButton.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react";


export default function InsertDataButton({ TogglePage, setTogglePage }) {
    const navigate = useNavigate();

    const HandleClick = () => {
        setTogglePage(!TogglePage)
        TogglePage ? navigate("/insert") : navigate("/")
    }

    return(
        <div className="btnContainer">
            <button onClick={HandleClick}>
                {TogglePage ? "Insert" : "Home"}
            </button>
        </div>
    )
}