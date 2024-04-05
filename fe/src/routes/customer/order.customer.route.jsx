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
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import Alert from '@mui/material/Alert';
import CardMedia from "@mui/material/CardMedia";

function CustomerOrder() {
    const [menu, setMenu] = useState([]);
    const { restaurantID } = useParams();
    const {customerID} = useContext(ThemeContext);
    const [order, setOrder] = useState(null);
    const [checkoutModalIsOpen, setCheckoutModalIsOpen] = useState(false);
    const [pickupTime, setPickupTime] = useState("ASAP"); // State to track pickup time
    const [isTimePickerEnabled, setIsTimePickerEnabled] = useState(false);
    const [selectedTime, setSelectedTime] = useState(dayjs());// State to enable/disable time picker
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [isCheckoutDisabled, setIsCheckoutDisabled] = useState(false);
    const [restaurant, setRestaurant] = useState();




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
        axios.get(`http://localhost:8000/restaurant/${restaurantID}`)
            .then(result => setRestaurant(result.data[0]))
            .catch(err => console.log("Error fetching restaurant name", err));
    }, [restaurantID, customerID]);
// Function to add item to the order
    const addToCart = async (menuItem, qty) => {
        let subtotal = 0;
        if (menuItem.on_special){
            subtotal = qty * menuItem.discount;
        }
        else{
            subtotal = qty * menuItem.price;
        }
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
            .then(result => {
                // Update order state with the updated data
                setOrder(result.data);

                // Check if there are no more items in the order, if so, delete the order from the database
                if (result.data.items.length === 0) {
                    axios.delete(`http://localhost:8000/order/${order._id}`)
                        .then(() => {
                            // If the order is successfully deleted, set the order state to null
                            setOrder(null);
                        })
                        .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
    };
    useEffect(() => {
        const currentTime = dayjs();
        const adjustedTime = currentTime.subtract(1, 'minutes');

        setIsCheckoutDisabled(selectedTime.isBefore(adjustedTime));
    }, [selectedTime]);
    const checkout = () => {
        //TODO: Check if the order is available because if you have an item added to cart before the restaurant sets to unavaible
        const adjustedTime = dayjs().subtract(5, 'minute')
        //console.log(selectedTime.)
        if (selectedTime && dayjs(selectedTime).isBefore(adjustedTime)) {
            console.log("TEST")
            setShowAlert(true);
            setAlertMessage("Pickup time cannot be earlier than the current time")
            // If pickup time is earlier than the current time, show an error message or handle it accordingly
            //alert("Pickup time cannot be earlier than the current time");
        }else {
            setShowAlert(false)
            axios.patch(`http://localhost:8000/order/${order._id}`,
                {"status": "ordered", "pickup_time": (selectedTime.format("YYYYMMDDHHmm").toString())})
            setCheckoutModalIsOpen(false);
            setOrder(null);
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
        setPickupTime("ASAP");
        setSelectedTime(dayjs())
        setIsTimePickerEnabled(false);

    };
    const handleRadioChange = (event) => {
        const selectedValue = event.target.value;
        setPickupTime(selectedValue);
        setIsTimePickerEnabled(selectedValue === "Set Pickup Time"); // Enable time picker only if "Set Pickup Time" is selected

        // If "ASAP" is selected, set the selectedTime to dayjs() immediately
        if (selectedValue === "ASAP") {
            setSelectedTime(dayjs());
            setShowAlert(false);
        }
    };


    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
            <CustomerNavBar />
            <div className="flex flex-row pl-28 vh-100" style={{backgroundColor: '#BFFEF7', overflowY: 'auto' }}>
                <div className="pr-48">
                    {restaurant && (
                        <CardMedia component="img" image={restaurant.image} alt={restaurant.name}
                                   style={{ maxWidth: 200, maxHeight: 200, width: 'auto', height: 'auto', marginTop: '35px', borderRadius: '10px', position: 'fixed'}}/>
                    )}
                </div>
                <div className="h-dvh" style={{maxWidth: '800px', height: '562px'}}>
                    <OrderMenuCardListCustomerComp menu={menu} addToCart={addToCart} />
                </div>
                <div className="justify-content-end" style={{backgroundColor: '#BFFEF7 ' }}>
                    <CartCustomerComp  order={order} removeFromCart={removeFromCart} openCheckoutModal={openCheckoutModal}/>
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
                                       height: '480px'
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
                                <h2 className="font-bold">Order Total: ${order.total}</h2>
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
                                        <DateTimePicker
                                            disabled={!isTimePickerEnabled}
                                            value={selectedTime}
                                            onChange={handleTimeChange}
                                            minTime={dayjs().subtract(1, "minutes")}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <button className="btn mt-2" onClick={checkout} disabled={isCheckoutDisabled} >Checkout</button>
                            </div>
                        </Modal>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CustomerOrder;
