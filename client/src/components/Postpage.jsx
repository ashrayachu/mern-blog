
import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'



function Postpage() {
const {id}= useParams();
const [username, setUsername] = useState('John Doe')
const [author, setAuthor] = useState(null)
const [cover, setCover] = useState('')
const [title, setTitle] = useState('')
const [content, setContent] = useState('')

    useEffect(()=>{
       fetch(`http://localhost:3000/createpost/${id}`,{
        credentials:'include'
       }).then(
        response => response.json().then(
            post => {
            // setUsername(post.author.username)
            if(post.postAuthor){
            setAuthor(post.postAuthor)
            setUsername(post.postDoc.author.username)
            setContent(post.postDoc.content)
            setCover(post.postDoc.cover)
            setTitle(post.postDoc.title)
            }
            else{
              setUsername(post.author.username)
              setContent(post.content)
              setCover(post.cover)
              setTitle(post.title)
            }
         }
        )
       )
    },[])


  return (
    <section className='w-full flex flex-col justify-center items-center'>
        <div className="w-full p-5 flex flex-col items-center gap-5
        md:w-5/6 gap-10">
                <h1 className='text-3xl font-bold text-center'>{title}</h1>
                <h2 className='text-2xl font-poppins text-slate-500 font-semibold'>
                  By {username}</h2>
                {author &&(
                  <Link to={`/updatepost/${id}`}> 
                     <button className='black-btn-edit'>Edit Post</button>
                  </Link>
                )}  
                
                <div className='w-full h-96 md:w-5/6'> 
                  <img src={'http://localhost:3000/'+cover} 
                  className='w-full h-full object-fit object-center'alt="" />
                </div>                
                <p className='font-inter text-l md:w-5/6' dangerouslySetInnerHTML={{__html:content}}/>
                <div className="text3xl">{author}</div>
           </div>
           
    </section>
  )
}

export default Postpage