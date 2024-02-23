require('dotenv').config()

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken')
const app = express();
const mongoose = require('mongoose')
const cookie_parser = require('cookie-parser')
const fs = require('fs')


const multer= require('multer')
const multerMiddleware = multer({dest:'uploads/'});

const User = require('./models/User')
const Post = require('./models/Createpost');
 

app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(cors({credentials:true, origin:'http://localhost:5173'}));
app.use(express.json());
app.use(cookie_parser());

saltRounds = 10
secret = process.env.SECRET_KEY

mongoose.connect(process.env.MONGODB_URI_KEY)


app.post('/register', function(req, res) {
    const { username, password } = req.body;
    bcrypt.hash(password, saltRounds, async function(err, hash) {
        if (err) {
            console.error("Error in hashing password", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        
        try {
            const userDoc = await User.create({ username, password: hash });
            return res.json(userDoc);
        } catch (e) {
            console.error("Error in creating user model", e);
            return res.status(500).json({ error: "Internal server error" });
        }
    });
});

app.post('/login',async function (req, res){
  
 const { username, password } =  req.body
 try{
 const userDoc = await User.findOne({username})
 const passOk = await bcrypt.compare(password, userDoc.password)
 if(passOk){
    // res.json("password is matching")
  jwt.sign({username:username, id:userDoc._id}, secret, (err, token)=>{
        if(err) throw  err
        else{
        res.cookie('token',token).json({id:userDoc._id,username})
          }
    })
 }
else{
    res.status(500).json("password does not match")
}
}
catch(e){
  res.status(500).json("pasword could not match")
}
 
 })
 app.get('/credentials',(req, res)=>{
    const {token} =  req.cookies;
if(token){
    try{
       jwt.verify(token, secret, (err, result)=>{
        if(err) throw err;
        res.json(result)
       })
    }
    catch(e){
        console.log(e)
    }
  }
  else{
    res.json("Not Logged In")
  }
 })

 app.post('/logout',(req, res)=>{
 res.cookie('token','').json('token');
 })
 
 
 
 app.post('/createpost',multerMiddleware.single('file'),async(req, res)=>{

  const {token} =  req.cookies;
  if(token){
      try{
         jwt.verify(token, secret, async (err, result)=>{
          if(err) throw err;
          const {originalname, path} = req.file
          const parts = originalname.split('.');
          const ext = parts[parts.length - 1];
          newPath = path + '.' + ext
          fs.renameSync(path, newPath)
          const {content, title, summary} = req.body;
          const postDoc = await Post.create({title, summary, content, cover:newPath ,author:result.id })
          res.json(postDoc)
         })
      }
      catch(e){
          console.log(e)
      }
    }
    else{
    res.status(500).json("Not logged in")
    }
   })

 app.get('/createpost',async(req, res)=>{
    const posts = await Post.find({}).
    populate('author',['username'])
    .sort({createdAt: -1}).limit(10)
    res.json(posts)
 })

 app.get('/createpost/:id',async(req, res)=>{
  const {id} = req.params;
  const {token} = req.cookies;
   //if token is not undefined we enter try to verify the user and find the author
    if(token){
             try{//verify the author
                jwt.verify(token, secret, async (err,userdoc)=>{
                    if(err) throw err;
                    // console.log(userdoc.username)
                    const postDoc = await Post.findById(id).populate('author')
                    // console.log("author_id",postDoc.author.username);

                    if(userdoc.username === postDoc.author.username){
                       const newPost = {postDoc:postDoc , postAuthor:postDoc.author.username}
                        res.json(newPost);  
                    }    
                    else   {
                    const postDoc = await Post.findById(id).populate('author')
                     res.json(postDoc)
                    }
                })
             }
             catch(e){
               res.status(500).json("Could not verify token")
             }
           }
    else {
        const postDoc = await Post.findById(id).populate('author')
         res.json(postDoc)
     }
    })
    app.put('/createpost/:id',multerMiddleware.single('file'),async(req, res)=>{
        let newPath = null
        const {token} = req.cookies;

        if(req.file){
            const {originalname, path} = req.file
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            newPath = path + '.' + ext;
            fs.renameSync(path, newPath);
         }
        try{
           if(token){
            jwt.verify(token, secret, async(err, result)=>{
                if(err) throw err;
                const {id, title, content} = req.body;
                const postDoc = await Post.findById(id)
                const isAuthor = JSON.stringify(postDoc.author._id)===JSON.stringify(result.id)
                if(!isAuthor){
                    return res.status(400).json("you are not the author")
                }
                await postDoc.updateOne({
                    title,
                    content,
                    cover:newPath ? newPath : postDoc.cover
                })
                res.json(postDoc)
            })
           }
            
        }
        catch(e){
            res.status(500).json("Could not verify token")
        }
    })
app.listen( process.env.PORT || 3000);