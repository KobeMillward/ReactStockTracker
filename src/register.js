import React, {useState} from 'react';
import {Col, Label, Container, Form, Button, FormGroup, Input} 
    from 'reactstrap';

function Register() {
    const url = "http://localhost:3001/user/register";
    const [responseText, setResponseText] = useState("");
  
    function registerUser() {
      let email = document.getElementById('inputEmail').value;
      let password = document.getElementById('inputPassword').value;
  
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
          "accept":"application/json"
        },
        body: JSON.stringify({
          "email": email,
          "password": password
        })
      })
        .then(response => response.json())
        .then(json => setResponseText(json.message))   
    }
  
    return (
      <Container>
        <h1>Register</h1>
        <Form>
          <FormGroup row>
            <Label for="inputEmail" sm={2}>Email:</Label>
            <Col sm={5}>
              <Input type="email" id="inputEmail" name="email"></Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="inputPassword" sm={2}>Password:</Label>
            <Col sm={5}>
              <Input type="password" id="inputPassword" name="password"></Input>
            </Col>
          </FormGroup>
          <Button className="btn-success" onClick={registerUser}>Submit</Button>
        </Form>
        <p>{responseText}</p>
      </Container>
    )
  }

  export default Register;