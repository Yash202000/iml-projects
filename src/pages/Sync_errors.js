import React, { Component } from 'react'
import Drcomp from '../components/Drcomp'
import ReactLoading from 'react-loading'
import config from '../components/config.json'
import axios from 'axios'


export default class Sync_errors extends Component {
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
    const tempelementlist = this.state.elementlist;
    this.setState({
      output: this.state.output,
      elementlist: [],
      done: undefined
    })
    console.log(item)
     // write axios.post *import action.
     axios.get(config.importProjectURL+'/'+item.id,{
      headers: {
        'Authorization': window.localStorage.Token
      }
    }).then(message=>{
      console.log(message)
      if(message.data!=='success') {
        alert('cannot perform this action..')
        this.setState({
          output: this.state.output,
          elementlist: tempelementlist,
          done: true
        })
      }
      else{
        let index = this.state.output.indexOf(item)
    
        this.state.output.splice(index,1)
        var tempelement = this.getTrArray(this.state.output)
        this.setState({
          output: this.state.output,
          elementlist: tempelement,
          done: true
        })

      }
    })

    
  }

  getTrArray(data){
    var temp =[]
    data.map((item,index)=>{
      temp.push(
        <tr  key={item.id}>
        <th scope="row">{index}</th>
        <td>{item.id}</td>
        <td>{item.last_successful_update_at}</td>
        <td>{item.last_update_started_at}</td>
        <td>{item.status}</td>
        <td><button type="button" className="btn btn-primary" onClick={()=>this.handleClick(item)}>Sync</button></td>
        </tr>
      )
    });
    return temp;
  }
  


  componentDidMount(){
    axios.get(config.remoteMirrorsListURL,[],{
      headers: {
        'Authorization': window.localStorage.Token
      }
    }).then(result=>{
      console.log(result.data)
      var data = []
      result.data.output.map((item,index)=>{
        if(item.length!==0) {
          data.push({
            id: result.data.ids[index],
            last_successful_update_at: item[0].last_successful_update_at,
            last_update_started_at: item[0].last_update_started_at,
            status: "Not updated since "+Math.floor((new Date()-new Date(item[0].last_successful_update_at))/86400000) +" days."
          })

          console.log(data)
        }

      });
      var temp = this.getTrArray(data);
      

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
    <Drcomp  present_project='1' not_synchronized='1' synchronized='1' sync_errors='1' delete_project='1' />
    
    
    <div  className="container my-3">
    <p>please take a note that this application will assume first mirror status if application contain multiple mirrors.</p>
    <p>Note: Sync will delete entire project from backup server and recreate it.</p>
        <div className="table-responsive">
          <table className="table table-bordered table-hover" id='projectTable'>
          <thead>
              <tr>
              <th scope="col">SN</th>
              <th scope="col">id</th>
              <th scope="col">last_successful_update_at</th>
              <th scope="col">last_update_started_at</th>
              <th scope="col">status</th>
              <th scope="col">action</th>
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
