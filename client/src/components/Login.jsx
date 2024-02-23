import { useContext, useState } from "react"
import {Link, Navigate} from 'react-router-dom'
import { UserContext } from "../UserContext"



function Login() {
  const [username, setUsername]= useState('')
  const [password, setPassword]= useState('')
  const [redirect, setRedirect]= useState(false)
  const {setUserInfo} = useContext(UserContext)


   async function handleLogin(e){
   e.preventDefault()
   
   const response = await fetch('http://localhost:3000/login',{
    method:'POST',
    body: JSON.stringify({username, password}),
    headers:{'Content-Type':'application/json'},
    credentials:'include' 
   })
  
   if(response.status === 200){
    response.json().then(userInfo=>{
      setUserInfo(userInfo);
      // console.log(userInfo)
    setRedirect(true);  

    })
   }
   else{
    alert("failed")
   }
  }
  if(redirect){
   return <Navigate to='/'/>
  }
  

  return (
    <section className='Login w-full h-full flex
     flex-col items-center p-2'>
      <form onSubmit={handleLogin} className='flex flex-col 
      w-5/6 h-full bg-l-purple
      items-center justify-center gap-10
      md:w-1/3 rounded-lg p-10 '>  
     <h1 className='text-4xl font-black font-poppins' >Login</h1>

     <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}
     className=' w-full p-3'placeholder='username' required/>

     <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}
     className='w-full p-3' placeholder='Password' required/>
     <button className='black-btn-submit w-full'>Login</button>
     
     <p className="text-sm text-slate-800 md:text-l font-bold">Do not have an account?<Link to='/register'>
      <span className='p-3 underline'>register</span></Link>
      </p>
     
 

    </form>
</section>
        
  )
}

export default Login