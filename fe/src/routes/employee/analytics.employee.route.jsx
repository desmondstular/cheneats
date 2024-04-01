import EmployeeNavBar from "../../components/employeeSide/navbar.employee.comp.jsx";
import {useContext, useEffect} from "react";
import {ThemeContext} from "../../.store/ThemeContext.jsx";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

const EmployeeAnalytics = () => {
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

export default EmployeeAnalytics