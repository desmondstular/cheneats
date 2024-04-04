import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import {useParams, Link, useNavigate} from "react-router-dom";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Modal from 'react-modal';
import {ThemeContext} from "../../.store/ThemeContext.jsx";
import Cookies from "js-cookie";
import EmployeeNavBar from "../../components/employeeSide/navbar.employee.comp.jsx";
import TrashCanIcon from '../../icons/trash.svg';
import EditIcon from '../../icons/edit.png';

function EmployeeEditMenu() {
	const {restaurantID} = useContext(ThemeContext);
	const navigate = useNavigate();

	useEffect(() => {
		// If cookie for customer returns undefined, route to login page
		if (Cookies.get('restaurantID') === undefined || Cookies.get('employeeID') === undefined) {
			navigate('/', {replace: true});
		}
	}, []);
	
    const [menuItems, setMenuItems] = useState([]);
    const [selectedMenuItem, setSelectedMenuItem] = useState(null);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [newModalIsOpen, setNewModalIsOpen] = useState(false);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [editedItem, setEditedItem] = useState({
        name: "",
        price: 0,
        available: false,
        discount: 0,
        on_special: false
    });
    const [newMenuItem, setNewMenuItem] = useState({
        name: "",
        price: 0,
        available: false,
        discount: 0,
        restaurant_ref: restaurantID,
        image : "",
        on_special: false
    });
    
    useEffect(() => {
        const delay = setTimeout(() => {
            axios.get(`http://localhost:8000/menu/restaurant/${restaurantID}`)
                .then(result => setMenuItems(result.data))
                .catch(err => console.error(err));
        }, 50);
        return () => clearTimeout(delay);
    }, [restaurantID]);

    const openEditModal = (menuItem) => {
        setSelectedMenuItem(menuItem);
        setEditedItem({ ...menuItem });
        setEditModalIsOpen(true);
    };

    const openNewModal = (newMenuItem) => {
        setNewMenuItem({ ...newMenuItem });
        // setNewMenuItem(newMenuItem);
        setNewModalIsOpen(true);
    };

    const openDeleteModal = (menuItem) => {
        setSelectedMenuItem({ ...menuItem });
        setDeleteModalIsOpen(true);
    };

    const closeEditModal = () => {
        setEditModalIsOpen(false);
    };

    const closeNewModal = () => {
        setNewModalIsOpen(false);
    };

    const closeDeleteModal = () => {
        setDeleteModalIsOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name)
        console.log(value)
        setEditedItem({ ...editedItem, [name]: value });
    };

    const handleNewInputChange = (e) => {
        const { name, value } = e.target;
        setNewMenuItem({ ...newMenuItem, [name]: value });
    };

    const handleEditSubmit = () => {
        // Send updated menu item to backend via PATCH request
        axios.patch(`http://localhost:8000/menu/${selectedMenuItem._id}`, editedItem)
            .then(() => {
                // Update local state or refetch menu items
                // You can either update menuItems state or refetch menu items from backend
                axios.get(`http://localhost:8000/menu/restaurant/${restaurantID}`)
                .then(result => setMenuItems(result.data))
                .catch(err => console.error(err));
                closeEditModal();
            })
            .catch(err => console.error(err));
    };

    const handleNewSubmit = () => {
        // Send updated menu item to backend via PATCH request
        axios.post(`http://localhost:8000/menu/`, newMenuItem)
            .then(() => {
                // Update local state or refetch menu items
                // You can either update menuItems state or refetch menu items from backend
                axios.get(`http://localhost:8000/menu/restaurant/${restaurantID}`)
                .then(result => setMenuItems(result.data))
                .catch(err => console.error(err));
                closeNewModal();
            })
            .catch(err => console.error(err));
    };

    const deleteItem = (menuItem) => {
        axios.delete(`http://localhost:8000/menu/${menuItem._id}`)
        .then(() => {
            // Update local state or refetch menu items
            // You can either update menuItems state or refetch menu items from backend
            axios.get(`http://localhost:8000/menu/restaurant/${restaurantID}`)
            .then(result => setMenuItems(result.data))
            .catch(err => console.error(err));
            closeDeleteModal();
        })
        .catch(err => console.error(err));
    }

    return (
		<div>
			<EmployeeNavBar/>
			<div className="d-flex vh-100 justify-content-center align-items-center">
				<div className="w-3/4 bg-white rounded p-3">
					<div className="btn-group pb-2">
						<button onClick={() => openNewModal(newMenuItem)} className='btn text-white bg-green-500 hover:bg-green-600'>Add a Menu Item +</button>
					</div>
					<TableContainer sx={{ maxHeight: 600, maxWidth: 1400, height: 'auto', margin: 'auto' }} component={Paper}>
						<table className="table">
							<thead>
							<tr>
								<th>Image</th>
								<th>Name</th>
								<th>Price</th>
								<th>Available</th>
								<th>Discount</th>
								<th>On Special</th>
								<th>Edit</th>
								<th>Delete</th>
							</tr>
							</thead>
							<tbody>
							{menuItems.map((menuItem) => (
								<tr key={menuItem._id}>
									<td><img src={menuItem.image} alt={menuItem.name} style={{ maxHeight: 120, maxWidth: 80, width: 'auto', height: 'auto', margin: 'auto' }} /></td>
									<td>{menuItem.name}</td>
									<td>${menuItem.price}</td>
									<td>{menuItem.available ? 'Yes' : 'No'}</td>
									<td>{menuItem.discount}</td>
									<td>{menuItem.on_special ? 'Yes' : 'No'}</td>
									<td>
                                        <button onClick={() => openEditModal(menuItem)} className='btn flex items-center text-white bg-cyan-500 hover:bg-cyan-600 py-2 px-4 rounded-lg'>
                                        <img src={EditIcon} className="h-6 w-6 mr-2" alt="Edit Icon" />
                                        Edit
                                        </button>
                                    </td>
									<td>
                                        <button onClick={() => openDeleteModal(menuItem)} className="btn flex items-center text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded-lg">
                                        <img src={TrashCanIcon} className="h-6 w-6 mr-2" alt="Trash Can Icon" />
                                        Delete
                                        </button>
									</td>
								</tr>
							))}
							</tbody>
						</table>
					</TableContainer>
					<Modal
						isOpen={editModalIsOpen}
						onRequestClose={closeEditModal}
						contentLabel="Change Menu Item"
						style={{
							content: {
								width: '400px',
								margin: 'auto',
								borderRadius: '8px',
								padding: '20px',
								height : '460px'
							}}}>
						<div className="d-flex justify-content-center align-items-center">
							<h2>Edit Menu Item</h2>
						</div>
						<form onSubmit={handleEditSubmit}>
							<div className="form-group">
								<label>Name </label>
								<input type="text" name="name" value={editedItem.name} onChange={handleInputChange} className="form-control" />
							</div>
							<div className="form-group">
								<label>Price</label>
								<input type="number" name="price" value={editedItem.price} onChange={handleInputChange} step="any" className="form-control" />
							</div>
							<div className="form-group">
								<label>Available</label>
								<select name="available" value={editedItem.available} onChange={handleInputChange} className="form-control">
									<option value={true}>Yes</option>
									<option value={false}>No</option>
								</select>
							</div>
							<div className="form-group">
								<label>Sale Price</label>
								<input type="number" name="discount" value={editedItem.discount} onChange={handleInputChange} step="any" className="form-control" />
							</div>
							<div className="form-group">
								<label>On Special</label>
								<select name="on_special" value={editedItem.on_special} onChange={handleInputChange} className="form-control">
									<option value={true}>Yes</option>
									<option value={false}>No</option>
								</select>
							</div>
							<div className="d-flex justify-content-between mt-3">
								<button type="button" className="btn text-white bg-red-500 hover:bg-red-600" onClick={closeEditModal}>Discard Changes</button>
								<button type="submit" className="btn text-white bg-green-500 hover:bg-green-600">Save Changes</button>
							</div>
						</form>
					</Modal>
					<Modal
						isOpen={newModalIsOpen}
						onRequestClose={closeNewModal}
						contentLabel="Add Menu Item"
						style={{
							content: {
								width: '400px',
								margin: 'auto',
								borderRadius: '8px',
								padding: '20px',
								height : '540px'
							}}}>
						<div className="d-flex justify-content-center align-items-center">
							<h2>Add Menu Item</h2>
						</div>
						<form onSubmit={handleNewSubmit}>
							<div className="form-group new">
								<label>Name</label>
								<input type="text" name="name" value={newMenuItem.name} onChange={handleNewInputChange} className="form-control" />
							</div>
							<div className="form-group">
								<label>Price</label>
								<input type="number" name="price" value={newMenuItem.price} onChange={handleNewInputChange} step="any" className="form-control" />
							</div>
							<div className="form-group">
								<label>Available</label>
								<select name="available" value={newMenuItem.available} onChange={handleNewInputChange} className="form-control">
									<option value={true}>Yes</option>
									<option value={false}>No</option>
								</select>
							</div>
							<div className="form-group">
								<label>Discount</label>
								<input type="number" name="discount" value={newMenuItem.discount} onChange={handleNewInputChange} step="any" className="form-control" />
							</div>
							<div className="form-group">
								<label>Image Link</label>
								<input type="text" name="image" value={newMenuItem.image} onChange={handleNewInputChange} className="form-control" />
							</div>
							<div className="form-group">
								<label>On Special</label>
								<select name="on_special" value={editedItem.on_special} onChange={handleNewInputChange} className="form-control">
									<option value={true}>Yes</option>
									<option value={false}>No</option>
								</select>
							</div>
							<div className="d-flex justify-content-between mt-3">
								<button type="button" className="btn text-white bg-red-500 hover:bg-red-600" onClick={closeNewModal}>Discard Changes</button>
								<button type="submit" className="btn text-white bg-green-500 hover:bg-green-600">Add Item</button>
							</div>
						</form>
					</Modal>
					<Modal
						isOpen={deleteModalIsOpen}
						onRequestClose={closeDeleteModal}
						contentLabel="Confirmation"
						style={{
							content: {
								width: '400px',
								height : '130px',
								margin: 'auto',
								borderRadius: '8px',
								padding: '20px',
							}
						}}>
						<h2>Are you sure you want to delete this item?</h2>
						<div className="d-flex justify-content-between mt-3">
							<button onClick={() => deleteItem(selectedMenuItem)} className="btn bg-gray-200 hover:bg-gray-400">Yes</button>
							<button onClick={closeDeleteModal} className="btn bg-gray-200 hover:bg-gray-400">No</button>
						</div>
					</Modal>

				</div>
			</div>
		</div>
    );
}

export default EmployeeEditMenu;
