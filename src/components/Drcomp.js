import React, {useState,useEffect} from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'

export default function Drstatus(props) {


  const [result, setresult] = useState(
    {
      link: [],
      done: undefined
    }
  )

  useEffect(() => {
    let temp = []
    if(props.missing_projects==='1') temp.push(<Link key={1} to="/home/drsink/missing_projects">missing_projects</Link> )
    if(props.present_project==='1') temp.push(<Link key={2} to="/home/drsink/present_projects">present_project</Link>)
    if(props.not_synchronized==='1') temp.push(<Link key={3} to="/home/drsink/not_synchronized">not_synchronized</Link>)
    if(props.synchronized==='1') temp.push(<Link key={4} to="/home/drsink/synchronized">synchronized</Link>)
    if(props.sync_errors==='1') temp.push(<Link key={5} to="/home/drsink/sync_errors">errors</Link>)
    if(props.delete_project==='1') temp.push(<Link key={6} to="/home/drsink/delete_project">delete_project</Link>)

    setresult({
      link: temp,
      done: true
    });
    
  }, [])
  

  return (
    <>
    <Navbar home='1' />
    <div className="container">
      {/* <hr /> */}
      {/* <h6 style={{textAlign: 'center'}}>comparing http://15.10.0.196:9000 and https://gitlab.com(ash_p)</h6> */}
      {/* <div style={{textAlign: 'center'}}>comparing http://15.10.0.196:9000 and https://gitlab.com(ash_p)</div> */}
      <hr />
      <nav
        style={{
          paddingBottom: "1rem",
          display: 'flex',
          justifyContent: "space-evenly"
        }}
      >
        {result.link}
      </nav>
      <hr />
    </div>
    </>
  )
}
