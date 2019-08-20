const express=require('express');
const expressLayouts=require('express-ejs-layouts')
const mongoose=require('mongoose');
const app=express();


// DB configs
const db=require('./config/keys').MongoURI;


//  Async Connection With MongoDb
(async ()=> {
    try{
        const connection= await mongoose.connect(db,{useNewUrlParser:true});
        console.log("Connected with MongoDb")
     }catch(err){
         console.log('error connecting with MongoDb Cluster');
         throw(err);
     }
})();


//  Ejs 
app.use(expressLayouts);
app.use(express.urlencoded({extended:false}));
app.set('view engine','ejs');

app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

const PORT=process.env.PORT || 5000;

//  Routes

app.listen(PORT,()=>{
    console.log(`app is listening on port ${PORT}`)
})