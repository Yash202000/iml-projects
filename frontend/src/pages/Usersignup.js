import React, { Component } from 'react';
import axios from 'axios';
import config from '../components/config.json'
import Navbar from '../components/Navbar'


export default class Usersignup extends Component {
    
    signup(){
        let username = document.getElementById("username").value
        let password = document.getElementById('password').value
        

        axios.post(
            config.signupURL,
            {
                "username": username,
                "password": password
            })
            .then(function(response){
                if(response.data.error){
                    alert("username already exist....")
                    
                }
                // <Redirect push to="/signin" />
                window.location.href="http://localhost:3000/signin"
            })
            .catch(err=>alert(err))

    }

  render() {
    return <>
    <Navbar />
    <div className='container'>
        <h1>SignUp Page</h1>
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">Username</label>
            <input type="text" className="form-control" id="username" aria-describedby="emailHelp"  />
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="password" />
        </div>
       
        <button type="submit" onClick={this.signup} className="btn btn-primary">Submit</button>
    </div>
    
    </>;
  }
}
