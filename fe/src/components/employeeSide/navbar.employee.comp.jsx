import {Link, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import UserIcon from '../../icons/user.png';

const EmployeeNavBar = () => {
	const navigate = useNavigate();

	const onClickLogout = () => {
		Cookies.remove('employeeID');
		Cookies.remove('restaurantID');
		Cookies.remove('customerID');
		navigate('/', {replace: true});
	}

	const onClickProfile = () => {
		navigate('/employeeEditProfile', {replace: true});
	}

    return (
		<div className="navbar h-19 shadow-md bg-white">
			<div className='flex-1'>
				<a className='flex items-center gap-2'>
					<div className="w-14 rounded-full drop-shadow-xl">
						<img alt="ChenEats Logo"
							 src="chen-transparent-cropped.png"/>
					</div>
					<p className="text-2xl"><b>ChenEats</b></p>
				</a>
				<div className='flex-1'>
					<div className='flex justify-center gap-2'>
						<Link to='/employeeHome' className="btn btn-ghost text-md">Home</Link>
						<Link to='/employeeEditMenu/' className="btn btn-ghost text-md">Menu</Link>
						<Link to='/employeeOrderHistory' className="btn btn-ghost text-md">Order History</Link>
						<Link to='/employeeAnalytics' className="btn btn-ghost text-md">Analytics</Link>
					</div>
				</div>
				<div className="flex-none">
					<div className="dropdown dropdown-end">
						<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
							<div className="w-10 rounded-full">
								<img alt="Tailwind CSS Navbar component"
									 src={UserIcon}/>
							</div>
						</div>
						<ul tabIndex={0}
							className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
							<li>
								<li onClick={onClickProfile} className="justify-between">
									Profile
								</li>
							</li>
							<li onClick={onClickLogout}><a>Logout</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EmployeeNavBar;