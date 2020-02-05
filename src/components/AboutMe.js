import React from "react";

import CardDeck from 'react-bootstrap/CardDeck'
import InfoCard from "./InfoCard";
import { faFreeCodeCamp, faJava, faReact, faJs, faHtml5, faCss3, faNodeJs } from '@fortawesome/free-brands-svg-icons';
import { faDatabase, faCode, faChartLine, faLaptopCode, faCircleNotch } from "@fortawesome/free-solid-svg-icons"


function AboutMe() {

    return (
        <div className="page-div">

        <h1>Work Experience</h1>
        <CardDeck>
            <InfoCard
                positionTitle="Software development"
                positionPlace="Augustana College, Rock Island, IL"
                positionDates="August 2018 - November 2018"
                description="Completed an 11 week course developing a program which could be used to track the movement of chickens in a video file, 
                which the psychology department could use to measure chicken responses to stimulation. 
                Delivered program that could track objects on screen and could export the results in the form of Comma Separated Values. Gained experience in:
                Agile methodology/scrum team framework, Java, and Github."
            />

            <InfoCard
                positionTitle="Student, Product Development at John Deere Seeding"
                positionPlace="John Deere, Moline Illinois"
                positionDates="November 2017- August 2019" 
                description="Ran experiments, recorded data, and presented that data to improve the efficiency and accuracy of planting machines and crop yields. 
                Additionally supported team by managing weekly meetings, travel, and events, 
                as well as editing and publishing a monthly newsletter documenting achievements of the planting department. "
            />

        </CardDeck>
        <br/>
        <h2>Skills/Technologies</h2>
            <div id="skills-section">
                <InfoCard 
                    id="skills-card"
                    positionTitle="JavaScript"
                    icon={faJs}
                    iconStyle={{color: "rgb(235,235,0)", opacity: "1"}}
                    />
                <InfoCard
                    id="skills-card"
                    positionTitle="Java"
                    icon={faJava}
                    iconStyle={{color: "blue", opacity: "0.5"}}
                    />

                    
                <InfoCard
                    id="skills-card"
                    positionTitle="React.JS"
                    icon={faReact}
                    iconStyle={{color: "teal", opacity: "0.5"}}
                    />

                <InfoCard
                    id="skills-card"
                    positionTitle="Node.JS"
                    icon={faNodeJs}
                    iconStyle={{color: "green", opacity: "0.5"}}
                    />

                <InfoCard
                    id="skills-card"
                    positionTitle="HTML"
                    icon={faHtml5}
                    iconStyle={{color: "orange", opacity: "0.5"}}
                    />

                <InfoCard
                    id="skills-card"
                    positionTitle="CSS"
                    icon={faCss3}
                    iconStyle={{color: "blue", opacity: "0.5"}}
                    />

                <InfoCard
                    id="skills-card"
                    positionTitle="D3.JS"
                    icon={faChartLine}
                    iconStyle={{color: "red", opacity: "0.5"}}
                    />

                <InfoCard
                    id="skills-card"
                    positionTitle="MongoDB"
                    icon={faDatabase}
                    iconStyle={{color: "green", opacity: "0.5"}}
                    />
                
                <InfoCard
                    id="skills-card"
                    positionTitle="Visual Studio Code"
                    icon={faLaptopCode}
                    iconStyle={{color: "darkblue", opacity: "0.8"}}
                    />

                <InfoCard 
                    id="skills-card"
                    positionTitle="Eclipse"
                    icon={faCircleNotch}
                    iconStyle={{color: "blue", opacity: "0.5"}}
                    />

                <InfoCard
                    id="skills-card"
                    positionTitle="Express.JS"
                    icon={faCode}
                    iconStyle={{color: "red", opacity: "0.5"}}
                    />
            </div>
        <br/>
        <h2>Education</h2>
            <CardDeck>
         
                <InfoCard
                    id="school"
                    positionTitle="BA Engineering Physics - Class of 2019"
                    positionPlace="Augustana College"
                    positionDates="2014-2019"
                    
                />

                <InfoCard
                    positionTitle="Free Code Camp"
                    positionDates="June 2019 - Present"
                    description="Logged over 1000 hours in full stack development courses, 
                    ranging from basic HTML/CSS through JavaScript and into databases and APIs. 
                    Used courses to create multiple websites and continually develop skills in programming. 
                    Scheduled to complete the full stack courses May 2020."
                    icon={faFreeCodeCamp}
                />

                <InfoCard 
                    positionTitle="Editor, Opinions Section"
                    positionPlace="Augustana Observer Newspaper"
                    positionDates="May 2016 – November 2017"
                    description="Led a team of five writers to produce opinions articles for the college newspaper. 
                    Conducted weekly meetings to organize and assign work. Produced articles, created ideas for writers, 
                    and published work in a peer-reviewed environment. "

                />

                <InfoCard 
                    positionTitle="Student Investment Fund Member"
                    positionPlace="Augustana College"
                    positionDates="September 2016 - November 2017"
                    description="Worked with a team of students to advise college on investments. 
                    Met twice a week to present companies and ideas to other investors. 
                    Spent time learning about business and finance to make successful investments. "

                />
            </CardDeck>

        </div>
    )
}

export default AboutMe;