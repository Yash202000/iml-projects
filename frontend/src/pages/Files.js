import React ,{useEffect,useState} from 'react';
import {useParams} from 'react-router-dom'
import Navbar from '../components/Navbar';
import axios from 'axios'
import ReactLoading from 'react-loading';
import config from '../components/config.json'
import Download from './Download';



export default function Files() {
  const [result, setresult] = useState({
    files: [],
    done: undefined
  });
 
  
  const {bucketname} = useParams();
  const prefix = window.location.href.split(bucketname+'/')
  
  
  useEffect(()=>{
    console.log(prefix.length-1)
   if(prefix.length-1===0){
    axios.post(config.filesURL,{
      "Bucket": bucketname,
      "customer": window.localStorage.customer
  },{
    headers: {
      'Authorization': window.localStorage.Token
    }
  })
  .then(response=>{
    if(response.data.length===0){
      //implement the logic for download when response.data length is 0
        window.location.href = config.downloadLocation+'?Bucket='+bucketname+"&Prefix="+prefix[prefix.length-1]+"&Token="+window.localStorage.Token+'&customer='+window.localStorage.customer;
    }else{
      var elementstack = []
      response.data.forEach(element => {
        elementstack.push(<li className="list-group-item" key={element} ><a className="at" href={"/files/"+bucketname+"/"+prefix[prefix.length-1]+"/"+element}> {element} </a></li>)
      });
    
      setresult({
        files: elementstack,
        done: true
      })
    }
    
  })
  .catch(err=>{
    alert('Please authenticate user self.. first...')
    
  })
   }else{
     console.log(prefix[prefix.length-1])
     console.log(prefix)
     console.log(config.filesURL)
        axios.post(config.filesURL,{
          "Bucket": bucketname, 
          "Prefix": prefix[prefix.length-1]+"/",
          "customer": window.localStorage.customer
      },{
        headers: {
          'Authorization': window.localStorage.Token
        }
      })
      .then(response=>{
        if(response.data.length===0){
          //implement the logic for download when response.data length is 0
          window.location.href = config.downloadLocation+'?Bucket='+bucketname+"&Prefix="+prefix[prefix.length-1]+"&Token="+window.localStorage.Token+'&customer='+window.localStorage.customer;
        }else{
          var elementstack = []
          response.data.forEach(element => {
            elementstack.push(<li className="list-group-item" key={element} ><a className="at" href={"/files/"+bucketname+"/"+prefix[prefix.length-1]+"/"+element}> {element} </a></li>)
          });

          setresult({
            files: elementstack,
            done: true
          })
        }
        
      })
      .catch(err=>{
        alert('Please authenticate user self.. first...')
        
      })
   }
    
  },[])

  return !result.done ? <div className="container d-flex my-10 justify-content-center">
          <ReactLoading type={'bars'} color={'#548CFF'} height={200} width={200} /> 
          {/* '#03fc4e' */}
        </div>
        :<>
          <Navbar /> 
          <div className="container my-4">
          <div className='container'>
            
            <ul className="list-group">{result.files}</ul>
          </div>
        </div>
        </>;
}
