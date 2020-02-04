import React from "react";
import SubmitForm from "./SubmitForm";
import "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub, faFacebook, faCodepen } from "@fortawesome/free-brands-svg-icons";

function Contact() {


    return (
        <div className="page-div contact-page">
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
    )
}


export default Contact;