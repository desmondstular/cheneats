export const LiveOrderTable = ({ orders, active, handler }) => {
	// filter away in cart
	orders = orders.filter(function( obj ) {
		return obj.status !== 'carted' && obj.status !== 'completed'
	});

	return (
		<div className="bg-white rounded w-full max-w-full text-center overflow-y-auto">
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
							<div className="flex-1 font-semibold">{order.pickup_time}</div>
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
