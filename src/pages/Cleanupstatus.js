import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import config from '../components/config.json'
import ReactLoading from 'react-loading'



export default function Cleanupstatus() {
    const [result, setresult] = useState({
        files: [],
        done: true
      });
      
      function renderResult(){
        setresult({
          files: [],
          done: undefined
        })
        const noofdays = document.getElementById('noofdays').value
  
        console.log('clicked')
        axios.post(config.listNotUpdatedURL,{"days": noofdays},{
          headers: {
            'Authorization': window.localStorage.Token
          }
        }).then(result=>{
            var temp = [];
            var counter = 0;
            result.data.data.forEach(item => {
                counter=counter+1;
                temp.push(
                  <tr key={counter}>
                  <th scope="row">{counter}</th>
                  <td>{item[0]}</td>
                  <td>{item[1]}</td>
                  <td>{item[2]}</td>
                  <td>{Math.floor((new Date()-new Date(item[2]))/86400000)}</td>
                  </tr>
                )
            });
            setresult({
                files: temp,
                done: true
            });
        })
      }
      
      // useEffect(()=>{
      //     axios.post(config.listNotUpdatedURL,{"days": 0},{
      //       headers: {
      //         'Authorization': window.localStorage.Token
      //       }
      //     }).then(result=>{
      //         var temp = [];
      //         var counter = 0;
      //         result.data.data.forEach(item => {
      //             counter=counter+1;
      //             temp.push(
      //               <tr key={counter}>
      //               <th scope="row">{counter}</th>
      //               <td>{item[0]}</td>
      //               <td>{item[1]}</td>
      //               <td>{item[2]}</td>
      //               </tr>
      //             )
      //         });
      //         setresult({
      //             files: temp,
      //             done: true
      //         });
      //     })
      // })
  return !result.done ? <div className="container d-flex my-10 justify-content-center">
      <ReactLoading type={'bars'} color={'#548CFF'} height={200} width={200} /> 
      {/* '#03fc4e' */}
    </div>
    :<>
    <Navbar home='1'/>
    <div className="input-group mb-3 container my-3">
    <div className="input-group-prepend">
        <span className="input-group-text" id="inputGroup-sizing-default">NoOfDays</span>
    </div>
    <input required type="number" id='noofdays' className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
    <button type="button" className="btn btn-primary" onClick={renderResult}>Result</button>
    <div  className="container my-3">
        <table className="table table-bordered table-hover">
        <thead>
            <tr>
            <th scope="col">SN</th>
            <th scope="col">id</th>
            <th scope="col">path_with_namespace</th>
            <th scope="col">last_activity_at</th>
            <th scope="col">no_of_days</th>
            </tr>
        </thead>
        <tbody>
            {result.files}
        </tbody>
        </table>
    </div>
    
    
    </div>
    
    </>
  
}
