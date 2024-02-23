import { Link } from "react-router-dom";
import {format} from "date-fns";

function Blog({_id, title,content,cover,author,createdAt}) {
  return (
    <section  className=' w-full p-2 mb-10 flex justify-center'>
      <div className=" w-5/6 bg-cyan grid grid-col-1
      justify-center items-center p-1 rounded-3xl
      md:grid-cols-2 gap-1" >
       
        <div className=" leftside w-full flex flex-col items-center
         gap-2 justify-center md:w-full bg-white p-1  rounded-3xl overflow-hidden
          md:p-5">
          <h1 className=' blog-content text-center text-2xl font-poppins 
          font-bold md:text-2xl '>{title} </h1> 
         <div className="blog-img-container w-full h-48 bg-l-cyan md:h-96 w-4/5 "> 
          <img src={'http://localhost:3000/'+cover} alt="Blog Image"  className='object-fit w-full h-full'/>
         </div>
        </div>

        <div className="rightside w-full flex flex-col  
              gap-2  md:bg-white h-full rounded-3xl justify-center">
          <div className='text-left flex flex-col blog-content 
                rounded-3xl'>
              <p className="line-clamp-[5] px-4 font-normnal
              md:line-clamp-[10]"
                 dangerouslySetInnerHTML={{__html: content}}/>
                 <h2 className=' blog-content mt-10 text-purple-950 font-bold'>{author.username}</h2>
                 <span className=' blog-content text-slate-700 font-bold'>
                  {format(new Date(createdAt), "yyyy-MM-dd")}
                  </span>
                  <button className="black-btn w-full align-middle self-center mt-4
                  md:w-1/2 ">
                   <Link to={`/createpost/${_id}`}>
                            visit page
                    </Link>
                   </button>
           </div>
         
             
         
        </div>

      </div>
     
    </section>
  )
}

export default Blog
