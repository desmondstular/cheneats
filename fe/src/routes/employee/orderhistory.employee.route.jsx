/**
 * orderhistory.employee.route.js
 *
 * The order history page for an employee.
 */

import EmployeeOrderHistoryTable from "../../components/employeeSide/orderhistory/orderhistorytable.employee.comp.jsx";
import CustomerNavBar from "../../components/customerSide/navbar.customer.comp.jsx";
import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../../.store/ThemeContext.jsx";
import EmployeeNavBar from "../../components/employeeSide/navbar.employee.comp.jsx";

const EmployeeOrderHistory = () => {
	const [orders, setOrders] = useState([]);
	const {staffID, restaurantID} = useContext(ThemeContext);
	const orderURL = 'http://localhost:8000/order/byrestaurant/' + restaurantID;

	useEffect(() => {
		if (restaurantID !== '') {
			axios.get('http://localhost:8000/order/byrestaurant/' + restaurantID)
				.then(result => setOrders(result.data))
				.catch(err => console.log(err));
		}
	}, [restaurantID]);

	return (
		<div>
			<EmployeeNavBar/>
			<br/>
			<p className="text-lg text-gray-900 dark:text-black">Order History</p>
			<EmployeeOrderHistoryTable
				orders={orders}
			/>
		</div>
	)
}

export default EmployeeOrderHistory;