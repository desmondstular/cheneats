import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import './login.styles.css';
import {ThemeContext} from "../.store/ThemeContext.jsx";
import Cookies from 'js-cookie';

function Login () {
	const {setCustomerID, customerID, setRestaurantID, restaurantID, employeeID, setEmployeeID} = useContext(ThemeContext);
	const navigate = useNavigate();
	const [error, setError] = useState(false);
	const [loginValue, setLoginValue] = useState('');

	// Axios get URLS
	const customerURL = "http://localhost:8000/customer/byemail";
	const staffURL = "http://localhost:8000/staff/byemail";

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

	/**
	 * Handles login button click and directs either
	 * to customer or employee side.
	 */
	const onClickLogin = () => {
		const getStaff = async () => {
			try {
				const {data} = await axios.get(staffURL, {params: {email: loginValue}});
				if (data.length !== 0) {
					setEmployeeID(data[0]._id);
					setRestaurantID(data[0].restaurant_ref);
					Cookies.set('restaurantID', data[0].restaurant_ref);
					Cookies.set('employeeID', data[0]._id);
					navigate('/employeeHome', {replace: true});
				}
			} catch (e) {
				console.log(e);
			}
		}
		const getCustomer = async () => {
			try {
				const {data} = await axios.get(customerURL, {params: {email: loginValue}});
				if (data.length !== 0) {
					Cookies.set('customerID', data[0]._id);
					setCustomerID(data[0]._id);
					navigate('/customerHome', {replace: true});
				}
				else {
					setError(true);
				}
			} catch (e) {
				console.log(e);
			}
		}
		getStaff();
		getCustomer();
	}

	/**
	 * Stores login input box as a state.
	 */
	const handleLoginChange = (e) => {
		const {value} = e.target;
		setLoginValue(value);
	}

    return (
        <div className="flex flex-col vh-100 justify-content-center align-items-center">
			<img src="chen-transparent-cropped.png" alt="Chen logo" className='h-auto max-h-72'/>
			<p className='text-6xl text-gray-900 font-semibold mb-4'>ChenEats</p>
			<div className='card w-96 pt-8 pl-8 pr-8 pb-2'>
				<div>
					<label className="input input-bordered flex items-center gap-2">
						Email
						<input type="text" className="grow" placeholder="chen@site.com" onChange={handleLoginChange}/>
					</label>
					<div className='pt-2'>
						<button className='btn btn-info sm:btn-sm md:btn-md lg:btn-lg w-100 text-white'
								onClick={onClickLogin}>
							login
						</button>
					</div>
					<p className={error ? 'p-2 text-xs text-red-600' : 'invisible'}>Email does not exist.</p>
				</div>
			</div>
			<div className="w-72 bg-white rounded p-3 m-16">
				<p><i>Buttons only exist for developer mode</i></p>
				<div className="btn-group">
					<button className='btn btn-secondary rounded-end' onClick={onClickCustomer}> Customer Homepage
					</button>
					<button className='btn btn-secondary rounded-start' onClick={onClickRestaurant}> Restaurant
						Homepage
					</button>
				</div>
			</div>
		</div>
	)
}

export default Login;