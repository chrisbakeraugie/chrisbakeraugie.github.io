import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * 
 * @param txtAlgn
 * @param dataAOS
 * @param bgColor
 * @param title
 * @param link
 * @param subTitle
 * @param desc
 * @param imgSrc
 * @param icon
 * @param iconLink
 * 
 */
const StyledProjectCard = (props) => {
  const StyledInfoDiv = styled.div`
  position:relative;
  margin: 10px;
  padding: 15px;
  height: 75vh;
  border-radius:5mm;
  background-color: ${props.bgColor ?
      props.bgColor :
      "transparent"};
  ${props.txtAlgn === "right" ?
      `text-align: right;
  display: grid; 
  grid-template-columns: 1fr 1.6fr 0.4fr; 
  grid-template-rows: 1fr .1fr 0.1fr .1fr 1fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "Image . ."
    "Image Title Title"
    "Image Link Link"
    "Image Sub Sub"
    "Image Desc Desc"; `
      : `text-align: left;
  display: grid; 
  grid-template-columns: 0.4fr 1.6fr 1fr; 
  grid-template-rows: 1fr .1fr 0.1fr 0.1fr 1fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    ". . Image"
    "Title Title Image"
    "Link Link Image"
    "Sub Sub Image"
    "Desc Desc Image"; `
    }
  
  `;
  const StyledTitle = styled.h2`
  grid-area: Title;
  color: black;
  top: 800px;
  `;
  const StyledLink = styled.a`
  grid-area: Link;
  color: black;
  `;
  const StyledSub = styled.p`
  grid-area: Sub;
  color: black;
  `;
  const StyledDesc = styled.p`
  grid-area: Desc;
  color: black;
  `;
  const StyledImage = styled.img`
  grid-area: Image;
  border-radius:5mm;
  object-fit: cover;
  width: 100%;
  height: 100%;
  `;
  const StyledIconLink = styled.a`
  position: absolute;
  top: 9%;
  left: 5mm;
  max-width: 36px;
  max-height:37px;
  border-radius:50%;
  ${props.txtAlgn === "right" ?
  `top: 3%;
  left: 96%;`
  :
  ` top: 3%;
  left: 1.5%;`
}

  `;

  return (
    <StyledInfoDiv data-aos={props.dataAOS}>
      <StyledTitle>{props.title}</StyledTitle>
      <StyledLink href={`https://${props.link}`} target="_blank" rel="noreferrer" >{props.link}</StyledLink>
      <StyledIconLink href={props.iconLink}  target="_blank" rel="noreferrer"><FontAwesomeIcon icon={props.icon} size="2x" color="black"></FontAwesomeIcon></StyledIconLink>
      <StyledSub>{props.subTitle}</StyledSub>
      <StyledDesc>{props.desc}</StyledDesc>
      {props.imgSrc ?
        <StyledImage src={props.imgSrc}></StyledImage> :
        <div></div>
      }
    </StyledInfoDiv>
  )
};

export default StyledProjectCard;
