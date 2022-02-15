import React, { Component } from 'react'
import Drcomp from '../components/Drcomp'
import ReactLoading from 'react-loading'
import config from '../components/config.json'
import axios from 'axios'

export default class Synchronized extends Component {
  constructor(){
    super();
    
    this.handleClick = this.handleClick.bind(this);
    this.getTrArray = this.getTrArray.bind(this);

    this.state = {
      output: [],
      elementlist : [],
      done: undefined
    }
  }

  handleClick (item){
    this.setState({
      output: this.state.output,
      elementlist: [],
      done: undefined
    })
    console.log(item)
    let index = this.state.output.indexOf(item)
    
    this.state.output.splice(index,1)
    var tempelement = this.getTrArray(this.state.output)
    this.setState({
      output: this.state.output,
      elementlist: tempelement,
      done: true
    })
    
  }

  getTrArray(data){
    var temp =[]
    data.map((item,index)=>{
      temp.push(
        <tr  key={item.id1}>
        <th scope="row">{index}</th>
        <td>{item.id1}</td>
        <td>{item.path_with_namespace1}</td>
        <td>{item.id2}</td>
        <td>{item.path_with_namespace2}</td>
        <td>{item.createdAt}</td>
        </tr>
      )
    });
    return temp;
  }
  


  componentDidMount(){
    axios.post(config.synchronizedURL,[],{
      headers: {
        'Authorization': window.localStorage.Token
      }
    }).then(result=>{
      var temp = this.getTrArray(result.data);
      
      console.log(result.data)
        this.setState({
          output: result.data,
          elementlist : temp,
          done: true
        })
        
      })
    }
  
  render() {
    return !this.state.done ? <div className="container d-flex my-10 justify-content-center">
    <ReactLoading type={'bars'} color={'#548CFF'} height={200} width={200} /> 
    {/* '#03fc4e' */}
  </div>
  :<>
    <Drcomp  missing_projects='1' present_project='1' not_synchronized='1'  sync_errors='1' delete_project='1'/>
    
    
    <div  className="container my-3">
        <div className="table-responsive">
          <table className="table table-bordered table-hover" id='projectTable'>
          <thead>
              <tr>
              <th scope="col">SN</th>
              <th scope="col">id1</th>
              <th scope="col">path_with_namespace1</th>
              <th scope="col">id2</th>
              <th scope="col">path_with_namespace2</th>
              <th scope="col">created_at</th>
              </tr>
          </thead>
          <tbody>
              {
                this.state.elementlist
                
              }
          </tbody>
          </table>
        </div>
    </div>
  
    </>
  
  }
}
