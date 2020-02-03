import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import HashRouter from 'react-router-dom/HashRouter'
import Route from 'react-router-dom/Route'
import Home from './Home'
import AboutMe from './AboutMe'
import ProjectsPage from './ProjectsPage'
import Contact from './Contact'
import '../App.css'
import Nav from 'react-bootstrap/Nav'



class App extends React.Component {



  render() {
    return (
      <HashRouter>
        <div className="App">
          <Navbar bg="dark" variant="dark" fixed="top" className="navbar">
            <Navbar.Brand href="#">Chris Baker</Navbar.Brand>
            <Nav.Link href="#about" className="nav-link">About Me</Nav.Link>
            <Nav.Link href="#projects" className="nav-link">Projects</Nav.Link>
            <Nav.Link href="#contact" className="nav-link">Contact</Nav.Link>
          </Navbar>

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

      </HashRouter>

    );

  }

}

export default App;
