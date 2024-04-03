import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../.store/ThemeContext.jsx";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import EmployeeNavBar from "../../components/employeeSide/navbar.employee.comp.jsx";

const EmployeeAnalytics = () => {
    const { restaurantID } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [totalIncome, setTotalIncome] = useState(0);
    const [cardOpen, setCardOpen] = useState(false);
	const [itemsOrdered, setItemsOrdered] = useState({});


    useEffect(() => {
		// If cookie for customer returns undefined, route to login page
		if (Cookies.get('restaurantID') === undefined || Cookies.get('employeeID') === undefined) {
			navigate('/', {replace: true});
		}
		else {
            const delay = setTimeout(() => {
			    fetchTotalIncome();
            }, 50);
            return () => clearTimeout(delay);
		}
    }, []);


    const fetchTotalIncome = () => {
		console.log("id " + restaurantID)
        axios.get(`http://localhost:8000/order/${restaurantID}`)
            .then(response => {
                console.log(JSON.stringify(response.data))
                const completedOrders = response.data.filter(order => order.status === 'completed');
                const income = completedOrders.reduce((total, order) => total + order.total, 0);
                console.log("in axios :" + income)
                setTotalIncome(income);
                countMenuItems(completedOrders);
            })
            .catch(error => {
                console.error("Error fetching orders:", error);
            });
    };

	const countMenuItems = (completedOrders) => {
        const itemsCount = {};
        completedOrders.forEach(order => {
            order.items.forEach(item => {
				//console.log(item.menu_ref.toString())
                const menuRef = item.menu_ref.toString(); // Convert ObjectId to string
                itemsCount[menuRef] = (itemsCount[menuRef] || 0) + 1;
            });
        });
		//console.log(itemsCount)
        setItemsOrdered(itemsCount);
    };


    return (
        <div>
			<EmployeeNavBar/>
            <div className="min-w-screen bg-white min-h-screen flex items-center justify-center px-5 py-5">
                <div className="bg-slate-50 text-black-500 rounded shadow-xl py-5 px-5 w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
					<div className="flex w-full">
    					<h3 className="text-lg font-semibold leading-tight flex-1">TOTAL INCOME: ${totalIncome}</h3>
    					<div className="relative h-5 leading-none">
        					<button className="text-xl text-gray-900 hover:text-gray-500 h-6 focus:outline-none" onClick={() => setCardOpen(!cardOpen)}>
            					<i className="mdi mdi-chevron-up"></i>
        					</button>
    					</div>
					</div>
                    <div className="relative overflow-hidden transition-all duration-500" style={{ maxHeight: cardOpen ? "100%" : "0", opacity: cardOpen ? 1 : 0 }}>
                        <div>
                            <div className="pb-4 lg:pb-6">
                                <h4 className="text-2xl lg:text-3xl text-black font-semibold leading-tight inline-block">{totalIncome}</h4>
                            </div>
                            <div className={`overflow-hidden rounded-full h-3 bg-slate-50 flex transition-all duration-500 ${cardOpen ? 'w-full' : 'w-0'}`}>
                                {/* Sessions progress bar */}
                                {/* {cardData().sessions.map((item, index) => (
                                    <div key={index} className={`h-full bg-${item.color}`} style={{ width: `${item.size}%` }}></div>
                                ))} */}
                            </div>
                            <div className="flex -mx-4">
                                {/* Session labels and counts */}
                                {/* {cardData().sessions.map((item, index) => (
                                    <div key={index} className={`w-1/3 px-4 ${index !== 0 ? 'border-l border-gray-700' : ''}`}>
                                        <div className="text-sm">
                                            <span className={`inline-block w-2 h-2 rounded-full mr-1 align-middle bg-${item.color}`}></span>
                                            <span className="align-middle text-gray-500">{item.label}</span>
                                        </div>
                                        <div className="font-medium text-lg text-black" x-ref={`device${index}`}>0</div>
                                    </div>
                                ))} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeAnalytics;
