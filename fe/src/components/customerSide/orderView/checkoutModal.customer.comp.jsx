import React, { useState } from 'react';
import Modal from 'react-modal';
import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

const CheckoutModalCustomerComp = ({checkoutModalIsOpen, order }) => {

    const closeCheckoutModal = () => {
        setCheckoutModalIsOpen(false);
    };

    return (
        <Modal isOpen={checkoutModalIsOpen} onRequestClose={closeCheckoutModal} contentLabel="Checkout"
               style={{
                   content: {
                       width: '400px',
                       margin: 'auto',
                       borderRadius: '8px',
                       padding: '20px',
                       height : '460px'
                   }}}>
            <div className="flex justify-content-center flex-column">
                <h1>Order Total: {order.total}</h1>
                <div>
                    <FormLabel>Pickup Time</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="ASAP"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="ASAP" control={<Radio />} label="ASAP" />
                        <FormControlLabel value="Set Pickup Time" control={<Radio />} label="Set Pickup Time" />
                    </RadioGroup>
                </div>
            </div>
        </Modal>
    );
};

export default CheckoutModalCustomerComp;
