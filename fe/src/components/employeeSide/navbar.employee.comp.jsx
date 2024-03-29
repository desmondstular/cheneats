import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {ThemeContext} from "../../.store/ThemeContext.jsx";
import Cookies from "js-cookie";

const EmployeeNavBar = () => {
	const navigate = useNavigate();

	const onClickLogout = () => {
		Cookies.remove('employeeID');
		Cookies.remove('restaurantID');
		Cookies.remove('customerID');
		navigate('/', {replace: true});
	}

    return (
		<div className="navbar h-19 shadow-md bg-white">
			<div className='flex-1'>
				<a className='flex items-center gap-2'>
					<div className="w-14 rounded-full drop-shadow-xl">
						<img alt="Tailwind CSS Navbar component"
							 src="https://cdn.discordapp.com/attachments/1197608255724191907/1220112755114381332/chen-transparent-cropped.png?ex=660dc18d&is=65fb4c8d&hm=b7915afbbe613aa60741c9025d6fe3563762eebe711592f3e2297f48a79f9f2f&"/>
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
						<div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
							<div className="indicator">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
									 viewBox="0 0 24 24"
									 stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
										  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
								</svg>
								<span className="badge badge-sm indicator-item">8</span>
							</div>
						</div>
						<div tabIndex={0}
							 className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
							<div className="card-body">
								<span className="font-bold text-lg">8 Items</span>
								<span className="text-info">Subtotal: $999</span>
								<div className="card-actions">
									<button className="btn btn-primary btn-block">View cart</button>
								</div>
							</div>
						</div>
					</div>
					<div className="dropdown dropdown-end">
						<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
							<div className="w-10 rounded-full">
								<img alt="Tailwind CSS Navbar component"
									 src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
							</div>
						</div>
						<ul tabIndex={0}
							className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
							<li>
								<a className="justify-between">
									Profile
									<span className="badge">New</span>
								</a>
							</li>
							<li><a>Settings</a></li>
							<li onClick={onClickLogout}><a>Logout</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EmployeeNavBar;