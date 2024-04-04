/**
 * orderhistorytable.employee.comp.jsx
 */
import {orderSort, statusSortBy} from "./orderhistoryhelpers.employee.js";

export const EmployeeOrderHistoryTable = ({orders}) => {
	// Sorts orders by status, shows active at top
	orderSort({
		data: orders,
		sortBy: [...statusSortBy, "other"],
		sortField: "status"
	});

	// filter away in cart
	orders = orders.filter(function( obj ) {
		return obj.status !== 'carted';
	});

	return (
		<div className="overflow-x-auto pl-32 pr-32">
			<table className="table w-full drop-shadow-md">
				<thead>
					<tr className="text-base">
						<th>Status</th>
						<th>Customer</th>
						<th>Price</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
				{orders.map(order => (
					<tr>
						<td>
							<span
								className={order.status === "completed" ? "badge badge-md badge-accent hover:badge-success w-24" : "w-24 badge badge-md badge-error"}>{order.status}</span>
						</td>
						<td>
							<div>
								<div className="font-bold">{order.customer_ref.name}</div>
								<div className="text-sm opacity-50">{order.customer_ref.email}</div>
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
								<div className="modal-box">
									<h3 className="text-lg">Order: <i>{order._id}</i></h3>
									<div>
										<table className='table drop-shadow-md'>
											<thead>
											<tr className="text-sm">
												<th className='bg-blue-300'>Item Name</th>
												<th>Quantity</th>
												<th>Subtotal</th>
											</tr>
											</thead>
											<tbody>
												{order.items.map(item => (
													<tr>
														<td>{item.menu_ref ? item.menu_ref.name : 'undefined'}</td>
														<td>{item.quantity}</td>
														<td>{'$' + item.subtotal.toFixed(2)}</td>
													</tr>
												))}
											</tbody>
											<tfoot>
												<tr className='text-sm'>
													<td></td>
													<td>Total:</td>
													<td>${order.total}</td>
												</tr>
											</tfoot>
										</table>
									</div>
									<div>
										<p>Customer: {order.customer_ref.name} ({order.customer_ref.email})</p>
										<p>Pickup Time: {order.pickup_time}</p>
										<p>Status: {order.status}</p>
										<p>Fulfilled by: {order.staff_ref ? order.staff_ref.name : 'undefined'}</p>
									</div>
									<div className="justify-center">
										<div className="modal-action">
											<form method="dialog">
												{/* if there is a button in form, it will close the modal */}
												<button className="btn btn-primary w-24" data-theme='cupcake'>Close</button>
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

export default EmployeeOrderHistoryTable;