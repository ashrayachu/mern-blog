
import { useEffect, useState } from 'react';
import { Navigate, useParams} from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function createpost() {
 const [title, setTitle]= useState('');
 const [files, setFiles]= useState('');
 const [content, setContent]= useState('');
 const [redirect, setRedirect] = useState(false)
const {id} = useParams();

useEffect(()=>{ 
  fetch(`http://localhost:3000/createpost/${id}`,{
  }).then(response => response.json().then(
    post => {
      setTitle(post.title),
      setContent(post.content)
    }
))
},[])

 async function handlePost(e){  
  const data = new FormData();
  data.set("title",title); 
  data.set("content",content);
  data.set("id",id);

  if(files?.[0]){
    data.set("file",files?.[0]);
  }
  e.preventDefault();
  const response =  await fetch(`http://localhost:3000/createpost/${id}`,{
    method:'PUT',
    body: data,
    credentials:'include'
  })
  if(response.ok){
    setRedirect(true)
  }
  else{
    alert("Could not Edit post. Try again!!")
  }
 }

if(redirect){
  return <Navigate to={`/createpost/${id}`}/>
}


  return (
    <section className='p-16 flex flex-col'>
    <form onSubmit={handlePost}  className='flex flex-col w-full gap-4 md:p-10 '>
      <input type='text' 
      className='border p-2'
      placeholder='title'
      value={title}
      onChange={(e)=>{setTitle(e.target.value)}}
      required
      />

      <input type='file' 
      className='border p-2'
      placeholder='image'
      accept='image/*'
      onChange={(e)=>{setFiles(e.target.files)}}
      // required
      />

       <ReactQuill theme="snow" 
       className='border' 
       value={content}
       onChange={setContent}
        required
       />  

       <button className='black-btn w-full'>Submit</button>
       </form>
    </section>
  )
}

export default createpost