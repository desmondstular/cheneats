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
	const [staffID, setStaffID] = useState("");

	useEffect(() => {
		const cookie = Cookies.get('customerID');
		if (cookie !== undefined) {
			setCustomerID(cookie);
		}
	});

	return (
		<ThemeContext.Provider value={{ customerID, setCustomerID, restaurantID, staffID, setRestaurantID, setStaffID }}>
			{children}
		</ThemeContext.Provider>
	);
};

