import React from "react";
import {RestaurantcardCustomerComp} from '../../components/customerSide/restaurantView/restaurantcard.customer.comp';

function CustomerHome() {
    const restaurant = {
        "name":"Hot Pot 97",
        "location":"12123 97 St NW",
        "phone":"780-555-0046",
        "cuisine":"Chinese",
        "open_time":"1000",
        "close_time":"2300",
        "accepting_orders":"yes",
        "image":"https://cdn.discordapp.com/attachments/1197608255724191907/1217893195577294868/Business_logo_for_a_chinese_restaurant_named_Ho.jpg?ex=6605ae6d&is=65f3396d&hm=8c1ed7d4e68720f8ca90d1fef4530652d57cfae1fd4ca3eaf0c3bdf05eb65347&"
    };
    return (
        <div>
            <RestaurantcardCustomerComp restaurant={restaurant}/>
        </div>
    );
}

export default CustomerHome;