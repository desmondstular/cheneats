import {useContext, useState} from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist//css/bootstrap.min.css'
import Login from './routes/login.route.jsx'
import CustomerHome from './routes/customer/home.customer.route.jsx'
import CustomerOrder from './routes/customer/order.customer.route.jsx'
import EmployeeAnalytics from './routes/employee/analytics.employee.route.jsx'
import EmployeeHome from './routes/employee/home.employee.route.jsx'
import EmployeeEditMenu from './routes/employee/editmenu.employee.route.jsx'
import EmployeeEditProfile from './routes/employee/editprofile.employee.route.jsx'
import EmployeeOrderHistory from './routes/employee/orderhistory.employee.route.jsx'
import CustomerOrderHistory from './routes/customer/orderhistory.customer.route.jsx'

function App() {
	// Define the front end routing
	// Reference CustomerHome or EmployeeHome to view context and
	// and cookie usage.
	return (
		<BrowserRouter>
			<div className="App">
				<div>
					<Routes>
						<Route path='/' element={<Login/>}/>
						<Route path='/customerHome/' element={<CustomerHome/>}/>
						<Route path='/customerOrder/:restaurantID' element={<CustomerOrder/>}/>
						{/*<Route path='/customerOrderHistory' element={<CustomerOrderHistory/>}/>*/}
						<Route path='/customerOrderHistory' element={<CustomerOrderHistory/>}/>

						<Route path='/employeeHome' element={<EmployeeHome/>}/>
						<Route path='/employeeEditMenu' element={<EmployeeEditMenu/>}/>
						<Route path='/employeeOrderHistory' element={<EmployeeOrderHistory/>}/>
						<Route path='/employeeAnalytics' element={<EmployeeAnalytics/>}/>
						<Route path='/employeeEditProfile' element={<EmployeeEditProfile/>}/>

						{/* Example on setting up route to handle data passing */}
						{/* <Route path='/storeOrder/:restaurantId/:customerId' element={<StoreOrder />} /> */}
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App