import React, { Component } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import Navbar from '../components/Navbar';


export default class Bucket extends Component {

  constructor(){
    super();
    this.state = {
      formData:{
        buckets: [],
        done: undefined
      }
    }

    this.getBucketNames();
  
  }

  getBucketNames(){
    
    axios.post("http://localhost:5000/buckets",{"customer": window.localStorage.customer},{
      headers: {
        'Authorization': window.localStorage.Token
      }
    },).then(response=>{
      if(response.data.err==='true'){
        alert("invalid token.")
        window.location.href = '/';
      }
      var temp = []
      response.data.Buckets.forEach(element => {
        //const name = encodeURI(element.Name);
        //names[i].replace(/\s/g, '%20')
        temp.push(<li className="list-group-item" key={element.Name} onClick={()=>this.helper(element.Name.replace(/\s/g, '%20'))}><a className="at" href={"/files/"+element.Name}> {element.Name} </a></li>);
   
      });
      this.setState({
        formData: {
          buckets: temp,
          done: true
        }
      })
    }).catch(err=>{
      console.log(err)
      alert('invalid token.')
      window.location.href = '/'
    })
  } 


  helper(item){
    console.log(`${item} is clicked....`)
    
  }

  render() {
    return <>
    {
      !this.state.formData.done ? <div className="container d-flex my-10 justify-content-center">
        <ReactLoading type={'bars'} color={'#548CFF'} height={200} width={200} /> 
        {/* '#03fc4e' */}
      </div>
      :<>
      <Navbar /> 
      <div className="container my-4">
      <div className='container'>
        
        <ul className="list-group">{this.state.formData.buckets}</ul>
      </div>
    </div>
    </>
    }
    
    </>;
  }
}
