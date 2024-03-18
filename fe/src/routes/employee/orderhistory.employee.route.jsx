/**
 * orderhistory.employee.route.js
 */

import EmployeeOrderHistoryTable from "../../components/employeeSide/orderhistory/orderhistorytable.employee.comp.jsx";
import axios from "axios";

const EmployeeOrderHistory = () => {
	const customers = [
		{
			"_id": "65f739ffdb162efe433188db",
			"email": "jordang@mymacewan.ca",
			"name": "Gabe Jorand",
			"phone": "7803032120"
		}
	];
	const restaurants = [
		{
			"_id": "65f73a61db162efe433188df",
			"name": "Hot Pot 97",
			"location": "9704 108 Avenue NW, Edmonton, Alberta",
			"phone": "7804940210",
			"cuisine": "Chinese",
			"open_time": "12:00",
			"closing_time": "22:00",
			"accepting_orders": true,
			"image": "https://cdn.discordapp.com/attachments/1197608255724191907/1217893195577294868/Business_logo_for_a_chinese_restaurant_named_Ho.jpg?ex=6605ae6d&is=65f3396d&hm=8c1ed7d4e68720f8ca90d1fef4530652d57cfae1fd4ca3eaf0c3bdf05eb65347&"
		}
	];
	const orders = [
		{
			"_id": "65f739ffdb162efe433144df",
			"customer_ref": "65f739ffdb162efe433188db",
			"restaurant_ref": "65f73a61db162efe433188df",
			"staff_ref": "",
			"pickup_time": "18:15",
			"items": [
				{
					"menu_ref": "65f739ffdb162efe433154aa",
					"quantity": 2,
					"subtotal": 26.44
				},
				{
					"menu_ref": "65f739ffdb162efe433a01a0",
					"quantity": 1,
					"subtotal": 11.20
				}
			],
			"total": 37.64,
			"status": "completed"
		},
		{
			"_id": "65f739ffdb162efe433103ab",
			"customer_ref": "65f739ffdb162efe433188db",
			"restaurant_ref": "65f73a61db162efe433188df",
			"staff_ref": "",
			"pickup_time": "20:15",
			"items": [],
			"total": 25.50,
			"status": "ordered"
		}
	];

	const menu = [
		{
			"_id": "65f739ffdb162efe433154aa",
			"restaurant_ref": "65f73a61db162efe433188df",
			"name": "Ginger Beef",
			"price": 13.22,
			"discount": 0,
			"image": "https://carlsbadcravings.com/wp-content/uploads/2021/10/ginger-beef-3.jpg",
			"available": true,
			"on_special": false
		},
		{
			"_id": "65f739ffdb162efe433a01a0",
			"restaurant_ref": "65f73a61db162efe433188df",
			"name": "Beef and Broccoli",
			"price": 11.20,
			"discount": 0,
			"image": "https://hips.hearstapps.com/hmg-prod/images/delish-230510-beef-broccoli-613-rv-index-646bca228a2b3.jpg?crop=0.8890731909599834xw:1xh;center,top&resize=1200:*",
			"available": true,
			"on_special": false
		},
		{
			"_id": "65f739ffdb162efe433ad4a0",
			"restaurant_ref": "65f73a61db162efe433188df",
			"name": "Fried Rice",
			"price": 9.55,
			"discount": 0,
			"image": "https://www.seriouseats.com/thmb/BJjCEDw9OZe95hpZxmNcD3rJnHo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20230529-SEA-EggFriedRice-AmandaSuarez-hero-c8d95fbf69314b318bc279159f582882.jpg",
			"available": true,
			"on_special": false
		}
	];

	return (
		<div>
			<EmployeeOrderHistoryTable
				orders={orders}
				customers={customers}
				restaurants={restaurants}
				menu={menu}
			/>
		</div>
	)
}

export default EmployeeOrderHistory;