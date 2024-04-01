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

	return (
		<div className="overflow-x-auto rounded-box p-4">
			<table className="table">
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
							<span className={order.status === "completed" ? "badge badge-md badge-accent hover:badge-success" : " badge badge-md badge-error" }>{order.status}</span>
						</td>
						<td>
							<div>
								<div className="font-bold">{order.customer_ref}</div>
								<div className="text-sm opacity-50">{order.customer_ref}</div>
							</div>
						</td>
						<td>
							{'$' + order.total.toFixed(2)}
						</td>
						<th>
							<button className="btn btn-info" onClick={() => document.getElementById('my_modal_' + order._id).showModal()}>
								view order
							</button>
							<dialog id={"my_modal_" + order._id} className="modal">
								<div className="modal-box bg-amber-50">
									<h3 className="text-lg">Order ID: <i>{order._id}</i></h3>
									<div className='outline outline-1'>
										<table className='table'>
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
														<td>{item.menu_ref}</td>
														<td>{item.quantity}</td>
														<td>{'$' + item.subtotal.toFixed(2)}</td>
													</tr>
												))}
											</tbody>
											<tfoot>
												<tr className='outline outline-1 outline-blue-500 text-sm'>
													<td></td>
													<td>Total:</td>
													<td>${order.total}</td>
												</tr>
											</tfoot>
										</table>
									</div>
									<div>
										<p>Customer: {order.customer_name} ({order.customer_email})</p>
										<p>Pickup Time: {order.pickup_time}</p>
										<p>Status: {order.status}</p>
										<p>Fulfilled by: {order.staff_ref}</p>
									</div>
									<div className="flex gap-10 grow">
										<p className="py-4">Press ESC key or click the button below to close</p>
										<div className="modal-action">
											<form method="dialog">
												{/* if there is a button in form, it will close the modal */}
												<button className="btn btn-success">Close</button>
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
	)
};

export default EmployeeOrderHistoryTable;