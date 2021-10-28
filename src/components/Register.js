import React  from "react";
import{Apireg  }from "./apireg";
import Form from 'react-bootstrap/Form';
import { Col } from "reactstrap";
import { Link } from "react-router-dom";

import '../App.css';
import Container from 'react-bootstrap/Container';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

const data = new FormData();
class Adduser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
        disabled: false,
      
      
      
      }
    
    
    
    this. apireg= new Apireg();
    toast.configure();
  }

 

  fileChangeHandler = (e) => {
    this.setState({
      fileData:e.target.files[0],
      fileDIS: URL.createObjectURL(e.target.files[0]),
  });
};

 
notify = () => {
  toast("Success");
};

  SubmitHandler(e) {
    e.preventDefault();
   
   if ( this.props.confirmPassword !== this.props.password) {
      alert("Passwords do not match");
      window.location.reload();
      
	} 
    
   if ( this.props.confirmPassword ===  this.props.password) {
  
    e.preventDefault()
    this.setState({ disabled: true })
 
    this.apireg.addUser(
      e.target.email.value,
      e.target.password.value,
      e.target.confirmPassword.value,
      e.target.eircode.value,
      )

      .then(() => {
    
        this.setState({ disabled: false })
        document.getElementById("addForm").reset()
    
     
        
     
        })
        .catch(() => {
          alert("please check your email and password and try again");
          this.setState({ disabled: false });
         window.location.reload();
        
        })
     

        data.append("image", this.state.fileData);
       fetch("https://back-end-app-1.herokuapp.com/single", {
       method: "POST",
          body: data,
        })
          .then(() => {
          console.log("File Sent Successful");
          })
       .catch((err) => {
         console.log(err.message);   
      
      }
     );
     window.location.reload();
         
       
   };
  }



  render() {
    return (
      <Container>
     <h3 className=" home">Register</h3> <br/>
        <Form className="form" onSubmit={(e) => this.SubmitHandler(e)} id="addForm">
        <Form.Group className="mb-3" > 
           <Form.Label>Email Address</Form.Label> 
            <Form.Control
            
              placeholder="Enter you email "
              type="email"
              name="email"
              disabled={this.state.disabled} 
           
              required/>
              </Form.Group>
              <Form.Group className="mb-3" > 
              <Form.Label>Password</Form.Label>    
              <Form.Control
                       placeholder="password"
             
              type="password" 
              name="password" 
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required
              disabled={this.state.disabled} 
           
              />
            </Form.Group>
            <Form.Group className="mb-3" > 
              <Form.Label>Confirm Password</Form.Label> 
            <Form.Control
               
               placeholder="confirm password"
               type="password" 
               name="confirmPassword" 
               pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
               title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                required
                disabled={this.state.disabled} 
              minLength="8"
         
            />
              </Form.Group>
             
            <Form.Group className="mb-3"> 
              <Form.Label>Eircode</Form.Label> 
              
           
             
            <Form.Control
           name="eircode"
              type="text"
              placeholder="eircode"
              pattern="(?:^[AC-FHKNPRTV-Y][0-9]{2}|D6W)[ -]?[0-9AC-FHKNPRTV-Y]{4}$" 
              title="Please enter a valid eircode"
              disabled={this.state.disabled} 
            
            />
            </Form.Group>
            <Form.Group>
              <Form.Label>Profile Image </Form.Label> <br />

            
          
          
          <input   
          
          type="file" 
          accept=".jpg, .jpeg, .png"
          id="image_uploads"
          onChange={(e) =>this.fileChangeHandler(e)} /><br/><br/>
          <Col xs={6} md={4}>
    <Image  className="img"  src={this.state.fileDIS} />
  
    </Col>
   
    </Form.Group>
<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
<Button variant="dark" type="submit" disabled={this.state.disabled}> Submit </Button>
            <br/>
          <p className="link">   <br/>
				Already have an account? <Link to="/login">Sign In</Link>
			</p>
        </Form>
        </Container>
    );
  }
}

export default Adduser;