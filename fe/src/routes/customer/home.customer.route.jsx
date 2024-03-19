import React from "react";
import {RestaurantcardCustomerComp} from '../../components/customerSide/restaurantView/restaurantcard.customer.comp';
import {RestaurantcardlistCustomerComp} from '../../components/customerSide/restaurantView/restaurantcardlist.customer.comp';
import {CustomerHeaderComp} from '../../components/customerSide/restaurantView/customer.header.comp'
function CustomerHome() {
    const restaurants = [
        {
            "name":"Hot Pot 97",
            "location":"12123 97 St NW",
            "phone":"780-555-0046",
            "cuisine":"Chinese",
            "open_time":"10:00",
            "close_time":"23:00",
            "accepting_orders":"yes",
            "image":"https://cdn.discordapp.com/attachments/1197608255724191907/1217893195577294868/Business_logo_for_a_chinese_restaurant_named_Ho.jpg?ex=6605ae6d&is=65f3396d&hm=8c1ed7d4e68720f8ca90d1fef4530652d57cfae1fd4ca3eaf0c3bdf05eb65347&"
        },
        {
            "name":"Fernando's Pizza",
            "location":"10345 Jasper Ave",
            "phone":"780-555-0721",
            "cuisine":"Italian",
            "open_time":"09:00",
            "close_time":"21:00",
            "accepting_orders":"yes",
            "image":"https://cdn.discordapp.com/attachments/1197608255724191907/1217893532094697524/Business_logo_for_a_pizza_restaurant_named_Ferna.jpg?ex=6605aebd&is=65f339bd&hm=c0ad4930a03ffd641e62d77622c3cc915e48483b4245cd04146120e1eb6edda9&"
        },
        {
            "name":"Buddha Chicken",
            "location":"4485 Gateway Blvd NW",
            "phone":"780-555-0630",
            "cuisine":"Indian",
            "open_time":"12:00",
            "close_time":"24:00",
            "accepting_orders":"no",
            "image":"https://cdn.discordapp.com/attachments/1197608255724191907/1217894189606502460/Business_logo_for_an_indian_restaurant_Buddha_C.jpg?ex=6605af5a&is=65f33a5a&hm=64d98ae33aaed26d880d5a4b14f505707245ac28c1e4f5c4e17d8d89f5f037fe&"
        }
    ];
    const activeCustomer = {"email": "andy@gmail.com", "name": "Andrew Bartko", "phone": "5877842163"}
    return (
        <div>
            <CustomerHeaderComp></CustomerHeaderComp>
            <text style={{style: 'flex', size: '24px', font: "bold" }}>Choose a Restaurant</text>
            <RestaurantcardlistCustomerComp restaurants={restaurants} activeCustomer={activeCustomer}/>
        </div>
    );
}

export default CustomerHome;