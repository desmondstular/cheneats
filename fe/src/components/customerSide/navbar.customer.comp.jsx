import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import Cookies from "js-cookie";
import UserIcon from '../../icons/user.png';
import {ThemeContext} from "../../.store/ThemeContext.jsx";
import axios from "axios";
import {OrderMenuCardCustomerComp} from "./orderView/ordermenucard.customer.comp.jsx";
import Card from "@mui/material/Card";

const CustomerNavBar = () => {
	const navigate = useNavigate();
	const [cartedOrders, setCartedOrders] = useState([]);
	const [cartedRestaurants, setCartedRestaurants] = useState([]);
	const {customerID} = useContext(ThemeContext);
	const {restaurantId} = useParams();

	const onClickLogout = () => {
		Cookies.remove('employeeID');
		Cookies.remove('restaurantID');
		Cookies.remove('customerID');
		navigate('/', {replace: true});
	}
	useEffect(() => {
		console.log("Test")
		if (customerID !== '') {
			axios.get(`http://localhost:8000/order/carted/${customerID}`)
				.then(result => {
					setCartedOrders(result.data);
					const promises = result.data.map(order =>
						axios.get(`http://localhost:8000/restaurant/${order.restaurant_ref}`)
					);
					Promise.all(promises)
						.then(responses => {

							const restaurants = responses.map(response => response.data[0]);
							console.log("Restaurant Name" + JSON.stringify(restaurants))
							setCartedRestaurants(restaurants);
							console.log("Carted Rests: " +  JSON.stringify(cartedRestaurants));
							console.log("Carted Rests: " + JSON.stringify(cartedRestaurants.length));
						})
						.catch(err => console.log(err));
				})
				.catch(err => console.log(err));

		}
	}, [customerID, restaurantId]);
	// useEffect(() => {
	// 	console.log("Carted Rests: " +  JSON.stringify(cartedRestaurants));
	// },[cartedRestaurants]);
    return (
		<div className="navbar h-19 shadow-md bg-white">
			<div className='flex-1'>
				<a className='flex items-center gap-2'>
					<div className="w-14 rounded-full drop-shadow-xl">
						<img alt="ChenEats Logo"
							 src="chen-transparent-cropped.png"/>
					</div>
					<p className="text-2xl"><b>ChenEats</b></p>
				</a>
				<div className='flex-1'>
					<div className='flex justify-center gap-2'>
						<Link to='/customerhome' className="btn btn-ghost text-md">Home</Link>
						<Link to='/customerOrderHistory' className="btn btn-ghost text-md">Order History</Link>
					</div>
				</div>
				<div className="flex-none">
					<div className="dropdown dropdown-end">
						<div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
							<div className="indicator">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
									 viewBox="0 0 24 24"
									 stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
										  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
								</svg>
								<span className="badge badge-sm indicator-item">{cartedRestaurants.length}</span>
							</div>
						</div>
						<div tabIndex={0}
							 className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
							<div className="card-body">
								{cartedRestaurants.length > 0 ? (
									<>
										<h1 className="font-bold">Carted Orders</h1>
										{cartedRestaurants.map((restaurant, index) => (
											<Link to={`http://localhost:5173/customerOrder/${restaurant._id}`} key={index}>
												{restaurant.name}
											</Link>
										))}
									</>
								) : (
									<p>No Carted Orders</p>
								)}
							</div>

						</div>
					</div>
					<div className="dropdown dropdown-end">
						<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
							<div className="w-10 rounded-full">
								<img alt="Tailwind CSS Navbar component"
									 src={UserIcon}/>
							</div>
						</div>
						<ul tabIndex={0}
							className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
							<li>
								<a className="justify-between">
									Profile
								</a>
							</li>
							<li onClick={onClickLogout}><a>Logout</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CustomerNavBar;