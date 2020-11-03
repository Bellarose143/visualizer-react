import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./TopBar.css";
import Sorting from "./Sorting/Sorting";
import logo from "./rose-icon.png";

export default class TopBar extends React.Component {
  render() {
    console.log(window.location.pathname);
    if (window.location.pathname == "/") {
      return (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">
            <img src={logo} style={{ height: 32, width: 32, marginTop: -7 }} />
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link class="navlink" href="/">
              Sorting
            </Nav.Link>
            <Nav.Link class="navlink" href="/pathfinder">
              Pathfinding
            </Nav.Link>
            <Nav.Link class="navlink" href="/sudoku">
              Sudoku
            </Nav.Link>
          </Nav>
        </Navbar>
      );
    } else {
      return (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">
            <img src={logo} style={{ height: 32, width: 32, marginTop: -7 }} />
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link class="navlink" href="/">
              Sorting
            </Nav.Link>
            <Nav.Link class="navlink" href="/pathfinder">
              Pathfinding
            </Nav.Link>
            <Nav.Link class="navlink" href="/sudoku">
              Sudoku
            </Nav.Link>
          </Nav>
        </Navbar>
      );
    }
  }
}
