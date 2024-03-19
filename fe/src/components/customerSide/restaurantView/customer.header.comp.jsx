import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

export const CustomerHeaderComp = () => {
    return (
        <Navbar sticky="top" style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
            backgroundColor: "#62C2AE", height: 160}}>
            <img
                src="https://cdn.discordapp.com/attachments/1197608255724191907/1217543981299142686/chenEatsLogo.png?ex=66046932&is=65f1f432&hm=b283cbe31a7e4dcf86e94c66a6323cffd69c886689641a2222af4af3c564b43d&"
                height="160"
                alt="Logo"
            />
        </Navbar>
    );
}

export default CustomerHeaderComp;