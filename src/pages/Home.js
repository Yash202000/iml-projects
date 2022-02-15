import React from 'react'
import {Link , Routes, Route} from 'react-router-dom'
import Navbar from '../components/Navbar'
import Drstatus from './Drstatus'

export default function Home() {
  
  
  return (
    <>
    <Navbar home='1' />
    <div className="container">
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
          display: 'flex',
          justifyContent: "space-evenly"
        }}
      >
        <Link to="/home/drsink">DrsinkStatus</Link> 
        <Link to="/home/cleanup">CleanupStatus</Link>
      </nav>
    
    </div>
    </>
  )
}
