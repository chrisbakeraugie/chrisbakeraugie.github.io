import React, { useEffect } from "react";
import SubmitForm from "./SubmitForm";
import "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";
import AOS from "aos";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLinkedin, faGithub, faFacebook, faCodepen } from "@fortawesome/free-brands-svg-icons";


const Contact = () => {
    useEffect(() => {
        AOS.init({
            delay: 600,
            duration: 1500
        });
        AOS.refresh();
    }, []);

    const StyledContactDiv = styled.div`
    position: absolute;
    top:8vh;
    left:2vw;
    height:90vh;
    width:
    96vw;
      display: grid; 
    grid-template-columns: 1fr 1fr 1fr; 
    grid-template-rows: 1fr 1fr 1fr; 
    gap: 0px 0px; 
    grid-template-areas: 
    ". . ."
    ". SubmitForm ."
    ". . ."; 
      `;

    const StyledFormDiv = styled.div`
    margin:0;
    padding:0;
    grid-area: SubmitForm
      `;


    return (
        <StyledContactDiv>
            <StyledFormDiv>
                <SubmitForm />
            </StyledFormDiv>
        </StyledContactDiv>
    );
    /**
     *  <div className="page-div contact-page">
            <div id="contact-div">
                <h1 id="contact-header">Interested in working together? <br />Let me know</h1>

                <div id="contact-links">
                    <a
                        id="contact-link"
                        href="https://www.linkedin.com/in/christopher-baker-792783141/?lipi=urn%3Ali%3Apage%3Ad_flagship3_notifications%3BDpPiybNSRtq0kCKvRXweWw%3D%3D&licu=urn%3Ali%3Acontrol%3Ad_flagship3_notifications-nav.settings_view_profile"
                        title="LinkedIn"
                    ><FontAwesomeIcon icon={faLinkedin} size="3x" style={{color: "blue", opacity: "0.6"}} />
                    </a>

                    <a
                        id="contact-link"
                        href="https://github.com/chrisbakeraugie"
                        title="GitHub"
                        
                    ><FontAwesomeIcon icon={faGithub} size="3x" style={{color: "black", opacity: "1"}}/>
                    </a>

                    <a
                        id="contact-link"
                        href="https://codepen.io/christopherbaker15"
                        title="CodePen"
                    ><FontAwesomeIcon icon={faCodepen} size="3x" style={{color: "white", opacity: "0.6"}}/>
                    </a>

                    <a
                        id="contact-link"
                        href="https://www.facebook.com/people/Chris-Baker/100002249121367"
                        title="Facebook"
                    ><FontAwesomeIcon icon={faFacebook} size="3x" style={{color: "blue", opacity: "0.6"}}/>
                    </a>
                </div>

                <br />
                <br />
                <SubmitForm />


            </div>

        </div>
     */
}


export default Contact;