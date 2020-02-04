/**
 * This code has been taken from https://formspree.io/forms/xgekkjeo/integration for React
 * This uses formspree to submit forms to my email
 */
import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"


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
        <Form.Control type="email" placeholder="christopherbaker15@augustana.edu" name="email" />
        <Form.Control type="textarea" placeholder="I have some projects you might be interested in... Find me on LinkedIn or at 123-456-7890" name="message"/>
            {status === "SUCCESS" ? <p>Thanks!</p> : <button id="form-button">Submit</button>}
            {status === "ERROR" && <p>Ooops! There was an error.</p>}
    </Form>
    
    );
  }

  
}

export default SubmitForm;