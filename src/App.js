import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import Cleanupstatus from './pages/Cleanupstatus'
import Drstatus from './pages/Drstatus'
import Home from './pages/Home'
import Usersignin from './pages/Usersignin'
import Usersignup from './pages/Usersignup'
import Missing_projects from './pages/Missing_projects'
import Present_projects from './pages/Present_project'
import Not_synchronized from './pages/Not_synchronized'
import Synchronized from './pages/Synchronized'
import Sync_errors from './pages/Sync_errors'
import Delete_project from './pages/Delete_project'



function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        
          <Route exact path='/' element={<Usersignin />}></Route>
          <Route exact path='/home' element={<Home />}></Route>
          <Route path="/signup" element={<Usersignup />}></Route>
          <Route path="/signin" element={<Usersignin />}></Route>
          <Route path='/home/drsink' element={<Drstatus />}></Route>
          <Route path='/home/cleanup' element={<Cleanupstatus />}></Route>
          <Route path='/home/drsink/missing_projects' element={< Missing_projects />}></Route>
          <Route path='/home/drsink/present_projects' element={<Present_projects />}></Route>
          <Route path='/home/drsink/not_synchronized' element={< Not_synchronized />}></Route>
          <Route path='/home/drsink/synchronized' element={< Synchronized />}></Route>
          <Route path='/home/drsink/sync_errors' element={< Sync_errors />}></Route>
          <Route path='/home/drsink/delete_project' element={< Delete_project />}></Route>
         
          
        </Routes>
    </Router>
    </div>
  );
}

export default App;
