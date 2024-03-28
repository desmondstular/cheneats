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
	const [customers, setCustomers] = useState([]);
	const [menu, setMenu] = useState([]);
	const {staffID, restaurantID} = useContext(ThemeContext);


	useEffect(() => {
		axios.get(`http://localhost:8000/order`)
			.then(result => setOrders(result.data))
			.catch(err => console.log(err));

		axios.get(`http://localhost:8000/customer`)
			.then(result => setCustomers(result.data))
			.catch(err => console.log(err));

		// axios.get(`http://localhost:8000/menu/restaurant/${restaurantId}`)
		// 	.then(result => setMenu(result.data))
		// 	.catch(err => console.log(err));
	}, []);

	// useEffect(() => {
	// 	// Join orders, customer, menu table
	// 	orders.forEach((order) => {
	// 		// Join customer name and email
	// 		const { name, email } = customers.find(({_id}) => _id === order.customer_ref);
	// 		order["customer_name"] = name;
	// 		order["customer_email"] = email;
	// 		setJoinedOrders(joinedOrders.push(order));
	//
	// 		// Join order menu item names
	// 		order.items.forEach((item) => {
	// 			const { name } = menu.find(({_id}) => _id === item.menu_ref);
	// 			item["item_name"] = name;
	// 		})
	// 	});
	// }, ["orders"])

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