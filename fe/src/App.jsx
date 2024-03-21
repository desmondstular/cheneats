import {useState} from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist//css/bootstrap.min.css'
import Login from './routes/login.route.jsx'
import CustomerHome from './routes/customer/home.customer.route.jsx'
import CustomerOrder from './routes/customer/order.customer.route.jsx'
import EmployeeAnalytics from './routes/employee/analytics.employee.route.jsx'
import EmployeeHome from './routes/employee/home.employee.route.jsx'
import EmployeeEditMenu from './routes/employee/editmenu.employee.route.jsx'
import EmployeeOrderHistory from './routes/employee/orderhistory.employee.route.jsx'
import CustomerOrderHistory from './routes/customer/orderhistory.customer.route.jsx'
import {ThemeProvider} from ".store/ThemeContext.jsx";

function App() {
	const [count, setCount] = useState(0)

	// Define the front end routing
	return (
		<BrowserRouter>
			<div className="App">
				<div className="vh-100">
					<ThemeProvider>
						<Routes>
							<Route path='/' element={<Login/>}/>
							<Route path='/customerHome/:customerId' element={<CustomerHome/>}/>
							<Route path='/customerOrder/:restaurantId/:customerId' element={<CustomerOrder/>}/>
							<Route path='/customerOrderHistory/:customerId' element={<CustomerOrderHistory/>}/>
							<Route path='/employeeAnalytics/:restaurantId' element={<EmployeeAnalytics/>}/>
							<Route path='/employeeHome' element={<EmployeeHome/>}/>
							<Route path='/employeeEditMenu/:restaurantId' element={<EmployeeEditMenu/>}/>
							<Route path='/employeeOrderHistory' element={<EmployeeOrderHistory/>}/>

							{/* Example on setting up route to handle data passing */}
							{/* <Route path='/storeOrder/:restaurantId/:customerId' element={<StoreOrder />} /> */}
						</Routes>
					</ThemeProvider>
				</div>
			</div>
		</BrowserRouter>
	)
}

export default App