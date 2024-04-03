import React, {useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import OrderMenuCardListCustomerComp from "../../components/customerSide/orderView/ordermenucardlist.customer.comp.jsx";
import CustomerNavBar from "../../components/customerSide/navbar.customer.comp.jsx";
import CartCustomerComp from "../../components/customerSide/orderView/cart.customer.comp.jsx";
import Cookies from "js-cookie";
import {ThemeContext} from "../../.store/ThemeContext.jsx";

function CustomerOrder() {
    const [menu, setMenu] = useState([]);
    const { restaurantID } = useParams();
    const {customerID} = useContext(ThemeContext);
    const [order, setOrder] = useState(null);



    useEffect(() => {
        // If cookie for customer returns undefined, route to login page
        if ( Cookies.get('customerID') === undefined) {
            navigate('/', {replace: true});
        }
    }, []);

    useEffect(() => {
        // Fetch menu for the selected restaurant
        axios.get(`http://localhost:8000/menu/restaurant/${restaurantID}`)
            .then(result => setMenu(result.data))
            .catch(err => console.log("Error fetching menu:", err));
        axios.get(`http://localhost:8000/order/${restaurantID}/${customerID}`)
            .then(result => {
                //console.log("Restaurant" + restaurantID)
                //console.log("Order " + JSON.stringify(result.data))
                if (result.data.length !== 0) {
                    setOrder(result.data[0]);
                    //console.log("Order" + order)
                }
            })
            .catch(err => console.log("Error fetching order:", err));
    }, [restaurantID]);
// Function to add item to the order
    const addToCart = async (menuItem, qty) => {
        let subtotal = qty * menuItem.price
        let item = { "newItem": {
            "menu_ref" : menuItem._id,
                "name": menuItem.name,
                "quantity" : qty,
                "subtotal": parseFloat(subtotal.toFixed(2))
        }};
        if (!order) {
            try {
                const response = await axios.post(`http://localhost:8000/order`, {
                    "customer_ref": customerID,
                    "restaurant_ref": restaurantID
                });
                await axios.patch(`http://localhost:8000/order/${response.data._id}/${restaurantID}/${customerID}`, item)
                    .then(result => setOrder(result.data))
                    .catch(err => console.log(err));

            } catch (err) {
                console.log(err);
            }
        } else {
            // If order already exists, execute the patch request
            axios.patch(`http://localhost:8000/order/${order._id}/${restaurantID}/${customerID}`, item)
                .then(result => setOrder(result.data))
                .catch(err => console.log(err));
        }
    };
    const removeFromCart = async (menuItem) => {
        await axios.patch(`http://localhost:8000/order/${order._id}/${menuItem._id}`, menuItem)
            .then(result => setOrder(result.data)).catch(err => console.log(err));
    }

    return (
        <div className='h-dvh'>
            <CustomerNavBar />
            <div className="flex flex-row justify-content-around">
                <div className="h-dvh overflow-auto" style={{ maxWidth: '600px', height: '562px' }}>
                    <OrderMenuCardListCustomerComp menu={menu} addToCart={addToCart} />
                </div>
                <div className="justify-content-end">
                    <CartCustomerComp order={order} removeFromCart={removeFromCart}/>
                </div>
            </div>
        </div>
    );
}

export default CustomerOrder;
