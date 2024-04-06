import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
const convertTimeFormat = (timeString) => {
    // Convert the time string to hours and minutes
	const year = timeString.substring(0, 4);
	const month = timeString.substring(4, 6);
	const day = timeString.substring(6, 8); 
    const hours = parseInt(timeString.substring(0, 2));
    const minutes = parseInt(timeString.substring(2, 4));

    // Determine AM or PM
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    const hours12 = hours % 12 || 12;

    // Pad minutes with leading zero if needed
    const paddedMinutes = String(minutes).padStart(2, '0');

    // Construct the formatted time string
    const formattedTime = `${year}/${month}/${day}/${hours12}:${paddedMinutes} ${period}`;

    return formattedTime;
};

export const LiveOrderTable = ({ orders, active, handler }) => {
	// filter away in cart
	orders = orders.filter(function( obj ) {
		return obj.status !== 'carted' && obj.status !== 'completed'
	});


	return (
		<div className="bg-white rounded w-full max-w-full text-center">
			<div className="text-lg h-20 flex items-center justify-center border-b border-gray-200 sticky top-0 bg-white z-10">
				<div className="flex-1"></div>
				<div className="flex-1">Status</div>
				<div className="flex-1">Customer</div>
				<div className="flex-1">Pickup time</div>
			</div>
			<div className="overflow-y-auto">
				{orders.length === 0 ? (<div></div>) : orders.map((order, index) => (
					<div id={index} onClick={handler}>
						<div className={`h-24 text-lg flex items-center justify-between px-4 ${active === index ? 'bg-blue-50' : ''}`}>
							<div className="flex-1">{index + 1}</div>
							<div className="flex-1">
								<span className={`h-8 w-32 font-extrabold badge badge-md ${order.status === 'ordered' ? "badge-error" : "bg-chen-blue"}`}>{order.status}</span>
							</div>
							<div className="flex-1">
								<div className="font-semibold">{order.customer_ref.name}</div>
								<div className="text-sm opacity-50">{order.customer_ref.email}</div>
							</div>
							<div className="flex-1 font-semibold">{convertTimeFormat(order.pickup_time)}</div>
						</div>
						{index < orders.length - 1 && (
							<div className="border-b border-gray-200"></div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}
