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

		// If customer cookie exists, set customerID
		if (customerCookie !== undefined) {
			setCustomerID(customerCookie);
		}

		// If restaurant cookie exists, set restaurantID
		if (restaurantCookie !== undefined) {
			setRestaurantID(customerCookie);
		}

		// If employee cookie exists, set employeeID
		if (employeeCookie !== undefined) {
			setEmployeeID(employeeCookie);
		}
	});

	return (
		<ThemeContext.Provider value={{ customerID, restaurantID, employeeID, setCustomerID, setRestaurantID, setEmployeeID }}>
			{children}
		</ThemeContext.Provider>
	);
};

