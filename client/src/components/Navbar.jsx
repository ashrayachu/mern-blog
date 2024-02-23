

import {useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'




function Navbar() {
  const {setUserInfo, userInfo}  = useContext(UserContext)

  useEffect(()=>{
    fetch('http://localhost:3000/credentials',{
    credentials:'include'
   }).then(response=>{
     response.json().then(userInfo=>{
      setUserInfo(userInfo)
    })
   })
  },[]);

 function handleLogout(e){
     e.preventDefault();
    fetch('http://localhost:3000/logout',{
        method:'POST',
         credentials:'include'
         })
        setUserInfo(null)
        
  }
const username = userInfo?.username

  return (
    <nav className='w-full flex justify-between py-7 px-8 md:px-24 mb-5 bg-l-pink' >
      <div className='w-1/2 d-flex justify-center items-center'>
        <Link to='/'>
        <h1 className='font-bold text-3xl cursor-pointer'>Blog</h1>
        </Link>
      </div>
      <div className='w-1/2 flex flex-row-reverse font-semibold gap-3'>
      {username && (
        <>
         <Link to='/createpost'><button className='black-btn'>Create Post</button></Link>
         <button className='black-btn'onClick={handleLogout}>Logout</button>

        </>
      )}
      {!username &&(
        <>
         <Link to='/login'><button className='black-btn'>Login</button></Link>
         <Link to='/register'><button className='black-btn'>Register</button></Link>
        </>
      )}
       </div>
      <div>
      </div>
    </nav>

  )
}

export default Navbar