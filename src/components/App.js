/* eslint-disable react/prop-types */
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Home from "./Home";
import AboutMe from "./AboutMe";
import ProjectsPage from "./Projects";
import Contact from "./Contact";
import "../App.css";
import Nav from "react-bootstrap/Nav";
import styled from "styled-components";
// import AOS from 'aos';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route
} from "react-router-dom";

class App extends React.Component {

  StyledNavbar = styled(Navbar)`
  height:6vh;
  @media (max-width:500px) {
    height:12vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  `;

  StyledLink = styled(Link)`
  text-decoration: none;
  padding: 10px;
  margin:auto;
  color:black;
  &:hover{
    color:rgb(102, 169, 185);
  }`;

  render() {
    return (
      <div>
        <Router>
          <div className="App">
            <this.StyledNavbar bg="light" variant="dark" fixed="top" className="navbar">
              <Navbar.Brand><this.StyledLink to="/">Welcome</this.StyledLink></Navbar.Brand>
              <Nav.Link className="nav-link"><this.StyledLink to="/about">About Me</this.StyledLink></Nav.Link>
              <Nav.Link className="nav-link"><this.StyledLink to="/projects">Projects</this.StyledLink></Nav.Link>
              <Nav.Link className="nav-link"><this.StyledLink to="/contact">Contact</this.StyledLink></Nav.Link>
            </this.StyledNavbar>
            <div>
              <Switch className="content">
                <Route exact path="/">
                  <Home />
                </Route>

                <Route path="/about">
                  <AboutMe />
                </Route>
                <Route path="/projects">
                  <ProjectsPage />
                </Route>
                <Route path="/contact">
                  <Contact />
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
        <div id="left"></div>
        <div id="right"></div>
        <div id="top"></div>
        <div id="bottom"><p>© 2021 Chris Baker</p></div>
      </div>
    );
  }
}

export default App;
