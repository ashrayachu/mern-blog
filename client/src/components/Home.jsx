import {useState, useEffect} from 'react'
import Blog from './Blog'



function Home() {
const [post, setPost] = useState('')


  useEffect(()=>{
      fetch('http://localhost:3000/createpost').then(response=>{
        response.json().then(post=>{
          setPost(post)
        })
      })
  },[])

  return (
    <div>
    {post && post.map((post,index) => {
      return (<Blog key={index}{...post} />);
    })}
    </div>
   
     
   
  )
}

export default Home