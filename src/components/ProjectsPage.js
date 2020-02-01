import React from "react";
import Project from './Project';
import CardDeck from 'react-bootstrap/CardDeck'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faCodepen }  from '@fortawesome/free-brands-svg-icons';
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
          codeLink="https://github.com/chrisbakeraugie/random-quote-generator"
          icon={faGithub}
        />

        <Project
          projectLink="https://chrisbakeraugie.github.io/js-calc/"
          imageSource="https://i.imgur.com/EHYUP00.png"
          altDesc="A random quote machine image"
          cardTitle="Random Quote Machine"
          cardDesc="This random quote machine displays a quote and an author by fetching from an array of quote objects at random. That quote can then be tweeted easily."
          codeLink="https://github.com/chrisbakeraugie/js-calc"
          icon={faGithub}
        />

        <Project
          projectLink="https://chrisbakeraugie.github.io/react-drum-machine/"
          imageSource="https://i.imgur.com/qEqQvPO.png"
          altDesc="An image of my drum machine"
          cardTitle="Javascript/React drum machine"
          cardDesc="This drum machine listens plays sounds with interaction. Listens for both keystrokes and clicks, and displays name of sound being played."
          codeLink="https://github.com/chrisbakeraugie/react-drum-machine"
          icon={faGithub}
        />
      </CardDeck>

      <CardDeck>
        <Project
          projectLink="https://codepen.io/christopherbaker15/full/OJPLGeO"
          imageSource="https://i.imgur.com/4K3wWIK.png"
          altDesc="The USA GDP bargraph"
          cardTitle="D3.js graph of the US GDP"
          cardDesc="This is a bar graph representing the US GDP by quarter. It uses D3.js and a data fetch, which will automatically update when data is added."
          codeLink="https://github.com/chrisbakeraugie/react-drum-machine"
          icon={faCodepen}
          />
      </CardDeck>
    </div>
      )
    }
    
export default ProjectsPage;