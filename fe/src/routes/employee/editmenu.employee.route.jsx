// needs the restaurant obj ID passed
// find the menu in mongo db where "restaurant_ref" == restauarantId
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function EmployeeEditMenu () {
    const { restaurantId } = useParams();
    const [menuItems, setMenuItems] = useState([]);

    useEffect( () => {
        axios.get(`http://localhost:8000/menu/restaurant/${restaurantId}`)
        .then(result => setMenuItems(result.data))
        .catch(err => console.log(err))
    }, [])

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-60 bg-white rounded p-3">
                <div className="btn-group">
                    <Link to="/createMenuItem" className='btn btn-secondary rounded-end'> Add a Menu Item +</Link>
                </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Available</th>
                        <th>Discount</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {menuItems.map((menuItem) => (
                        <tr key={menuItem._id}>
                            <td><img src={menuItem.image} alt={menuItem.name} style={{maxHeight: 100, maxWidth : 150, width : 'auto', height : 'auto', margin :'auto'}} /></td>
                            <td>{menuItem.name}</td>
                            <td>${menuItem.price}</td>
                            <td>{menuItem.available ? 'Yes' : 'No'}</td>
                            <td>{menuItem.discount}</td>
                            <td><Link to={`/editMenu/${menuItem._id}`} className='btn btn-secondary rounded-end' >Edit</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    );
}

export default EmployeeEditMenu;