import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import Cookies from "js-cookie";
import {ThemeContext} from "../../.store/ThemeContext.jsx";
import EmployeeNavBar from "../../components/employeeSide/navbar.employee.comp.jsx";

function EmployeeEditProfile () {
    const {restaurantID} = useContext(ThemeContext);
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [phone, setPhone] = useState("")
    const [cuisine, setCuisine] = useState("")
    const [open_time, setOpen_Time] = useState("")
    const [closing_time, setClosing_Time] = useState("")
    const [accepting_orders, setAccepting_orders] = useState(true)
    const [image, setImage] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
		// If cookie for customer returns undefined, route to login page
		if (Cookies.get('restaurantID') === undefined || Cookies.get('employeeID') === undefined) {
			navigate('/', {replace: true});
		}
	}, []);

    // Use effect for getting the current student from the db by their _id value (to populate the input fields text)
    useEffect(() => {
        // If id is set and useEffect has mounted once, then execute the get (conditional is for avoiding the double posting side effect)
        if (restaurantID) {
            axios.get('http://localhost:8000/restaurant/' + restaurantID)
                .then(result => {console.log(result)
                    const { name, location, phone, cuisine, open_time, closing_time, accepting_orders, image } = result.data[0];
                    setName(name);
                    setLocation(location);
                    setPhone(phone);
                    setCuisine(cuisine);
                    setOpen_Time(open_time);
                    setClosing_Time(closing_time);
                    setAccepting_orders(accepting_orders);
                    setImage(image);
                })
                .catch(err => console.log(err))
        }
    }, [restaurantID])

    // Update function for update btn to send input field value to the backend to update the current students info
    const Update = (e) => {
        e.preventDefault();
        // Axios patch string before i learned how to use backticks for format strings ;P
        axios.patch("http://localhost:8000/restaurant/" + restaurantID, {name, location, phone, cuisine, open_time, closing_time, accepting_orders, image})
        .then(result => {
            navigate('/employeeHome')
        })
        .catch(err => console.log(err))
    }

    // Elements to be displayed by this component
    return (
        <div>
            <EmployeeNavBar />
            <div className='d-flex vh-100 justify-content-center align-items-center'>
                <div className='w-50 bg-white rounded p-3'>
                    <form onSubmit={Update}>
                        <div class="border-bottom border-black pb-3 mb-3">
                            <h2 className="text-l text-gray-1200 font-bold">Update Restaurant Info</h2>
                        </div>
                        <div className='mb-2'>
                            <label  className="text-m text-gray-700 font-semibold">Restaurant Name</label>
                            <input type="text" placeholder="Name" className='form-control' value={name}
                            onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className='mb-2'>
                            <label className="text-m text-gray-700 font-semibold">Location</label>
                            <input type="text" placeholder="Location" className='form-control' value={location}
                            onChange={(e) => setLocation(e.target.value)}/>
                        </div>
                        <div className='mb-2'>
                            <label className="text-m text-gray-700 font-semibold">Phone Number</label>
                            <input type="text" placeholder="email" className='form-control'value={phone}
                            onChange={(e) => setPhone(e.target.value)}/>
                        </div>
                        <div className='mb-2'>
                            <label className="text-m text-gray-700 font-semibold">Opening Time</label>
                            <input type="text" placeholder="open time" className='form-control'value={open_time}
                            onChange={(e) => setOpen_Time(e.target.value)}/>
                        </div>
                        <div className='mb-2'>
                            <label className="text-m text-gray-700 font-semibold">Closing Time</label>
                            <input type="text" placeholder="close time" className='form-control'value={closing_time}
                            onChange={(e) => setClosing_Time(e.target.value)}/>
                        </div>
                        <div className='mb-2'>
                            <label className="text-m text-gray-700 font-semibold">Accepting Orders</label>
                            <select name="on_special" value={accepting_orders} onChange={(e) => setAccepting_orders(e.target.value)} className="form-control">
									<option value={true}>Yes</option>
									<option value={false}>No</option>
								</select>
                        </div>
                        <div className='mb-2'>
                            <label className="text-m text-gray-700 font-semibold">Set Image Link</label>
                            <input type="text" placeholder="image" className='form-control'value={image}
                            onChange={(e) => setImage(e.target.value)}/>
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                            <Link to="/employeeHome" type="button" className="btn text-white bg-red-500 hover:bg-red-600">Back to Home</Link>
                            <button className="btn text-white bg-green-500 hover:bg-green-600">Update</button>
                        </div>    
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EmployeeEditProfile;