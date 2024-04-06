/**
 * analytics.employee.route.jsx
 *
 * Analytics page for a restaurant on the employee
 * side of the application.
 */

import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../.store/ThemeContext.jsx";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import EmployeeNavBar from "../../components/employeeSide/navbar.employee.comp.jsx";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';

const EmployeeAnalytics = () => {
    const { restaurantID } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [totalIncome, setTotalIncome] = useState(0);
	const [itemsOrdered, setItemsOrdered] = useState({});
    //const [filteredOrders, setFilteredOrdered] = useState({});
    const [selectedFilter, setSelectedFilter] = useState('All Time'); // State to track selected filter
    const [orderTimeCategories, setOrderTimeCategories] = useState({
        breakfast: 0,
        lunch: 0,
        dinner: 0
    });

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
        const orderTimes = {
            breakfast: 0,
            lunch: 0,
            dinner: 0
        };
        axios.get(`http://localhost:8000/order/byrestaurant/${restaurantID}`)
            .then(response => {
                const completedOrders = response.data.filter(order => order.status === 'completed');
                if (selectedFilter === 'Daily'){
                    const today = new Date();
                    const currentYear = today.getFullYear().toString();
                    if ((today.getMonth() + 1).toString().length === 1){
                        var month = "0" + (today.getMonth() + 1).toString()
                    }
                    else{
                        var month = (today.getMonth() + 1).toString()
                    }
                    if ((today.getDate().toString()).length === 1){
                        var day = "0" + (today.getDate().toString())
                    }
                    else{
                        var day = (today.getDate().toString())
                    }
                    const currentDayOfYear = currentYear + month + day
                    const filteredOrders = completedOrders.filter(order => order.pickup_time.slice(0, 8) === currentDayOfYear)
                    const income = filteredOrders.reduce((total, order) => total + order.total, 0);
                    setTotalIncome(income);
                    countMenuItems(filteredOrders);
                    console.log(JSON.stringify(filteredOrders))
                    filteredOrders.forEach(order => {
                        const pickupTime = parseInt(order.pickup_time.slice(-4));
                        console.log("pickup time: " + order.pickup_time)
                        if (pickupTime >= 500 && pickupTime <= 1159) {
                            orderTimes.breakfast++;
                        } else if (pickupTime >= 1200 && pickupTime <= 1659) {
                            orderTimes.lunch++;
                        } else {
                            orderTimes.dinner++;
                        }
                    });
                    setOrderTimeCategories(orderTimes)
                }
                else if (selectedFilter === 'Monthly') {
                    const today = new Date();
                    const currentYear = today.getFullYear().toString();
                    if ((today.getMonth() + 1).toString().length === 1){
                        var month = "0" + (today.getMonth() + 1).toString()
                    }
                    else{
                        var month = (today.getMonth() + 1).toString()
                    }
                    const currentMonth = currentYear + month
                    const filteredOrders = completedOrders.filter(order => order.pickup_time.slice(0, 6) === currentMonth)
                    const income = filteredOrders.reduce((total, order) => total + order.total, 0);
                    setTotalIncome(income);
                    countMenuItems(filteredOrders);
                    console.log(JSON.stringify(filteredOrders))
                    filteredOrders.forEach(order => {
                        const pickupTime = parseInt(order.pickup_time.slice(-4));
                        console.log("pickup time: " + order.pickup_time)
                        if (pickupTime >= 500 && pickupTime <= 1159) {
                            orderTimes.breakfast++;
                        } else if (pickupTime >= 1200 && pickupTime <= 1659) {
                            orderTimes.lunch++;
                        } else {
                            orderTimes.dinner++;
                        }
                    });
                    setOrderTimeCategories(orderTimes)
                }
                else if (selectedFilter === 'Yearly') {
                    const today = new Date();
                    const currentYear = today.getFullYear().toString();
                    if ((today.getMonth() + 1).toString().length === 1){
                        var month = "0" + (today.getMonth() + 1).toString()
                    }
                    else{
                        var month = (today.getMonth() + 1).toString()
                    }
                    const filteredOrders = completedOrders.filter(order => order.pickup_time.slice(0, 4) === currentYear)
                    const income = filteredOrders.reduce((total, order) => total + order.total, 0);
                    setTotalIncome(income);
                    countMenuItems(filteredOrders);
                    console.log(JSON.stringify(filteredOrders))
                    filteredOrders.forEach(order => {
                        const pickupTime = parseInt(order.pickup_time.slice(-4));
                        console.log("pickup time: " + order.pickup_time)
                        if (pickupTime >= 500 && pickupTime <= 1159) {
                            orderTimes.breakfast++;
                        } else if (pickupTime >= 1200 && pickupTime <= 1659) {
                            orderTimes.lunch++;
                        } else {
                            orderTimes.dinner++;
                        }
                    });
                    setOrderTimeCategories(orderTimes)
                }
                else {
                    const income = completedOrders.reduce((total, order) => total + order.total, 0);
                    setTotalIncome(income);
                    countMenuItems(completedOrders);
                    completedOrders.forEach(order => {
                        const pickupTime = parseInt(order.pickup_time.slice(-4));
                        console.log("pickup time: " + order.pickup_time)
                        if (pickupTime >= 500 && pickupTime <= 1159) {
                            orderTimes.breakfast++;
                        } else if (pickupTime >= 1200 && pickupTime <= 1659) {
                            orderTimes.lunch++;
                        } else {
                            orderTimes.dinner++;
                        }
                    });
                    setOrderTimeCategories(orderTimes)
                }
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
        console.log(orderTimeCategories)
    }, [itemsOrdered]);

    const data = {
        labels: ["Breakfast (5:00AM-11:59AM)", "Lunch (12:00PM-4:59PM)", "Dinner (5:00PM-11:59PM)"],
        datasets: [
          {
            label: "Popular Order Times",
            backgroundColor: "#EC932F",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [ orderTimeCategories.breakfast,
                    orderTimeCategories.lunch,
                    orderTimeCategories.dinner  ]
          }
        ]
      };

    const options = {
        plugins: {
          datalabels: {
            display: true,
            color: "black"
          }
        },
        legend: {
          display: false
        },
        scales: {
            y: {
                ticks: {
                    stepSize: 1 // Display y-axis ticks in steps of 1 (integer values)
                }
            }
        }
    };

    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value);
    };

    const triggerFilter = () => {
        console.log(selectedFilter)
        fetchTotalIncome();
    }

    return (
        <div>
            <EmployeeNavBar />
            <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col flex items-center justify-center">
                <div className="flex items-center space-x-4">
                    <label className="mr-2">Filter:</label>
                    <select
                        className="border rounded-md px-2 py-1"
                        value={selectedFilter}
                        onChange={handleFilterChange}
                    >
                        <option value="All Time">All Time</option>
                        <option value="Daily">Daily</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                    </select>
                    <button
                        onClick={() => triggerFilter()}
                        class="h-8 px-4 m-2 text-sm text-indigo-100 transition-colors duration-150 bg-green-500 hover:bg-green-600 rounded-lg focus:shadow-outline"
                    >
                        Apply Filter
                    </button>
                </div>
            </div>
            <div className="min-w-screen flex flex-col min-h-screen flex items-center justify-center px-5 py-5">
                <div className="bg-slate-50 text-black-500 rounded shadow-xl py-5 px-5 ">
                    <div className="flex w-full">
                        <h3 className="text-lg font-semibold leading-tight flex-1">TOTAL INCOME:</h3>
                    </div>
                    <div className="flex w-full">
                        <h3 className="text-2xl font-bold leading-tight flex-1">${totalIncome.toFixed(2)}</h3>
                    </div>
            </div>
            <div className="p-10">
                <div className="bg-slate-50 text-black-500 rounded shadow-xl">
                    <h3 className="text-xl text-gray-900 font-bold">Top 5 Items Ordered:</h3>
                    <div className="flex flex-wrap justify-center">
                        {Object.keys(itemsOrdered).map(itemName => (
                            <div key={itemName} className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden m-2">
                                <h2 className="text-m font-semibold">{itemName}</h2>
                                <div className="flex justify-center"> {/* Add this div */}
                                    <img 
                                        className="max-w-full h-auto max-h-40" // Adjust max-h-40 to your preferred maximum height
                                        src={itemsOrdered[itemName].imageUrl} 
                                        alt={itemName} 
                                    />
                                </div>
                                <div className="py-4 px-6">
                                    <p className="text-sm text-gray-600 font-semibold">Total Sold: {itemsOrdered[itemName].count}</p>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
                <div className="p-10">
                    <div className="bg-slate-50 text-black-500 rounded shadow-xl ">
                        <h3 className="text-xl text-gray-900 font-bold">Pickup Times Analysis:</h3>
                        <div className="p-4" style={{ width: '600px', height: '100%' }}>
                            <Bar data={data} plugins={[ChartDataLabels]} options={options}  />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeAnalytics;
