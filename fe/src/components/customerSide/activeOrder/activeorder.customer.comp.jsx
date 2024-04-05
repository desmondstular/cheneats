import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProgressBar from '../activeOrder/progressbar.customer.comp.jsx'

const ActiveOrder = ({ order }) => {
    const [restaurantName, setRestaurantName] = useState('');
    const [formattedPickupTime, setFormattedPickupTime] = useState('');


    useEffect(() => {
        // Fetch restaurant details using the restaurant_ref from the order
        const fetchRestaurantName = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/restaurant/${order.restaurant_ref}`);
                if (response.data) {
                    console.log(response.data)
                    const restaurantData = response.data[0]
                    setRestaurantName(restaurantData.name);
                }
            } catch (error) {
                console.log('Error fetching restaurant:', error);
            }
        };

        if (order && order.restaurant_ref) {
            fetchRestaurantName();
            console.log(restaurantName)
        }
    }, [order]);

    useEffect(() => {
        // Format the pickup time when order changes
        if (order && order.pickup_time) {
            console.log(order.status)
            const formattedTime = formatPickupTime(order.pickup_time);
            setFormattedPickupTime(formattedTime);
        }
    }, [order]);

    const formatPickupTime = (pickupTime) => {
        // Convert pickupTime (e.g., "202404041609") to "4:09 PM" format
        const hours = pickupTime.substring(8, 10);
        const minutes = pickupTime.substring(10, 12);

        // Use Date object to format time
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));

        // Format time using options for hours, minutes, and AM/PM
        const formattedTime = date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });

        return formattedTime;
    };

    if (!order) {
        order = {
            items: [],
            total: 0
        };
    }

    const estimatePickup = () => {
        return formattedPickupTime
    }

    return (
        <div className="pb-4 card w-96">
            <div className="flex card-title justify-content-center">
                <h1>Order from: {restaurantName}</h1>
            </div>
            <div className="card-body">
                {order.items.map((item, index) => (
                    <div key={index} className="flex justify-content-between items-center gap-4 min-h-8">
                        <div>{item.quantity}</div>
                        <div className="flex flex-wrap min-w-8 max-w-32">{item.name}</div>
                        <div className="flex align-content-start">${item.subtotal.toFixed(2)}</div>
                    </div>
                ))}               
                <h2 className="text-lg font-semibold leading-tight flex-1 pt-2">Total: ${order.total.toFixed(2)}</h2>
                <h2 className="text-lg font-semibold leading-tight flex-1 p-4">Estimated Pickup Time: {order.status === 'ordered' ? 'Awaiting Confirmation' : formatPickupTime(order.pickup_time)}</h2>
                <ProgressBar stage={order.status} />
            </div>
        </div>
    );
};

export default ActiveOrder;
