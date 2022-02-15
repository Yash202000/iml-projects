import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Usersignup from './pages/Usersignup';
import Usersignin from './pages/Usersignin';
import Home from './pages/Home';
import Bucket from './pages/Bucket';
import Files from './pages/Files';
import Download from './pages/Download';

export default class App extends Component {
  render() {
    
    return <div className="App">
    {/* <Usersignup /> */}
    <Router>
      <Routes>
          <Route exact path='/' element={<Usersignin />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path="/signup" element={<Usersignup />}></Route>
          <Route path="/signin" element={<Usersignin />}></Route>
          <Route path="/buckets"  element={<Bucket />}></Route>
          <Route path="/files/:bucketname/*" element={<Files />}></Route>
          <Route path='/download/:bucketname/*' element={<Download />}></Route>
        </Routes>
    </Router>
    </div>;
  }
}
