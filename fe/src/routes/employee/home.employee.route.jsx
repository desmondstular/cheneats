import {Link, useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {ThemeContext} from "../../.store/ThemeContext.jsx";
import Cookies from "js-cookie";
import EmployeeNavBar from "../../components/employeeSide/navbar.employee.comp.jsx";

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
			<EmployeeNavBar></EmployeeNavBar>
		</div>
	)
}

export default EmployeeHome;
