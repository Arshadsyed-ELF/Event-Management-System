// src/components/Navbar.js

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import {Link } from "react-router-dom"

const Hnavbar = () => {
  const get=localStorage.getItem('user')
  return (
    <Navbar bg="" variant="dark" expand="lg" style={{backgroundColor:"teal"}}>
      <Container>
        <Navbar.Brand ><Link to='/shome' style={{color:"white",textDecoration:"none"}}>Event-Manage(Host)</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" >
            <Link to="/hhome" style={{padding:"10px",color:"white",textDecoration:"none"}}>Dashboard</Link>
            <Link to="/myevents" style={{padding:"10px",color:"white",textDecoration:"none"}}>MyEvents</Link>
            <Link to="/addevent" style={{padding:"10px",color:"white",textDecoration:"none"}}>Add Events</Link>
            <Link to="/bookings" style={{padding:"10px",color:"white",textDecoration:"none"}}>Bookings</Link>
            <Link to="/" style={{paddingLeft:"10px",paddingTop:"10px",color:"white",textDecoration:"none"}}>Logout</Link>
            <h4 style={{color:"white",paddingTop:"0px"}}>({JSON.parse(get).name} )</h4>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Hnavbar;
