import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import "./TopBar.css";
import logo from './rose-icon.png';

export default class TopBar extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/"><img src={logo} style={{height: 64, width:64, marginTop: -7}} /></Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Sorting</Nav.Link>
              <Nav.Link href="/pathfinder">Pathfinding</Nav.Link>
              <Nav.Link href="/sudoku">Sudoku</Nav.Link>
            </Nav>
          </Navbar>
        );
      }
        
}