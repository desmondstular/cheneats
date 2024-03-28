import {useState, useEffect, useContext} from "react";
import {RestaurantcardlistCustomerComp} from '../../components/customerSide/restaurantView/restaurantcardlist.customer.comp';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import CustomerNavBar from "../../components/customerSide/navbar.customer.comp.jsx";
import {ThemeContext} from "../../.store/ThemeContext.jsx";
import Cookies from "js-cookie";

function CustomerHome() {
    const [restaurants, setRestaurants] = useState([]);
	const {customerID} = useContext(ThemeContext);
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
    }, []);

    return (
        <div>
            <CustomerNavBar></CustomerNavBar>
            {/*<text style={{style: 'flex', size: '24px', font: "bold" }}>Choose a Restaurant</text>*/}
            <RestaurantcardlistCustomerComp restaurants={restaurants} activeCustomer={customerID}/>
        </div>
    );
}

export default CustomerHome;