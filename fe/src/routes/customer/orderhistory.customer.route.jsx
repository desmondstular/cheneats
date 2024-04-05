import {useContext, useEffect, useState} from "react";
import {ThemeContext} from "../../.store/ThemeContext.jsx";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import CustomerNavBar from "../../components/customerSide/navbar.customer.comp.jsx";
import axios from "axios";
import CustomerOrderHistoryTable from "../../components/customerSide/customerHistory/orderhistorytable.customer.comp.jsx";

const CustomerOrderHistory = () => {
	const [orders, setOrders] = useState([]);
	const {customerID} = useContext(ThemeContext);
	const navigate = useNavigate();
	const orderURL = 'http://localhost:8000/order/bycustomer/' + customerID;

	useEffect(() => {
		// If cookie for customerID returns undefined, route to login
		if (Cookies.get('customerID') === undefined) {
			navigate('/', {replace: true});
		}
	}, []);

	useEffect(() => {
		if (customerID !== '') {
			axios.get(orderURL)
				.then(result => setOrders(result.data))
				.catch(err => console.log(err));
		}
	}, [customerID]);

	return (
		<div className='vh-100 flex flex-col gap-3'>
			<CustomerNavBar/>
			<p className='h1'>Order History</p>
			<CustomerOrderHistoryTable orders={orders}/>
		</div>
	)
}

export default CustomerOrderHistory