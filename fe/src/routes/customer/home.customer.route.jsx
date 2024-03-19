import React, {useState, useEffect} from "react";
import {RestaurantcardCustomerComp} from '../../components/customerSide/restaurantView/restaurantcard.customer.comp';
import {RestaurantcardlistCustomerComp} from '../../components/customerSide/restaurantView/restaurantcardlist.customer.comp';
import {CustomerHeaderComp} from '../../components/customerSide/restaurantView/customer.header.comp';
import {useParams, Link} from "react-router-dom";
import axios from "axios";
function CustomerHome() {
    const [restaurants, setRestaurants] = useState([]);
    const {customerId} = useParams();

    useEffect( () => {
        axios.get(`http://localhost:8000/restaurant`)
            .then(result => setRestaurants(result.data))
            .catch(err => console.log(err))

    }, [])
    console.log(restaurants);
    console.log(customerId);
    return (
        <div>
            <CustomerHeaderComp></CustomerHeaderComp>
            {/*<text style={{style: 'flex', size: '24px', font: "bold" }}>Choose a Restaurant</text>*/}
            <RestaurantcardlistCustomerComp restaurants={restaurants} activeCustomer={customerId}/>
        </div>
    );
}

export default CustomerHome;