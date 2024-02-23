import React from 'react'
import {Link, Navigate} from 'react-router-dom'
import { useState } from "react"




function Register() {
  const [username, setUsername]= useState('')
  const [password, setPassword]= useState('')
  const [confirmpassword, setConfirmpassword]= useState('')
  const [redirect, setRedirect]= useState(false)



  async function  handleRegister(e){
   e.preventDefault();
   if(password === confirmpassword){
    const response = await fetch('http://localhost:3000/register',{
      method:'POST',
      body: JSON.stringify({username, password}),
      headers:{'Content-Type':'application/json'},
      
    })
    // console.log("Hello handleRegister")
   if(response.ok){
   setRedirect(true);
  alert("Registered Successfully")
   }
   else{
    alert("username already exist")
   }
   }
   else{
    alert("password does not match")
   }
 }
//  console.log(redirect)
 if(redirect){
 return <Navigate to ='/login'/>
 }

  return (
  <section className='Register w-full h-full flex flex-col justify-center items-center p-2'>
      <form onSubmit={handleRegister} className='flex flex-col w-5/6 h-full bg-l-purple
      items-center justify-center gap-10
       md:w-1/3 rounded-lg p-10 font-satoshi'>  

      <h1 className='text-4xl font-black font-poppins' >Register</h1>

      <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}
       className=' w-full p-3'placeholder='username' required min={4}/>

      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}
      className='w-full p-3 placeholder:' placeholder='Password' required/>

      <input type="password" value={confirmpassword} onChange={(e)=>setConfirmpassword(e.target.value)}
       className='w-full p-3' id="" placeholder='Enter the password again' required/>

      <button className='black-btn-submit w-full'>Register</button>

      <p className='text-sm text-slate-800 md:text-l font-bold'>Already have an account?
      <Link to='/login'>
        <span className='p-3 underline'>Login</span></Link></p>
      </form>
  </section>
  )
}

export default Register