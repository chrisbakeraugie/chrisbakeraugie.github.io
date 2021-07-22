/* eslint-disable react/prop-types */
/**
 * This code has been taken from https://formspree.io/forms/xgekkjeo/integration for React
 * This uses formspree to submit forms to my email
 */
import React from "react";
// import Form from "react-bootstrap/Form";
import styled from "styled-components";


class SubmitForm extends React.Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.state = {
            status: ""
        };
    }

    submitForm(ev) {
        ev.preventDefault();
        const form = ev.target;
        const data = new FormData(form);
        const xhr = new XMLHttpRequest();
        xhr.open(form.method, form.action);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;
            if (xhr.status === 200) {
                form.reset();
                this.setState({ status: "SUCCESS" });
            } else {
                this.setState({ status: "ERROR" });
            }
        };
        xhr.send(data);
    }
    StyledForm = styled.form`
    padding: 10px;
    text-align: center;
    border: black solid 2px;
    border-radius: 5mm;
    display: grid; 
    grid-template-columns: 1fr 1fr 1fr; 
    grid-template-rows: 1fr 1fr 2.5fr 1fr; 
    gap: 10px 0px; 
    grid-template-areas: 
    "Label Label Label"
    "Email Email Email"
    "Description Description Description"
    "Submit Submit Submit"; 
    `;

    StyledFormLabel = styled.label`
    max-height: 50px;
    grid-area: Label;
    `;
    StyledFormEmail = styled.input`
    max-height: 50px;
    grid-area: Email;
    `;
    StyledFormDescription = styled.input`
    max-height: 210px;

    grid-area: Description;
    `;
    StyledFormSubmit = styled.button`
    max-height: 50px;
    grid-area: Submit;
    `;



    render() {
        const { status } = this.state;
        return (
            <this.StyledForm
                onSubmit={this.submitForm}
                action="https://formspree.io/xgekkjeo"
                method="POST">
                <this.StyledFormLabel>Send me a message, I read them everyday</this.StyledFormLabel>
                <this.StyledFormEmail type="email" placeholder="Your email" name="email"></this.StyledFormEmail>
                <this.StyledFormDescription
                    as="textarea"
                    placeholder="Tell me about your project, and maybe leave some contact information :)"
                    name="message"
                    rows="4"
                ></this.StyledFormDescription>
                {status === "SUCCESS" ? <p>Thanks! I&apos;ll respond to you soon.</p> : <this.StyledFormSubmit className="btn btn-dark">Submit</this.StyledFormSubmit>}
                {status === "ERROR" && <p>Oops! There was an error. Feel free to send me an email at ChrisBakerDev@gmail.com</p>}
            </this.StyledForm>
        );
    }


}

export default SubmitForm;