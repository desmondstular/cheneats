import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import './login.styles.css';
import {ThemeContext} from "../.store/ThemeContext.jsx";
import Cookies from 'js-cookie';

function Login () {
	const {setCustomerID, customerID, setRestaurantID, restaurantID, employeeID, setEmployeeID} = useContext(ThemeContext);
	const navigate = useNavigate();

	// Route to customer dashboard if customer cookie exists
	if (Cookies.get('customerID') !== undefined) {
		navigate('/customerHome', {replace: true});
	}

	// Route to employee dashboard if employee and restaurant exists
	if (Cookies.get('restaurantID') !== undefined && employeeID !== undefined) {
		navigate('/employeeHome', {replace: true});
	}
	else {
		Cookies.remove('employeeID');
		Cookies.remove('restaurantID');
	}

	const onClickCustomer = () => {
		setCustomerID('65f91081e75ba89099210852');
		Cookies.set('customerID', '65f91081e75ba89099210852');
		navigate('/customerHome', {replace: true});
	}


	const onClickRestaurant = () => {
		setRestaurantID('65f908e8e75ba89099210778');
		setEmployeeID('');
		Cookies.set('restaurantID', '65f908e8e75ba89099210778');
		Cookies.set('employeeID', '');
		navigate('/employeeHome', {replace: true});
	}

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center">
            <div className="w-60 bg-white rounded p-3">
                <div className="btn-group">
                    <button className='btn btn-secondary rounded-end' onClick={onClickCustomer}> Customer Homepage</button>
                    <button className='btn btn-secondary rounded-start' onClick={onClickRestaurant}> Restaurant Homepage</button>
                </div>
            </div>
        </div>
    )
}

export default Login;