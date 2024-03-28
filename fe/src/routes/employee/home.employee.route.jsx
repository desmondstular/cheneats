import {Link, useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {ThemeContext} from "../../.store/ThemeContext.jsx";
import Cookies from "js-cookie";

const EmployeeHome = () => {
	const {restaurantID, employeeID} = useContext(ThemeContext);
	const navigate = useNavigate();

	useEffect(() => {
		// If cookie for customer returns undefined, route to login page
		if (Cookies.get('restaurantID') === undefined || Cookies.get('employeeID') === undefined) {
			navigate('/', {replace: true});
		}
	}, []);

	return (
		<div>
			<Link to="/employeeOrderHistory" className='btn btn-success'> Order History</Link>
		</div>
	)
}

export default EmployeeHome;
