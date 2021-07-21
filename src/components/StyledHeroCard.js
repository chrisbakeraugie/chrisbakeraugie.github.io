import React from "react";
import styled from "styled-components";
// import AOS from "aos";
import "aos/dist/aos.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledHeroCard = (props) => {
  const StyledInfoDiv = styled.div`
  margin: 10px;
  padding: 15px;
  height: 75vh;
  background-color: white;
  ${props.txtAlgn === "right" ?
      `text-align: right;
  display: grid; 
  grid-template-columns: 1fr 1fr 1fr; 
  grid-template-rows: 1fr .1fr 0.1fr 0.1fr 1fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    ". . ."
    ". Title Title"
    ". Sub1 Sub1"
    ". Sub2 Sub2"
    ". Desc Desc"; `
      : `text-align: left;
  display: grid; 
  grid-template-columns: 1fr 1fr 1fr; 
  grid-template-rows: 1fr .1fr 0.1fr 0.1fr 1fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    ". . ."
    "Title Title ."
    "Sub1 Sub1 ."
    "Sub2 Sub2 ."
    "Desc Desc ."; `
    }
  
  `;
  const StyledTitle = styled.h2`
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
    <StyledInfoDiv data-aos={props.dataAOS}>
      <StyledTitle>{props.title}</StyledTitle>
      <StyledSub1>{props.subTitle1}</StyledSub1>
      <StyledSub2>{props.subTitle2}</StyledSub2>
      <StyledDesc>{props.desc}</StyledDesc>
    </StyledInfoDiv>
  )
};

export default StyledHeroCard;

