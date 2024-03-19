import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './Home.styles.css';
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function Login () {

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-60 bg-white rounded p-3">
                <div className="btn-group">
                    <Link to="/customerHome" className='btn btn-secondary rounded-end'> Customer Homepage</Link>
                    <Link to="/employeeHome" className='btn btn-secondary rounded-start'> Restaurant Homepage</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;