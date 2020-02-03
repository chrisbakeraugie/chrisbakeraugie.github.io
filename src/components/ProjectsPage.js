import React from "react";
import Project from './Project';
import CardDeck from 'react-bootstrap/CardDeck';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCodepen } from '@fortawesome/free-brands-svg-icons';
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
          altDesc="An image of my Javascript calculator"
          cardTitle="React calculator"
          cardDesc='This calculator enables the user to "build" an equation, and then have that equation evaluated using correct order of operations.'
          codeLink="https://github.com/chrisbakeraugie/js-calc"
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
          codeLink="https://codepen.io/christopherbaker15/pen/OJPLGeO"
          icon={faCodepen}
        />

        <Project
          projectLink="https://codepen.io/christopherbaker15/full/Poowrjp"
          imageSource="https://i.imgur.com/ses3dxm.png"
          altDesc="Basic product landing page for a fake trumpet service"
          cardTitle="Basic product landing page"
          cardDesc="This is an early work, desiging a landing page for a fake trumpet seller. It uses plain HTML and CSS, and no javascript."
          codeLink="https://codepen.io/christopherbaker15/pen/Poowrjp"
          icon={faCodepen}
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
          projectLink="https://codepen.io/christopherbaker15/full/OJPbGMR"
          imageSource="https://i.imgur.com/HcXxEEo.png"
          altDesc="An image of my D3.js scatterplot"
          cardTitle="D3.js scatterplot of Doping in Professional Cycling"
          cardDesc="This page uses Data Driven Documents to create a scatterplot of the fastest times in cycling and labelling those aligned with doping allegations."
          codeLink="https://codepen.io/christopherbaker15/pen/OJPbGMR"
          icon={faCodepen}
        />
      </CardDeck>
    </div>
  )
}

export default ProjectsPage;