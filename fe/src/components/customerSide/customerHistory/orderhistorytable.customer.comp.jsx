/**
 * orderhistorytable.customer.comp.jsx
 */

const CustomerOrderHistoryTable = ({orders}) => {
	// Sorts orders by status, shows active at top
	// orderSort({
	// 	data: orders,
	// 	sortBy: [...statusSortBy, "other"],
	// 	sortField: "status"
	// });

	console.log(orders);

	return (
		<div className="overflow-x-auto pl-32 pr-32">
			<table className="table w-full drop-shadow-md">
				<thead className='bg-'>
				<tr className="text-base">
					<th>Status</th>
					<th>Restaurant</th>
					<th>Price</th>
					<th></th>
				</tr>
				</thead>
				<tbody>
				{orders.map(order => (
					<tr>
						<td>
							<span
								className={order.status === "completed" ? "badge badge-md badge-accent hover:badge-success w-32" : "w-32 badge badge-md badge-error"}>{order.status}</span>
						</td>
						<td>
							<div>
								<div className="font">{order.restaurant_ref.name}</div>
							</div>
						</td>
						<td>
							{'$' + order.total.toFixed(2)}
						</td>
						<th className='flex justify-center'>
							<button className="btn btn-info"
									onClick={() => document.getElementById('my_modal_' + order._id).showModal()}
							>
								view order
							</button>
							<dialog id={"my_modal_" + order._id} className="modal">
								<div className="modal-box" data-theme='cupcake'>
									<h3 className="text-lg">Order: <i>{order._id}</i></h3>
									<div>
										<table className='table table-zebra'>
											<thead>
											<tr className="text-sm">
												<th>Item Name</th>
												<th>Quantity</th>
												<th>Subtotal</th>
											</tr>
											</thead>
											<tbody>
											{order.items.map(item => (
												<tr>
													{/*<td>{item.menu_ref.name}</td>*/}
													<td></td>
													<td>{item.quantity}</td>
													<td>{'$' + item.subtotal.toFixed(2)}</td>
												</tr>
											))}
											</tbody>
											<tfoot>
											<tr className='outline outline-2 outline-blue-500 text-sm'>
												<td></td>
												<td>Total:</td>
												<td>${order.total}</td>
											</tr>
											</tfoot>
										</table>
									</div>
									<div>
										<p>Restaurant: {order.restaurant_ref.name}</p>
										<p>Location: {order.restaurant_ref.location}</p>
										<p>Pickup Time: {order.pickup_time}</p>
										<p>Status: {order.status}</p>
										{/*<p>Fulfilled by: {order.staff_ref}</p>*/}
									</div>
									<div className="justify-center">
										<div className="modal-action">
											<form method="dialog">
												{/* if there is a button in form, it will close the modal */}
												<button className="btn btn-primary w-24">Close</button>
											</form>
										</div>
									</div>
								</div>
							</dialog>
						</th>
					</tr>
				))}
				</tbody>
			</table>
		</div>
	);
};

export default CustomerOrderHistoryTable;