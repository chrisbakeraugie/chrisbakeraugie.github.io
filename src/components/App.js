import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Home from "./Home";
import AboutMe from "./AboutMe";
import ProjectsPage from "./ProjectsPage";
import Contact from "./Contact";
import "../App.css";
import Nav from "react-bootstrap/Nav";
import AOS from 'aos';
var HashRouter = require("react-router-dom").HashRouter;
var Route = require("react-router-dom").Route;

class App extends React.Component {
  componentDidMount(){
    AOS.init();
  }
  render() {
    return (
      <div>
        <HashRouter>
          <div className="App">
            <Navbar bg="light" variant="light" fixed="top" className="navbar">
              <Navbar.Brand href="#">Welcome</Navbar.Brand>
              <Nav.Link href="#about" className="nav-link">About Me</Nav.Link>
              <Nav.Link href="#projects" className="nav-link">Projects</Nav.Link>
              <Nav.Link href="#contact" className="nav-link">Contact</Nav.Link>
            </Navbar>
            <div id="framed-div">
              <div className="content">
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
              </div>
            </div>
          </div>
        </HashRouter>
        <div id="left"></div>
        <div id="right"></div>
        <div id="top"></div>
        <div id="bottom"><p>© 2021 Chris Baker <a href="/#/projects" id="footer-link">Information about this site</a></p></div>
      </div>
    );

  }

}

export default App;
