import {useState, useEffect, useContext} from "react";
import {RestaurantcardlistCustomerComp} from '../../components/customerSide/restaurantView/restaurantcardlist.customer.comp';
import ActiveOrder from '../../components/customerSide/activeOrder/activeorder.customer.comp';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import CustomerNavBar from "../../components/customerSide/navbar.customer.comp.jsx";
import {ThemeContext} from "../../.store/ThemeContext.jsx";
import Cookies from "js-cookie";

function CustomerHome() {
    const [restaurants, setRestaurants] = useState([]);
	const {customerID} = useContext(ThemeContext);
    const [orders, setOrders] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		// If cookie for customerID returns undefined, route to login
		if (Cookies.get('customerID') === undefined) {
			navigate('/', {replace: true});
		}
    }, []);

    useEffect( () => {
        axios.get(`http://localhost:8000/restaurant`)
            .then(result => setRestaurants(result.data))
            .catch(err => console.log(err))
            console.log(orders)
    }, [orders]);

    useEffect(() => {
        axios.get(`http://localhost:8000/order`)
            .then((response) => {
            // Filter orders to exclude 'carted' and 'completed' statuses
            console.log(response.data)
            const filteredOrders = response.data.filter(
            (order) =>
            order.status !== "carted" && order.status !== "completed" && order.customer_ref === customerID);
            setOrders(filteredOrders);
        })
            .catch((error) => {
            console.log("Error fetching orders:", error);
        });
    }, [customerID]);

    return (
        <div>
            <CustomerNavBar></CustomerNavBar>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Left side (Restaurant cards) */}
            <div style={{ width: '60%' }}>
                {/*<text style={{style: 'flex', size: '24px', font: "bold" }}>Choose a Restaurant</text>*/}
                <RestaurantcardlistCustomerComp restaurants={restaurants} activeCustomer={customerID}/>
            </div>

            {/* Right side (Active order cards) */}
            <div className="p-2" style={{ width: '30%' }}>
                {orders.map((order) => (
                    <div className="pb-2" >
                    <ActiveOrder key={order._id} order={order} />
                    </div>
                ))}
            </div>
        </div>
    </div>
    );
}

export default CustomerHome;