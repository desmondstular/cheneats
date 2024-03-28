import {useContext, useEffect} from "react";
import {ThemeContext} from "../../.store/ThemeContext.jsx";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import CustomerNavBar from "../../components/customerSide/navbar.customer.comp.jsx";

const CustomerOrderHistory = () => {
	const {customerID} = useContext(ThemeContext);
	const navigate = useNavigate();

	useEffect(() => {
		// If cookie for customerID returns undefined, route to login
		if (Cookies.get('customerID') === undefined) {
			navigate('/', {replace: true});
		}
	}, []);

	return (
		<div>
			<CustomerNavBar/>
		</div>
	)
}

export default CustomerOrderHistory