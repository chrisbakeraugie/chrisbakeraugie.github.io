/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";


const Home = () => {
    const StyledWelcomeDiv = styled.div`
    position:absolute;
    height: 30vh;
    width:30vw;
    top:35vh;
    left:35vw;
    text-align:center;
    @media (max-width:500px) {
        top:25vh;
        left:27.5vw
        width:45vw;
      }
    `;

    return (
        <div id="home-container">
            <div id="the-sun"></div>
            <div id="rectangle1"></div>
            <div id="rectangle2"></div>
            <div id="trapez3"></div>
            <div id="rectangle4"></div>
            <div id="trapez5"></div>
            <div id="rectangle6"></div>
            <div id="rectangle7"></div>
            <div id="rectangle8"></div>
            <div id="rectangle9"></div>
            <div id="rectangle10"></div>
            <div id="rectangle11"></div>
            <div id="rectangle12"></div>
            <StyledWelcomeDiv>
                <h1>Hi, my name is Chris.
            I&apos;m a software developer</h1>
            </StyledWelcomeDiv>


        </div>

    );
}

export default Home;