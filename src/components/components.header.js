import React from 'react';
import { NavLink } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function ComponentHeader() {
    return (
    	<div className="header">
			<Navbar bg="dark" variant="dark" fixed="top">
				<Nav className="m-auto">
					<NavLink to="/mysql" className="nav-link">MYSQL</NavLink>
					<NavLink to="/postgresql" className="nav-link">POSTGRESQL</NavLink>
				</Nav>
			</Navbar>
		</div>
    );
}
