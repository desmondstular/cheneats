import React, {useContext, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './login.styles.css';
import {ThemeContext} from "../.store/ThemeContext.jsx";
import Cookies from 'js-cookie';

function Login () {
	const {setCustomerID, setRestaurantID} = useContext(ThemeContext);
	//setCustomerID('65f91081e75ba89099210852');
	//setRestaurantID('65f908e8e75ba89099210778');

	Cookies.set("customerID", "65f91081e75ba89099210852");

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center">
            <div className="w-60 bg-white rounded p-3">
                <div className="btn-group">
                    <Link to="/customerHome/65f91081e75ba89099210852" className='btn btn-secondary rounded-end'> Customer Homepage</Link>
                    <Link to="/employeeHome/65f908e8e75ba89099210778" className='btn btn-secondary rounded-start'> Restaurant Homepage</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;