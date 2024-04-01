import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import OrderMenuCardListCustomerComp from "../../components/customerSide/orderView/ordermenucardlist.customer.comp.jsx";
import CustomerNavBar from "../../components/customerSide/navbar.customer.comp.jsx";
import CartCustomerComp from "../../components/customerSide/orderView/cart.customer.comp.jsx";

function CustomerOrder() {
    const [menu, setMenu] = useState([]);
    const { customerId, restaurantId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        // Fetch menu for the selected restaurant
        axios.get(`http://localhost:8000/menu/restaurant/${restaurantId}`)
            .then(result => setMenu(result.data))
            .catch(err => console.log("Error fetching menu:", err));
        axios.get(`http://localhost:8000/order/${restaurantId}/${customerId}`)
            .then(result => {
                //console.log(result.data.length === 0)
                if (result.data.length !== 0) {
                    setOrder(result.data[0]);
                    //console.log("Order" + order)
                }
            })
            .catch(err => console.log("Error fetching order:", err));
    }, [restaurantId, customerId]);
// Function to add item to the order
    const addToCart = async (menuItem, qty) => {
        let item = { "newItem": {
            "menu_ref" : menuItem._id,
                "name": menuItem.name,
                "quantity" : qty,
                "subtotal": (qty * menuItem.price)
        }};
        if (!order) {
            try {
                const response = await axios.post(`http://localhost:8000/order`, {
                    "customer_ref": customerId,
                    "restaurant_ref": restaurantId
                });
                await axios.patch(`http://localhost:8000/order/${response.data._id}/${restaurantId}/${customerId}`, item)
                    .then(result => setOrder(result.data))
                    .catch(err => console.log(err));

            } catch (err) {
                console.log(err);
            }
        } else {
            // If order already exists, execute the patch request
            axios.patch(`http://localhost:8000/order/${order._id}/${restaurantId}/${customerId}`, item)
                .then(result => setOrder(result.data))
                .catch(err => console.log(err));
        }
    };

    return (
        <div className='h-dvh'>
            <CustomerNavBar />
            <div className="flex flex-row justify-content-around">
                <div className="h-dvh overflow-auto" style={{ maxWidth: '600px', height: '562px' }}>
                    <OrderMenuCardListCustomerComp menu={menu} addToCart={addToCart} />
                </div>
                <div className="justify-content-end">
                    {order && <CartCustomerComp order={order} />}
                </div>
            </div>
        </div>
    );
}

export default CustomerOrder;
