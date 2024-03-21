import { Link } from "react-router-dom";

const EmployeeHome = () => {
	return (
		<div>
			<Link to="/employeeOrderHistory" className='btn btn-success'> Order History</Link>
		</div>
	)
}

export default EmployeeHome;
