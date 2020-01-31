import React from "react";
import Project from './Project';
import CardDeck from 'react-bootstrap/CardDeck'
import Card from 'react-bootstrap/Card';
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Button from 'react-bootstrap/Button';


function ProjectsPage() {

  return (

    //Just using inline styling temporarily. Remove later in the process
    <div className="page-div">
      <CardDeck>
      <Project 
        projectLink="https://chrisbakeraugie.github.io/random-quote-generator/"
        imageSource="https://i.imgur.com/FSaQ1xt.png"
        altDesc="A random quote machine image"
        cardTitle="Random Quote Machine"
        cardDesc="This random quote machine displays a quote and an author by fetching from an array of quote objects at random. That quote can then be tweeted easily."
        githubLink="https://github.com/chrisbakeraugie/random-quote-generator"
        />

        <Card className="project-card">
          <a href="https://chrisbakeraugie.github.io/js-calc/" target="_blank" rel="noopener noreferrer">
            <Card.Img className="card-image" varient="top" src="https://i.imgur.com/EHYUP00.png" alt="A random quote machine image"></Card.Img>
          </a>
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This card has supporting text below as a natural lead-in to additional
              content.
            </Card.Text>
          </Card.Body>
          <a href="https://github.com/chrisbakeraugie/random-quote-generator">
            <Card.Footer className="subtitle-link">
              Find the code on github  <FontAwesomeIcon icon={faGithub} size="1x" href="www.chrisbakeraugie.github.io"></FontAwesomeIcon>
            </Card.Footer>
          </a>
        </Card>

        <Card className="project-card">
          <a href="https://chrisbakeraugie.github.io/react-drum-machine/" target="_blank" rel="noopener noreferrer">
            <Card.Img className="card-image" varient="top" src="https://i.imgur.com/qEqQvPO.png" alt="A random quote machine image"></Card.Img>
          </a>
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural lead-in to
              additional content. This card has even longer content than the first to
              show that equal height action.
            </Card.Text>
          </Card.Body>
          <a href="https://github.com/chrisbakeraugie/random-quote-generator">
            <Card.Footer className="subtitle-link">
              Find the code on github  <FontAwesomeIcon icon={faGithub} size="1x" href="www.chrisbakeraugie.github.io"></FontAwesomeIcon>
            </Card.Footer>
          </a>
        </Card>

      </CardDeck>
    </div>
  )
}

export default ProjectsPage;