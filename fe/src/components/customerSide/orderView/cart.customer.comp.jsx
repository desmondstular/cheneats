import React from 'react';
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const CartCustomerComp = ({ order, removeFromCart, openCheckoutModal}) => {
    if (!order) {
        order = {
            "items":[],
            "total": 0 };
    }
    return (
        <div className="card w-96">
            <div className="flex card-title justify-content-center ">
                <h1>My Order</h1>
            </div>
            <div className="card-body">
                {order.items.map((item, index) => (
                    <div key={index} className="flex justify-content-between items-center gap-4 min-h-8">
                        <div>{item.quantity}</div>
                        <div className="flex flex-wrap min-w-8 max-w-32">{item.name}</div>
                        <div className="flex align-content-start">${item.subtotal.toFixed(2)}</div>
                        <IconButton aria-label="delete" size="small" onClick={() => removeFromCart(item)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </div>
                ))}
                Total: ${order.total.toFixed(2)}
                <div className="flex card-actions justify-center flex-column align-content-center">
                    <button className="btn" onClick={openCheckoutModal}>CheckOut</button>
                </div>
            </div>
        </div>
    );
};

export default CartCustomerComp;
