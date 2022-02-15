import React, { Component } from 'react';
import axios from 'axios';
import config from '../components/config.json'
import Navbar from '../components/Navbar';

export default class Usersignin extends Component {
    signin(){
        let username = document.getElementById("username").value
        let password = document.getElementById('password').value


        axios.post(
            config.signinURL,
            {
                "username": username,
                "password": password
            })
            .then(function(response){
                if(response.data.error){
                    console.log(response.data.error)
                    alert("something went wrong.....")
                }
                else{
                    //location.href=config.signinURL
                    window.localStorage.Token = response.data.Token
                    alert('token is updated.')
                    window.location.href = '/home'
                    
                }
            })
            .catch(err=>alert(err))

    }
  render() {
    return <>
    <Navbar signup='1' signin='0' status='0' />
        <div className='container'>
            <h1>Signin Page</h1>
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">Username</label>
            <input type="text" className="form-control" id="username" aria-describedby="emailHelp"  />
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="password" />
        </div>
    
        <button type="submit" onClick={this.signin} className="btn btn-primary">Submit</button>
        </div>
    </>;
  }
}
