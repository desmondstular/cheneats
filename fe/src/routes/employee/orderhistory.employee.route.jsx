/**
 * orderhistory.employee.route.js
 *
 * The route/page for which displays the order history
 * for a restaurant that is associated with the employee
 * logged in.
 */

import EmployeeOrderHistoryTable from "../../components/employeeSide/orderhistory/orderhistorytable.employee.comp.jsx";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import { ThemeContext } from "../../.store/ThemeContext.jsx";
import EmployeeNavBar from "../../components/employeeSide/navbar.employee.comp.jsx";

const EmployeeOrderHistory = () => {
	const [orders, setOrders] = useState([]);
	const {restaurantID} = useContext(ThemeContext);
	const orderURL = 'http://localhost:8000/order/byrestaurant/' + restaurantID;

	useEffect(() => {
		if (restaurantID !== '') {
			axios.get(orderURL)
				.then(result => setOrders(result.data))
				.catch(err => console.log(err));
		}
	}, [restaurantID]);

	return (
		<div className='flex flex-col gap-3 vh-100'>
			<EmployeeNavBar/>
			<p className="text-3xl font-semibold tracking-wide">Order History</p>
			<EmployeeOrderHistoryTable
				orders={orders}
			/>
		</div>
	)
}

export default EmployeeOrderHistory;