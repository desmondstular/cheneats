import {Link, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {ThemeContext} from "../../.store/ThemeContext.jsx";
import Cookies from "js-cookie";
import EmployeeNavBar from "../../components/employeeSide/navbar.employee.comp.jsx";
import {Clock} from "../../components/clock/clock.comp.jsx";
import {LiveOrderTable} from "../../components/employeeSide/ordersystem/liveordertable.comp.jsx";
import axios from "axios";
import {ItemList} from "../../components/employeeSide/ordersystem/itemslist.comp.jsx";
import {OrderInformation} from "../../components/employeeSide/ordersystem/orderinformation.comp.jsx";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import Divider from "@mui/material/Divider";
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const EmployeeHome = () => {
	const {restaurantID, employeeID} = useContext(ThemeContext);
	const navigate = useNavigate();
	const [orders, setOrders] = useState([]);
	const [activeOrder, setActiveOrder] = useState(0);
	const [statusTimeline, setStatusTimeline] = useState(1);
	const [update, setUpdate] = useState(0);
	const orderURL = 'http://localhost:8000/order/byrestaurant/' + restaurantID;
	const patchOrderURL = "http://localhost:8000/order/";

	const timelineMappings = {'ordered': 1, 'in-progress': 2, 'awaiting-pickup': 3, 'completed': 4};
	const statusMapping = {1: 'ordered', 2: 'in-progress', 3: 'awaiting-pickup', 4: 'completed'};


	useEffect(() => {
		// If cookie for customer returns undefined, route to login page
		if (Cookies.get('restaurantID') === undefined || Cookies.get('employeeID') === undefined) {
			navigate('/', {replace: true});
		}
	}, []);

	useEffect(() => {
		const fetchData = () => {
			if (restaurantID !== '') {
				axios.get(orderURL)
					.then(result => (
						setOrders(result.data.filter(function( obj ) {
							return obj.status !== 'carted' && obj.status !== 'completed'
						}))
					))
					.catch(err => console.log(err));
			}
		};

		// Fetch data initially
		fetchData();

		// Fetch data every 30 seconds
		const interval = setInterval(fetchData, 30000);

		// Clean up interval on component unmount
		return () => clearInterval(interval);
	}, [restaurantID, update]);

	useEffect(() => {
		if (orders.length > 0 && activeOrder >= 0 && activeOrder < orders.length) {
			const status = orders[activeOrder].status;
			setStatusTimeline(timelineMappings[status] || 1);
		}
	}, [orders, activeOrder]);

	/**
	 * Whenever you click a table order, sets to active order.
	 */
	const onClickTableOrder = (e) => {
		setActiveOrder(Number.parseInt(e.currentTarget.id));
	}

	/**
	 * Back button onClick handler. Reverses status of order.
	 */
	const backButtonClick = async () => {
		try {
			const status = orders[activeOrder].status;
			const statusNum = timelineMappings[status];
			if (statusNum > 1) {
				const obj = {_id: orders[activeOrder]._id, status: statusMapping[statusNum-1]};
				await axios.patch(patchOrderURL + orders[activeOrder]._id, obj);
			}
		} catch (e) {
			console.log(e);
		}
		setUpdate(update+1);
	}

	/**
	 * Next button onClick handler. Progresses status of order.
	 */
	// const nextButtonClick = async () => {
	// 	try {
	// 		const status = orders[activeOrder].status;
	// 		const statusNum = timelineMappings[status];
	// 		if (statusNum < 3) {
	// 			const obj = {_id: orders[activeOrder]._id, status: statusMapping[statusNum+1]};
	// 			await axios.patch(patchOrderURL + orders[activeOrder]._id, obj);
	// 			// Update timelineMappings object
	// 			const newStatusNum = statusNum + 1;
	// 			setStatusTimeline(newStatusNum);
	// 			timelineMappings[status] = newStatusNum;
	// 		} else {
	//
	// 		}
	// 	} catch (e) {
	// 		console.log(e);
	// 	}
	// 	setUpdate(update+1);
	// }

	const nextButtonClick = async () => {
			try {
				const status = orders[activeOrder].status;
				const statusNum = timelineMappings[status];
				const obj = {_id: orders[activeOrder]._id, status: statusMapping[statusNum+1]};
				await axios.patch(patchOrderURL + orders[activeOrder]._id, obj);

				// Update timelineMappings object
				const newStatusNum = statusNum + 1;
				setStatusTimeline(newStatusNum);
				timelineMappings[status] = newStatusNum;
			} catch (e) {
				console.log(e);
			}
			setUpdate(update+1);
		}

		return (
			<div className='flex flex-col gap-3 vh-100'>
				<div className="sticky h-19" style={{zIndex: 9999}}>
					<EmployeeNavBar></EmployeeNavBar>
				</div>
				<div className='flex flex-col pl-16 pr-16'>
					<div className='flex gap-3 flex-row h-80'>
						<div className='card card-bordered min-w-48 max-w-96 flex-grow drop-shadow-sm'>
							<p className='text-xl rounded-t-lg font-semibold pt-3 pb-3 bg-base-200'>Order
								Information</p>
							{orders.length > 0 && (
							<div className='text-left pl-4 pr-4 pt-2'>
								<p className="mb-2"><span
									className="font-semibold">Customer:</span> {orders[activeOrder].customer_ref.name}
								</p>
								<Divider sx={{borderBottomWidth: 3, bgcolor: "#00b6ff"}}/>
								<p className="mb-2"><span
									className="font-semibold">Pickup time:</span> {orders[activeOrder].pickup_time}
								</p>
								<Divider sx={{borderBottomWidth: 3, bgcolor: "#00b6ff"}}/>
								<p><Accordion>
									<AccordionSummary className='text-l rounded-t-lg font-semibold'
													  expandIcon={<ExpandMoreIcon/>}
													  aria-controls="panel1-content"
													  id="panel1-header"
									>
										<PermContactCalendarIcon/> Contact {orders[activeOrder].customer_ref.name}
									</AccordionSummary>
									<AccordionDetails>
										<Divider sx={{borderBottomWidth: 3, bgcolor: "#00b6ff"}}/>
										<p className="mb-2"><span
											className="font-semibold">Email:</span> {orders[activeOrder].customer_ref.email}
										</p>
										<Divider sx={{borderBottomWidth: 3, bgcolor: "#00b6ff"}}/>
										<p className="mb-2"><span
											className="font-semibold">Phone:</span> {orders[activeOrder].customer_ref.phone}
										</p>
									</AccordionDetails>
								</Accordion></p>
							</div>)}
						</div>
						<div
							className='card card-bordered flex flex-row justify-items-center min-w-72 flex-grow bg-white drop-shadow-sm'>
							<button
								className='bg-base-200 rounded-l-2xl flex justify-center align-items-center justify-items-center hover:bg-base-300 w-32 h-full'
								onClick={backButtonClick}>
								<svg className="h-6 w-6 fill-current md:h-8 md:w-8" xmlns="http://www.w3.org/2000/svg"
									 width="24" height="24" viewBox="0 0 24 24">
									<path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
								</svg>
								<p>Back</p>
							</button>
							<div className='flex flex-grow mb-4 flex-col justify-end'>
								<div className='flex-grow align-items-center flex flex-col '>
									<Clock/>
								</div>
								<ul className="steps steps-vertical lg:steps-horizontal">
									{Object.keys(timelineMappings).map(status => (
										<li key={status}
											className={`step ${timelineMappings[status] <= statusTimeline ? 'step-info' : ''} timeline-item ${timelineMappings[status] === statusTimeline ? 'active' : ''} ${status === 'completed' ? 'completed' : ''}`}>
											{status}
										</li>
									))}
								</ul>
							</div>
							<button className='bg-base-200 rounded-r-2xl flex justify-center align-items-center justify-items-center hover:bg-base-300 w-32 h-full'
									onClick={statusTimeline < 3 ? nextButtonClick : ()=>document.getElementById('my_modal_1').showModal()}>
								<dialog id="my_modal_1" className="modal">
									<div className="modal-box">
										<h3 className="font-bold text-lg">Confirm</h3>
										<p className="py-4">Are you sure you want to mark the order as completed?</p>
										<div className="modal-action">
											<form method="dialog">
												<button className="btn btn-error b w-24">Cancel</button>
												<button className="btn btn-info no-animation ml-4 w-24" onClick={nextButtonClick}>Confirm
												</button>
											</form>
										</div>
									</div>
								</dialog>
								Next
								<svg className="h-6 w-6 fill-current md:h-8 md:w-8"
									 xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
									<path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
								</svg>
							</button>
						</div>
						<div className='card card-bordered min-w-48 max-w-96 flex-grow drop-shadow-sm'>
							<p className='text-xl rounded-t-lg font-semibold pt-3 pb-3 bg-base-200'>Order Items</p>
							<ItemList orders={orders} active={activeOrder}/>
						</div>
					</div>
					<div className='card card-bordered mt-3 rounded h-1/3 mb-3'>
						<LiveOrderTable orders={orders} active={activeOrder} handler={onClickTableOrder}/>
					</div>
				</div>
			</div>
		)
}

export default EmployeeHome;
