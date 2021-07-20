import React, { useEffect } from "react";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledHeroCard = (props) => {
  useEffect(() => {
    AOS.init({
      delay: 300,
      duration: 1500
    });
    AOS.refresh();
  });
  const StyledInfoDiv = styled.div`
  margin: 10px;
  padding: 15px;
  height: 85vh;
  background-color: white;
  text-align: left;
  display: grid; 
  grid-template-columns: 1fr 1fr 1fr; 
  grid-template-rows: 1fr .1fr 0.1fr 0.1fr 1fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    ". . ."
    "Title Title ."
    "Sub1 Sub1 ."
    "Sub2 Sub2 ."
    "Desc Desc ."; 
  `;
  const StyledTitle = styled.h1`
  grid-area: Title;
  color: black;
  top: 800px;
  `;
  const StyledSub1 = styled.p`
  grid-area: Sub1;
  color: black;
  `;
  const StyledSub2 = styled.p`
  grid-area: Sub2;
  color: black;
  `;
  const StyledDesc = styled.p`
  grid-area: Desc;
  color: black;
  `;

  return (
    <StyledInfoDiv data-aos="fade-right">
      <StyledTitle>Software development</StyledTitle>
      <StyledSub1>Augustana College, Rock Island, IL</StyledSub1>
      <StyledSub2>August 2018 - November 2018</StyledSub2>
      <StyledDesc>Completed an 11 week course developing a program which could be used to track the movement of chickens in a video file,
      which the psychology department could use to measure chicken responses to stimulation.
      Delivered program that could track objects on screen and could export the results in the form of Comma Separated Values. Gained experience in:
      Agile methodology/scrum team framework, Java, and Github.</StyledDesc>
    </StyledInfoDiv>
  )
};

export default StyledHeroCard;

