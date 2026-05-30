import React from "react";
import "./style/Nav.css";
import logo from "../../assets/logo-lite.webp";
import { FaMapSigns } from "react-icons/fa";
export default function Nav() {
    return (
        <div className="nav">
            <div>
                <img className="logo" src={logo} alt="Logo" />
            </div>
            <div className="nav-button">
                <button>
                    <FaMapSigns /> 
                </button>
             
            </div>
        </div>
    )
}