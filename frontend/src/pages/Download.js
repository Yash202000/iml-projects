import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom'
import config from '../components/config.json'
import FileDownload from 'js-file-download'

export default function Download() {
  const [output, setoutput] = useState(undefined);
  const {bucketname} = useParams();
  const prefix = window.location.href.split(bucketname+'/')

  useEffect(()=>{
    axios.post(config.downloadURL,{
      "Bucket": bucketname, 
      "Prefix": decodeURI(prefix[prefix.length-1])
    },{
      headers: {
        'Authorization': window.localStorage.Token,
        
      }
    }).then(
      response=>{
        
        setoutput(response.data)
        let fname=prefix[prefix.length-1].split('/')
        fname = fname[fname.length-1]

        FileDownload(response.data,fname)
        //const url = window.URL.createObjectURL(new Blob([response.data]));
        // const link = document.createElement('a');
        // link.href = url;
        
        // link.setAttribute('download', decodeURI(fname)); //or any other extension
        // document.body.appendChild(link);
        // link.click();
      }
    )
    .catch(err=>alert(err))
  })
  
  
  return <div>
      <button type="button" className="btn btn-primary"><a href={config.downloadLocation+'/'+bucketname+'/'+decodeURI(prefix[prefix.length-1])}>Download</a></button>
  </div>;
}



// import React,{useEffect} from 'react';
// import axios from 'axios';

// export default function Download() {
//   const clickhandle = () => {
//     axios.get("https://source.unsplash.com/randome/500*500")
//     .then(response=>{
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a')
//       link.href = url
//       link.setAttribute('download','file.jpg')
//       document.body.appendChild(link)
//       link.click();
//     })
//   };
  
//   return <div>
//     <button onClick={clickhandle}>click</button>
//   </div>;
// }
