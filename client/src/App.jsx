import{BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'

import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Createpost from './components/Createpost'
import Postpage from './components/Postpage'
import Updatepost from './components/Updatepost'




import { UserContextProvider } from './UserContext'


function App() {


  return (
    <div className="app">
      <UserContextProvider>
      <Router>
        <Navbar/>
        <Routes> 
          <Route path='/' element={<Home/>}/>
          <Route path='login'element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='createpost' element={<Createpost/>}/>
          <Route path='createpost/:id' element={<Postpage/>}/>
          <Route path='updatepost/:id' element={<Updatepost/>}/>
           
      </Routes>
      </Router>
      </UserContextProvider>
    </div>  
    
    
  )
}

export default App
