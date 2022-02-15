import React, { Component } from 'react';
import Navbar from '../components/Navbar';


function connectCustomer() {
  console.log('hello');
  console.log(document.getElementById('selectCustomer').value)
  if(document.getElementById('selectCustomer').value==='0'){
    alert('please select a customer.')
  }else{
    window.localStorage.customer = document.getElementById('selectCustomer').value;
    window.location.href = '/buckets'
  }
}


export default class Home extends Component {
 
  render() {
    return <>
    <Navbar />
    <div className="container">
      

      <div className="container">
      <h4>Select customer</h4>
        <select className="form-select" id='selectCustomer' aria-label="Default select example">
          <option value={0}>select customer</option> 
          {/* <option defaultValue={} value=""></option> */}
          <option value={"IML"}>IML</option>
          <option value={"NEU"}>NEU</option>
        </select>
        <button type="button" className="btn btn-primary" onClick={()=>connectCustomer()}>Connect</button>
      </div>

    </div>
    </>;
  }
}
