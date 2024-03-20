import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export const OrderMenuCardCustomerComp = ({menuItem}) => {
    return (
        <Card style={{margin: '2px'}}>
            <Card.Body style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                <Card.Img src={menuItem.image} style={{height: '80px', width: '80px'}}/>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Card.Text style={{ fontWeight: 'bold' }}>{menuItem.name}</Card.Text>
                    <Card.Text>${menuItem.price}</Card.Text>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                    <Button variant="dark" style={{ height: '40px', width: '40px', marginRight: '4px' }}>-</Button>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: '10px' }}>
                        <Card.Text>0</Card.Text>
                    </div>
                    <Button variant="dark" style={{ height: '40px', width: '40px', marginLeft: '12px' }}>+</Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default OrderMenuCardCustomerComp;
