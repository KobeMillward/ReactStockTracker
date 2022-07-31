import React, {useState} from 'react';
import {Col, Label, Container, Form, Button, FormGroup, Input} 
    from 'reactstrap';

let JWToken = "";

function LogIn() {

    const url = "http://localhost:3001/user/login";
    const [responseText, setResponseText] = useState("");
  
    function logInUser() {
      let email = document.getElementById('inputEmail').value;
      let password = document.getElementById('inputPassword').value;
  
      fetch(url, {
        method: "POST",
        headers: {
          "accept":"application/json",
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          "email":email,
          "password":password
        })
      })
        .then(response => {
          if (!response.ok) { throw Error(response.statusText)}
          return response;
        })
        .then(response => response.json())
        .then(json => {
          JWToken = json.token
          console.log(JWToken)
          setResponseText("User logged in successfully!")
        })
        .catch (error => {
          setResponseText("Incorrect username or password")
          JWToken = "";
        })
    }
  
    return (
      <Container>
        <h1>Log In</h1>
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
          <Button className="btn-success" onClick={logInUser}>Log In</Button>
        </Form>
        <p>{responseText}</p>
      </Container>
    )
  }

  export {JWToken}
  export default LogIn;