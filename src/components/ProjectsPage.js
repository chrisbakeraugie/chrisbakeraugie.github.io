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

        <Project
          projectLink="https://chrisbakeraugie.github.io/js-calc/"
          imageSource="https://i.imgur.com/EHYUP00.png"
          altDesc="A random quote machine image"
          cardTitle="Random Quote Machine"
          cardDesc="This random quote machine displays a quote and an author by fetching from an array of quote objects at random. That quote can then be tweeted easily."
          githubLink="https://github.com/chrisbakeraugie/js-calc"
        />

        <Project
          projectLink="https://chrisbakeraugie.github.io/react-drum-machine/"
          imageSource="https://i.imgur.com/qEqQvPO.png"
          altDesc="An image of my drum machine"
          cardTitle="Javascript/React drum machine"
          cardDesc="This drum machine listens plays sounds with interaction. Listens for both keystrokes and clicks, and displays name of sound being played."
          githubLink="https://github.com/chrisbakeraugie/react-drum-machine"
        />
      </CardDeck>
    </div>
  )
}

export default ProjectsPage;