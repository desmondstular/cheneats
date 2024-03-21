import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import OrderMenuCardListCustomerComp from "../../components/customerSide/orderView/ordermenucardlist.customer.comp.jsx";
import CustomerNavBar from "../../components/customerSide/navbar.customer.comp.jsx";

function CustomerOrder () {
    const [menu, setMenu] = useState([]);
    const {customerId} = useParams();
    const {restaurantId} = useParams();

    useEffect( () => {
        axios.get(`http://localhost:8000/menu/restaurant/65f908e8e75ba89099210778`)
            .then(result => setMenu(result.data))
            .catch(err => console.log(err))

    }, [])
    //console.log(restaurants);
    //console.log(customerId);
    return (
        <div className='h-dvh'>
            <CustomerNavBar></CustomerNavBar>
            {/*<text style={{style: 'flex', size: '24px', font: "bold" }}>Choose a Restaurant</text>*/}
            <div className="h-dvh overflow-auto" style={{ maxWidth: '600px', height: '562px' }}>
                <OrderMenuCardListCustomerComp menu={menu}/>
            </div>
        </div>
    );
}

export default CustomerOrder