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
	const [itemsOrdered, setItemsOrdered] = useState({});


    useEffect(() => {
		// If cookie for customer returns undefined, route to login page
		if (Cookies.get('restaurantID') === undefined || Cookies.get('employeeID') === undefined) {
			navigate('/', {replace: true});
		}
		else {
            if (restaurantID !== ''){
			    fetchTotalIncome();
            }
		}
    }, [restaurantID]);


    const fetchTotalIncome = () => {
        axios.get(`http://localhost:8000/order/byrestaurant/${restaurantID}`)
            .then(response => {
                const completedOrders = response.data.filter(order => order.status === 'completed');
                console.log(JSON.stringify(completedOrders))
                const income = completedOrders.reduce((total, order) => total + order.total, 0);
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
                const itemName = item.menu_ref ? item.menu_ref.name : "Unnamed Item";
                const imageUrl = item.menu_ref ? item.menu_ref.image : ""; // Assuming image URL is provided by menu_ref
                const quantity = item.quantity;
                if (!itemsCount[itemName]) {
                    itemsCount[itemName] = { count: 0, imageUrl: imageUrl };
                }
                itemsCount[itemName].count += quantity;
            });
        });

        // Sort items by count in descending order
        const sortedItems = Object.keys(itemsCount).sort((a, b) => itemsCount[b].count - itemsCount[a].count);
        
        // Get top 5 items
        const top5Items = sortedItems.slice(0, 5).reduce((obj, key) => {
            obj[key] = itemsCount[key];
            return obj;
        }, {});

        setItemsOrdered(top5Items);
    };
    
    // Use useEffect to log the updated state
    useEffect(() => {
        console.log(itemsOrdered);
    }, [itemsOrdered]);


    return (
        <div>
            <EmployeeNavBar />
            <div className="min-w-screen flex flex-col bg-white min-h-screen flex items-center justify-center px-5 py-5">
                <div className="bg-slate-50 text-black-500 rounded shadow-xl py-5 px-5 w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
                    <div className="flex w-full">
                        <h3 className="text-lg font-semibold leading-tight flex-1">TOTAL INCOME:</h3>
                    </div>
                    <div className="flex w-full">
                        <h3 className="text-lg font-semibold leading-tight flex-1">${totalIncome.toFixed(2)}</h3>
                    </div>
            </div>
            <div className="p-10">
                <div className="bg-slate-50 text-black-500 rounded shadow-xl">
                    <h3 className="text-m text-gray-900 font-bold">Top 5 Items Ordered:</h3>
                    <div className="flex flex-wrap justify-center">
                        {Object.keys(itemsOrdered).map(itemName => (
                            <div key={itemName} className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden m-2">
                                <h2 className="text-lg font-bold">{itemName}</h2>
                                <div className="flex justify-center"> {/* Add this div */}
                                    <img 
                                        className="max-w-full h-auto max-h-40" // Adjust max-h-40 to your preferred maximum height
                                        src={itemsOrdered[itemName].imageUrl} 
                                        alt={itemName} 
                                    />
                                </div>
                                <div className="py-4 px-6">
                                    <p className="text-sm text-gray-600 font-bold">Total Sold: {itemsOrdered[itemName].count}</p>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeAnalytics;
