/**
 * ThemeContext.jsx
 *
 * Contains state context.
 */
import {createContext, useState} from "react";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
	const [customerID, setCustomerID] = useState("");
	const [restaurantID, setRestaurantID] = useState("");
	const [staffID, setStaffID] = useState("");

	return (
		<ThemeContext.Provider value={{ customerID, setCustomerID, restaurantID, staffID, setRestaurantID, setStaffID }}>
			{children}
		</ThemeContext.Provider>
	);
};

