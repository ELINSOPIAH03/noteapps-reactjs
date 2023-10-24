import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

class Nav extends Component {
    render() {
        return (
            <div>
                <Navbar className="bg-body-tertiary mb-4" >
                    <Container>
                        <Navbar.Brand>Note Apps</Navbar.Brand>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default Nav;