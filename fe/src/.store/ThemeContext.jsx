/**
 * ThemeContext.jsx
 *
 * Contains state context.
 */
import {createContext, useEffect, useState} from "react";
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
	const [customerID, setCustomerID] = useState("");
	const [restaurantID, setRestaurantID] = useState("");
	const [employeeID, setEmployeeID] = useState("");


	useEffect(() => {
		const customerCookie = Cookies.get('customerID');
		const restaurantCookie = Cookies.get('restaurantID');
		const employeeCookie = Cookies.get('employeeID');

		if (restaurantID === '') {
			const restaurantCookie = Cookies.get('restaurantID');
			if (restaurantCookie !== undefined) {
				setRestaurantID(restaurantCookie);
			}
		}

		if (employeeID === '') {
			const employeeCookie = Cookies.get('employeeID');
			if (employeeCookie !== undefined) {
				setEmployeeID(employeeCookie);
			}
		}

		if (customerID === '') {
			const customerCookie = Cookies.get('customerID');
			if (customerCookie !== undefined) {
				setCustomerID(customerCookie);
			}
		}
	});

	return (
		<ThemeContext.Provider value={{ customerID, restaurantID, employeeID, setCustomerID, setRestaurantID, setEmployeeID }}>
			{children}
		</ThemeContext.Provider>
	);
};

