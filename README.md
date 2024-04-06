# ChenEats: Restaurant Takeout App
This is a restaurant food takeout web application. Customers are able to order food and drinks from local restaurants. Restaurants are able to process orders and notify the customer when the order is available for them to pickup. Restaurants are able to add items and adjust prices which will be visible to customers when they create their orders. As the status of an order is progressed, they will eventually become notified when it is available for pickup.

## How To Access
To use this web application, clone the github repository to your local machine. After it is cloned, make sure you have node.js installed on your machine. If so, open a terminal and run the following command inside both the "fe" and "be" directories to install the required dependencies:

`npm install`

After you have completed these steps, to spin up the web application, change to the "fe" directory and run the following command to run the web application:

`npm run dev`

After you have done, this to spin up the backend, run the following command inside the "be" directory:

`npm run start`

The web application should be running locally on your machine now. You can now go to a web browser and enter the following link http://localhost:5173 where you will be greeted with the login page.

_Notice:_ This web application requires customer, staff, and restaurant data to be already loaded within the backend. There has been data supplied within the root directory of this application inside `/data` folder. There are also order and menu items supplied, but they are optional for you to add as they can be created within the application. 

Start by creating a database called 315fp inside your MongoDB local server. Inside this database, create the following collections and add the associated json files:

- customers = customer.json
- restaurants = restaurant.json
- staffs = staff.json
  
_optional:_
- menus : menu.json
- orders : order.json

After you have loaded this data, the application should be ready to be used.

## How To Use

### Customer
On the login screen, you can enter one of the email addresses associated with a customer provided within the customer.json file. After you have done this, click on the login button to be redirected to the home customer page. On this page, you will be able to see cards showing the restaurants available to be ordered from on the left side and any active orders you might have on the right. To make an order, you can click on one of the restaurant cards where you will be redirected to the order page for the restaurant. Here you can select the quantity of each item to add to your cart. One you have selected the menu items you want, you can click the checkout button inside the cart box on the right side of the screen where you can set a desired pickup time before hitting the checkout button to send your order to the restaurant. This will redirect you back to the home page where you can view the status of your order on the right. To view past orders, you can click the order history button in the top nav bar and view past orders you have made.

### Employee
On the login screen, you can enter one of the email addresses associated with an employee provided within the employee.json file. After you have done this, click on the login button to be redirected to the home restaurant page. Here you will now see the order processing system. If there are active orders, they will be displayed in the table at the bottom which you are able to then click on the rows of any of the orders to load one of them to view. After clicking one, you will be able to view the order information in the top left card. Menu items that the customer ordered will be available in the top right card. The middle card contains the current time and the status timeline of the current order selected. If you wish to progress the status of the order, you can click the next button within the middle card. If you wish to go back on the status of an order, you can click the back button the left side of the middle card. One you have reached the ready for pickup status, if you click next, the system will then ask you to confirm the order as complete with a popup box. If you wish to confirm, you can click the confirm button within this box to finish the order. Otherwise you can click cancel to stop the status progression. If you clicked confirm, the order will then be removed from the order table and the next order will be loaded.

If wish to add, edit or delete items from your restaurant, clicking the "Menu" button will redirect you to the edit menu page where you can do so. Here you can also set discounts on items and set an item to sold out or on special. If you wish to view the restaurants order history, you can click on the "Order History" tab within the top navigation bar which you will then be redirected to the order history page. If you want to view analytics on top items sold, total sales, and other statistics about the restaurant, you can click on the "Analytics" tab on the top navigation bar. Here you will then be redirected to the analytics page where you can view these statistics. If you want to edit restaurant information, you are able to click the profile picture in the top right which will have a dropdown tab that shows profile. If you click on it, it will redirect you to the edit profile page where you can change the information of your restaurant. If you want to logout, click on the logout page within the same dropdown menu as the profile picture.

## Special Features
### Cookies
When you log in to either a customer or employee account, the restaurant or employee ids will be stored as cookies your browser.
### Discount/Special Items
Items that are set to on special will be displayed as their discount price for customers to order.
### Customer cart
Customers have individual carts for each restaurant that will save the items if they leave the checkout process before sending the order to the restaurant.
