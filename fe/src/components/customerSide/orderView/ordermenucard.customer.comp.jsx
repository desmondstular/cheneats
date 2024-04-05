import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export const OrderMenuCardCustomerComp = ({ menuItem, addToCart }) => {
    const [qty, setQty] = useState(1);

    const decreaseQty = () => {
        if (qty > 1) {
            setQty(qty - 1);
        }
    };

    const increaseQty = () => {
        setQty(qty + 1);
    };

    const handleAddToCart = () => {
        addToCart(menuItem, qty);
        setQty(1); // Reset quantity to 1 after adding to cart
    };

    return (
        <div className="px-28 pb-1">
            <Card style={{ margin: '2px', opacity: menuItem.available ? 1 : 0.5 }}>
                <Card.Body style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Card.Img src={menuItem.image} style={{height: '80px', width: '80px'}}/>
                    <div className="flex flex-column">
                        <Card.Text style={{fontWeight: 'bold'}}>{menuItem.name}</Card.Text>
                        <Card.Text className="flex flex-column">
                            <span style={{
                                textDecoration: menuItem.on_special ? 'line-through' : 'none',
                                color: menuItem.on_special ? 'red' : 'black'
                            }}>
                                ${menuItem.price}
                            </span>
                            {menuItem.on_special && <span> ${menuItem.discount.toFixed(2)}</span>} {/* Render discount price if on_special is true */}
                        </Card.Text>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around'
                    }}>
                        <Button disabled={!menuItem.available} variant="dark"
                                style={{height: '40px', width: '40px', marginRight: '4px'}} onClick={decreaseQty}>-</Button>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: '10px'
                        }}>
                            <Card.Text>{qty}</Card.Text>
                        </div>
                        <Button variant="dark" disabled={!menuItem.available}
                                style={{height: '40px', width: '40px', marginLeft: '12px'}} onClick={increaseQty}>+</Button>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: '8px'
                    }}>
                        <Button variant="dark" onClick={handleAddToCart} disabled={!menuItem.available}>Add to Cart</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};
