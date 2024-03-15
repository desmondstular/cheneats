/**
 * orderhistorytable.employee.comp.jsx
 */

export const EmployeeOrderHistoryTable = () => {
	return (
		<div className="overflow-x-auto">
			<table className="table">
				<thead>
				<tr>
					<th>
						<label>
							<input type="checkbox" className="checkbox"/>
						</label>
					</th>
					<th>Name</th>
					<th>Job</th>
					<th>Favorite Color</th>
					<th></th>
				</tr>
				</thead>
				<tbody>
				{/* row 1 */}
				<tr>
					<th>
						<label>
							<input type="checkbox" className="checkbox"/>
						</label>
					</th>
					<td>
						<div className="flex items-center gap-3">
							<div className="avatar">
								<div>
									<img className='h-auto max-w-24 rounded-full object-cover object-center'
										 src="../../../../public/guy-holding-food.png"
										 alt="Avatar Tailwind CSS Component"/>
								</div>
							</div>
							<div>
								<div className="font-bold">Hart Hagerty</div>
								<div className="text-sm opacity-50">United States</div>
							</div>
						</div>
					</td>
					<td>
						Zemlak, Daniel and Leannon
						<br/>
						<span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
					</td>
					<td>Purple</td>
					<th>
						<button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>
							view order
						</button>
						<dialog id="my_modal_1" className="modal">
							<div className="modal-box">
								<h3 className="font-bold text-lg">Hello!</h3>
								<p className="py-4">Press ESC key or click the button below to close</p>
								<div className="modal-action">
									<form method="dialog">
										{/* if there is a button in form, it will close the modal */}
										<button className="btn">Close</button>
									</form>
								</div>
							</div>
						</dialog>
					</th>
				</tr>
				</tbody>
			</table>
		</div>
	)
};

export default EmployeeOrderHistoryTable;