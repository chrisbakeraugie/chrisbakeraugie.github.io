/**
 * This code has been taken from https://formspree.io/forms/xgekkjeo/integration for React
 * This uses formspree to submit forms to my email
 */
import React from "react";
import Form from "react-bootstrap/Form";


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

    render() {
        const { status } = this.state;
        return (

            <Form onSubmit={this.submitForm}
                action="https://formspree.io/xgekkjeo"
                method="POST">

                <Form.Label>Send me a message, I read them everyday.</Form.Label>
                <Form.Control id="form-email"
                    type="email"
                    placeholder="Your email Example:ChrisBakerDev@gmail.com"
                    name="email"
                    
                />
                <Form.Control id="form-text"
                    as="textarea"
                    placeholder="Tell me about your project, and maybe leave some contact information :)"
                    name="message"
                    rows="4"
                   


                />
                {status === "SUCCESS" ? <p>Thanks! I&apos;ll respond to you soon.</p> : <button id="form-button" >Submit</button>}
                {status === "ERROR" && <p>Ooops! There was an error. Feel free to send me an email at ChrisBakerDev@gmail.com</p>}
            </Form>

        );
    }


}

export default SubmitForm;