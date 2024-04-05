import React from 'react';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const CartCustomerComp = ({ order, removeFromCart, openCheckoutModal }) => {
    let disabledBtn = false;
    if (!order) {
        order = {
            "items": [],
            "total": 0,
        };
        disabledBtn = true

    }
    return (
        <div className="card w-96 mt-4 position-fixed" >
            <div className="flex card-title justify-content-center ">
                <h1>My Order</h1>
            </div>
            <div className="card-body">
                <div className="h-40 overflow-x-auto">
                    <table className='table drop-shadow-md'>
                        <thead>
                        <tr className="text-sm">
                            <th className='bg-blue-300'>Name</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            <th></th> {/* New column for delete button */}
                        </tr>
                        </thead>
                        <tbody>
                        {order.items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{'$' + item.subtotal.toFixed(2)}</td>
                                <td>
                                    <IconButton aria-label="delete" size="small" onClick={() => removeFromCart(item)}>
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <h2>Order Total: ${order.total.toFixed(2)}</h2>
                <div className="flex card-actions justify-center flex-column align-content-center">
                    <button className="btn" onClick={openCheckoutModal} disabled={disabledBtn}>CheckOut</button>
                </div>
            </div>
        </div>
    );
};

export default CartCustomerComp;
