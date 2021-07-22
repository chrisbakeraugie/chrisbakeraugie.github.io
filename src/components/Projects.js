/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
// import Project from "./Project";
// import CardDeck from "react-bootstrap/CardDeck";
import { faGithub, faCodepen } from "@fortawesome/free-brands-svg-icons";
// import { faCodepen } from "@fortawesome/free-brands-svg-icons";
// import { faCode } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import StyledProjectCard from "./StyledProjectCard";
import AOS from "aos";
import "aos/dist/aos.css";
// import Button from 'react-bootstrap/Button';


const ProjectsPage = () => {
  useEffect(() => {
    AOS.init({
      delay: 600,
      duration: 1500
    });
    AOS.refresh();
  }, []);

  const StyledProjectsDiv = styled.div`
  position: absolute;
  text-align:center;
  top:8vh;
  left:2vw;
  height:90vh;
  width:96vw;
  @media (max-width:500px) {
    top:12.5vh;
  }
  `;
  const StyledH3 = styled.h3`
  padding:10px;
  `;
  const StyledBottomText = styled.h5`
  margin-bottom:50px;
  `;

  return (

    //Just using inline styling temporarily. Remove later in the process
    <StyledProjectsDiv>
    <StyledH3>Recent Work</StyledH3>
      <StyledProjectCard
        txtAlgn="left"
        dataAOS="zoom-out"
        bgColor="rgba(255, 166, 0, 0.6)"
        title="Beer Near V1"
        link="BrNear.com"
        subTitle="Node.JS, React.JS, Bootstrap, Google Maps API"
        desc="A mobile-focused web app which uses your location, or an address you choose, to find the 20 beers closest to you!
        The name, address, website, and phone number are provided for each brewery. A map displays the location of the breweries relative to you.
        Try it out, and go get yourself a drink!"
        imgSrc="https://i.imgur.com/ZXpFg8o.png"
        iconLink="https://github.com/chrisbakeraugie/beer-near"
        icon={faGithub}
      />
      <StyledProjectCard
      txtAlgn="right"
      dataAOS="zoom-out"
      bgColor="rgba(179, 142, 114, 0.5)"
      title="skriftr"
      link="skriftr.com"
      subTitle="MongoDB, Express.JS, Embedded JS, Node.JS, Bootstrap, D3.JS, Passport.JS authentication"
      desc='A web app which encourages users to journal their progress during a project or learning experience. Designed to tackle the issue
      of feeling of "no progress is being made", users track their daily accomplishments and their level of confidence. After multiple journal entires, users
      have access to a graph detailing the progress they have made and journal entries they can reference in the future.'
      imgSrc="https://i.imgur.com/Z3EkvCt.png"
      iconLink="https://github.com/chrisbakeraugie/beer-near"
      icon={faGithub}
    />
    <StyledH3>Older/Practice Projects</StyledH3>
    <StyledProjectCard 
      txtAlgn="left"
      dataAOS="zoom-out"
      bgColor="rgba(128, 128, 128, 0.5)"
      title="Chicken Tracker"
      subtitle="Java"
      desc="A desktop app completed in 2018 which tracks the movement of chickens in a video. A specific request from Augustana College,
      users upload a video of chickens responding to various stimuli and track their movements on a 2D plane. They can then export data in
      the form of a .CSV file."
      imgSrc="https://i.imgur.com/JmMQXqF.png"
      iconLink="https://github.com/AugustanaCSC285Fall18/CurlewRepo"
      icon={faGithub}
      />
    <StyledProjectCard
      txtAlgn="right"
      dataAOS="zoom-out"
      bgColor="rgba(127, 255, 212, 0.5)"
      title="A practice project - Random Quote Generator"
      link="chrisbakeraugie.github.io/random-quote-generator/"
      subTitle="React"
      desc="This random quote machine displays a quote and an author by fetching from an array of quote objects at random. 
      That quote can then be tweeted easily."
      imgSrc="https://i.imgur.com/MIU7jlp.png"
      iconLink="https://github.com/chrisbakeraugie/random-quote-generator"
      icon={faGithub}
    />
    <StyledProjectCard
      txtAlgn="left" 
      dataAOS="zoom-out"
      bgColor=" rgba(47, 79, 79, 0.5)"
      title="A practice project - React Calculator"
      link="chrisbakeraugie.github.io/js-calc/"
      subTitle="Node, React"
      desc="Building a calculator with React"
      imgSrc="https://i.imgur.com/h9Z1cKs.png"
      iconLink="https://github.com/chrisbakeraugie/js-calc"
      icon={faGithub}
      />
      <StyledProjectCard
        txtAlgn="right"
        dataAOS="zoom-out"
        title="A practice project - USA GDP bargraph" 
        link="codepen.io/christopherbaker15/full/OJPLGeO"
        subTitle="D3.JS"
        desc="A practice graph made with D3.JS, which tracks the USA GDP"
        imgSrc="https://i.imgur.com/4K3wWIK.png"
        iconLink="https://codepen.io/christopherbaker15/pen/OJPLGeO"
        icon={faCodepen}
        />
      <a href="https://github.com/chrisbakeraugie"><StyledBottomText className="btn btn-dark">Still looking? Try my GitHub</StyledBottomText></a>
    </StyledProjectsDiv>
  );
  /**
   * <div className="page-div">
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
   */
}

export default ProjectsPage;