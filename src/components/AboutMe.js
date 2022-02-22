/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import styled from "styled-components";
import StyledAboutCard from "./StyledAboutCard";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutMe = () => {
    useEffect(() => {
        AOS.init({
          delay: 600,
          duration: 1500
        });
        AOS.refresh();
      },[]);

    const StyledAboutDiv = styled.div`
    position: absolute;
    top:8vh;
    left:2vw;
    height:90vh;
    width:96vw;
    text-align: left;
    @media (max-width:500px) {
        top:12.5vh;
        text-align:center;
      }
    `;
    
    const StyledH1 = styled.h1`
    padding: 20px;
    `;

    return (
        <StyledAboutDiv>
            <StyledH1>Past work</StyledH1>
            <StyledAboutCard
                dataAOS="fade-left"
                txtAlgn="right"
                title="Frontend Developer"
                subTitle1="Thrive - Massachusetts"
                subTitle2="Present"
                desc="Frontend developer delivering SharePoint Framework and Node.JS solutions to clients around the country. 
                Currently working on full stack applications and general frontend projects using Typescript, Javascript, and open source libraries."
                />
            <StyledAboutCard
                dataAOS="fade-right"
                txtAlgn="left"
                title="Software Developer / IT"
                subTitle1="Cyient - Hartford, CT"
                subTitle2="March 2020 - May 2021"
                desc="Create, update, and maintain applications for Pratt & Whitney. 
                Deliverables include full web applications, bug fixes and patches, macros, scripts, and workflows.
                Technologies used include HTML/CSS, Bootstrap, Visual Basic, SharePoint, and Nintex Workflows."
                />
            <StyledAboutCard
                dataAOS="fade-left"
                txtAlgn="right"
                title="Student, Product Development at John Deere Seeding"
                subTitle1="John Deere - Moline, IL"
                subTitle2="November 2017- August 2019"
                desc="Ran experiments, recorded data, and presented that data to improve the efficiency and accuracy of planting machines and crop yields. 
                Additionally supported team by managing weekly meetings, travel, and events, 
                as well as editing and publishing a monthly newsletter documenting achievements of the planting department."
                />
            <StyledAboutCard
                dataAOS="fade-right"
                txtAlgn="left"
                title="Software development"
                subTitle1="Augustana College - Rock Island, IL"
                subTitle2="August 2018 - November 2018"
                desc="Completed an 11 week course developing a program which could be used to track the movement of chickens in a video file, 
                which the psychology department could use to measure chicken responses to stimulation. 
                Delivered program that could track objects on screen and could export the results in the form of Comma Separated Values. Gained experience in:
                Agile methodology/scrum team framework, Java, and Github."
                />
            <StyledH1>Education</StyledH1>
            <StyledAboutCard
                dataAOS="fade-right"
                txtAlgn="left"
                title="Augustana College"
                subTitle1="BA Engineering Physics"
                subTitle2="August 2015 - July 2019"
                />
        </StyledAboutDiv>
    );
}

export default AboutMe;