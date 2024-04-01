import React from 'react';

const CartCustomerComp = ({ order }) => {
    if (!order) {
        order = {
            "_id": {
                "$oid": "6608f6b3b98e13b9ef0273db"
            },
            "customer_ref": {
                "$oid": "65f91081e75ba89099210852"
            },
            "restaurant_ref": {
                "$oid": "65f90a45e75ba89099210796"
            },
            "status": "carted",
            "items":[],
            "total": 0 };
    }

    return (
        <div className="card w-96 ">
            <div className="flex card-title justify-content-center ">
                <h1>My Order</h1>
            </div>
            <div className="card-body">
                {order.items.map((item, index) => (
                    <div key={index}>
                        <p>{item.quantity} {item.name} {item.subtotal.toFixed(2)}</p>
                    </div>
                ))}
                Total: {order.total.toFixed(2)}
                <div className="flex card-actions justify-center flex-column align-content-center">
                    <button className="btn">CheckOut</button>
                </div>
            </div>
        </div>
    );
}

export default CartCustomerComp;
