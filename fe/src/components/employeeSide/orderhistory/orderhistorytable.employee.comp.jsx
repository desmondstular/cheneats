/**
 * orderhistorytable.employee.comp.jsx
 */
import axios from "axios";

export const EmployeeOrderHistoryTable = ({orders, customers, restaurant}) => {
	const sortBy = ["ordered", "in-progress", "awaiting-pickup", "completed"];
	let i = 0;

	// Join orders and customers by ref, attach customer name to order
	orders.forEach((order) => {
		const { name, email } = customers.find(({_id}) => _id === order.customer_ref);
		order["customer_name"] = name;
		order["customer_email"] = email;
	});

	const customSort = ({ data, sortBy, sortField }) => {
		const sortByObject = sortBy.reduce((obj, item, index) => {
			return {
				...obj,
				[item]: index
			};
		}, {});
		return data.sort(
			(a, b) => sortByObject[a[sortField]] - sortByObject[b[sortField]]
		);
	};

	customSort({
		data: orders,
		sortBy: [...sortBy, "other"],
		sortField: "status"
	});

	return (
		<div className="overflow-x-auto">
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
							<div className="flex items-center gap-3">
								{/*<div className="avatar">*/}
								{/*	/!*<div>*!/*/}
								{/*		/!*<img className='h-auto max-w-24 rounded-full object-cover object-center'*!/*/}
								{/*		/!*	 src="../../../../public/guy-holding-food.png"*!/*/}
								{/*		/!*	 alt="Avatar Tailwind CSS Component"/>*!/*/}
								{/*	/!*</div>*!/*/}
								{/*</div>*/}
								<div>
									<div className="font-bold">{order.customer_email}</div>
									<div className="text-sm opacity-50">{order.customer_name}</div>
								</div>
							</div>
						</td>
						<td>
							{'$' + order.total.toFixed(2)}
						</td>
						<th>
							<button className="btn text-amber-50 bg-blue-700 hover:bg-blue-300" onClick={() => document.getElementById('my_modal_' + order._id).showModal()}>
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
										</table>
									</div>
									<p className="py-4">Press ESC key or click the button below to close</p>
									<div className="modal-action">
										<form method="dialog">
											{/* if there is a button in form, it will close the modal */}
											<button className="btn btn-success">Close</button>
										</form>
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