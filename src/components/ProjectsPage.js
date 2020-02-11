import React from "react";
import Project from './Project';
import CardDeck from 'react-bootstrap/CardDeck';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCodepen } from '@fortawesome/free-brands-svg-icons';
import { faCode } from "@fortawesome/free-solid-svg-icons";
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

        <Project
          projectLink="https://github.com/AugustanaCSC285Fall18/CurlewRepo"
          imageSource="https://i.imgur.com/4pfBf59.png"
          altDesc='An image of my "Chicken Tracker" program'
          cardTitle="Java Chicken Tracker"
          cardDesc="A program designed to track position of chickens in a video, then export the data in the form of a CSV file. (No deployed version available)"
          codeLink="https://github.com/AugustanaCSC285Fall18/CurlewRepo"
          icon={faGithub}
        />

      </CardDeck>

      <CardDeck>
        <Project
          projectLink="https://chrisbakeraugie-fcc-api1.glitch.me/"
          imageSource="https://i.imgur.com/pDuKpyO.png"
          altDesc="An image of my timestamp service"
          cardTitle="Express and HTML Timestamp Service"
          cardDesc="My timestamp service, an early project using Express and HTML. Add a route to the address bar, and recieve a timestamp in return."
          codeLink="https://glitch.com/edit/#!/chrisbakeraugie-fcc-api1?path=README.md:1:0"
          icon={faCode}
        />

        <Project
          projectLink="https://who-am-i-api-project.glitch.me/"
          imageSource="https://i.imgur.com/tikMykl.png"
          altDesc="An image of my first express api"
          cardTitle="Express and HTML 'Who am I' service"
          cardDesc="My first express service. Add one of the two routes to the end of the address and get a greeting or display information of your computer"
          codeLink="https://glitch.com/edit/#!/who-am-i-api-project?path=views/index.html:58:10"
          icon={faCode}
        />



      </CardDeck>

      <br/>
      <h2>...And more coming</h2>
    </div>
  )
}

export default ProjectsPage;