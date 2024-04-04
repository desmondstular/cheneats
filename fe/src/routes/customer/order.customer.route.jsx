import React, {useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import OrderMenuCardListCustomerComp from "../../components/customerSide/orderView/ordermenucardlist.customer.comp.jsx";
import CustomerNavBar from "../../components/customerSide/navbar.customer.comp.jsx";
import CartCustomerComp from "../../components/customerSide/orderView/cart.customer.comp.jsx";
import CheckoutModalCustomerComp from "../../components/customerSide/orderView/checkoutModal.customer.comp.jsx";
import Cookies from "js-cookie";
import {ThemeContext} from "../../.store/ThemeContext.jsx";
import {FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import Modal from "react-modal";
import Button from "react-bootstrap/Button";
import dayjs from 'dayjs';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import Alert from '@mui/material/Alert';

function CustomerOrder() {
    const [menu, setMenu] = useState([]);
    const { restaurantID } = useParams();
    const {customerID} = useContext(ThemeContext);
    const [order, setOrder] = useState(null);
    const [checkoutModalIsOpen, setCheckoutModalIsOpen] = useState(false);
    const [pickupTime, setPickupTime] = useState("ASAP"); // State to track pickup time
    const [isTimePickerEnabled, setIsTimePickerEnabled] = useState(false);
    const [selectedTime, setSelectedTime] = useState(dayjs());// State to enable/disable time picker
    const [alertMessage, setAlertMessage] = useState(false);
    const [showAlert, setShowAlert] = useState(false);




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
    }, [restaurantID, customerID]);
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
        //TODO: Check if there are no more items in the order if so delete order from database

    }
    const checkout = async () => {
        const adjustedTime = dayjs().subtract(5, 'minute')
        if (selectedTime && dayjs(selectedTime).isBefore(adjustedTime)) {
            setShowAlert(true);
            setAlertMessage("Pickup time cannot be earlier than the current time")
            // If pickup time is earlier than the current time, show an error message or handle it accordingly
            //alert("Pickup time cannot be earlier than the current time");
        }else {
            setShowAlert(false)
            await axios.patch(`http://localhost:8000/order/${order._id}`,
                {"status": "ordered", "pickup_time": (selectedTime.format("HH:mm"))})
            setCheckoutModalIsOpen(false);
            setOrder(null);
            //
        }
        //console.log(JSON.stringify(order))
    }
    const handleTimeChange = (newTime) => {
        setSelectedTime(newTime);
    };



    const openCheckoutModal = () => {
        setCheckoutModalIsOpen(true);
    };

    const closeCheckoutModal = () => {
        setCheckoutModalIsOpen(false);
    };
    const handleRadioChange = (event) => {
        const selectedValue = event.target.value;
        setPickupTime(selectedValue);
        setIsTimePickerEnabled(selectedValue === "Set Pickup Time"); // Enable time picker only if "Set Pickup Time" is selected

        // If "ASAP" is selected, set the selectedTime to dayjs() immediately
        if (selectedValue === "ASAP") {
            setSelectedTime(dayjs());
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
                    <CartCustomerComp order={order} removeFromCart={removeFromCart} openCheckoutModal={openCheckoutModal}/>
                </div>
                <div>
                    {order && (
                        <Modal isOpen={checkoutModalIsOpen} onRequestClose={closeCheckoutModal} contentLabel="Checkout"
                               style={{
                                   content: {
                                       width: '400px',
                                       margin: 'auto',
                                       borderRadius: '8px',
                                       padding: '20px',
                                       height: '460px'
                                   }
                               }}>
                            <div className="flex justify-content-between flex-column align-items-center ">
                                <h1> My Order</h1>
                                <div className="h-40 overflow-x-auto">
                                    <table className='table drop-shadow-md'>
                                        <thead>
                                        <tr className="text-sm">
                                            <th className='bg-blue-300'>Item Name</th>
                                            <th>Quantity</th>
                                            <th>Subtotal</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {order.items.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.name}</td>
                                                <td>{item.quantity}</td>
                                                <td>{'$' + item.subtotal.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                                <h2>Order Total: ${order.total}</h2>
                                <div>
                                    <FormLabel>Pickup Time</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="ASAP"
                                        name="radio-buttons-group"
                                        value={pickupTime}
                                        onChange={handleRadioChange}
                                    >
                                        <FormControlLabel value="ASAP" control={<Radio/>} label="ASAP"/>
                                        <FormControlLabel value="Set Pickup Time" control={<Radio/>} label="Set Pickup Time"/>
                                    </RadioGroup>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DesktopTimePicker
                                            disabled={!isTimePickerEnabled}
                                            value={selectedTime}
                                            onChange={handleTimeChange}
                                            minTime={dayjs()}
                                        />
                                    </LocalizationProvider>
                                </div>
                                {showAlert && <Alert severity="error">{alertMessage}</Alert>}
                                <Button onClick={checkout}>Checkout</Button>
                            </div>
                        </Modal>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CustomerOrder;
