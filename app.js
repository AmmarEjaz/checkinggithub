const express=require('express');
const app=express();
const mysql=require('mysql');

app.use(express.static("./public"))

const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}))

app.listen(3002,()=>{
    console.log("The server is up and runnng");
})

app.get("/",(req,res)=>{
    res.send("This is the response from the server");
})


const pool=mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'ammarpop12',
    database:'cameldb'
})

function getConnection(){
    return pool
}

app.post('/user_create',function(req,res){
    const firstName=req.body.create_firstname;
    const secondName=req.body.create_secondname;

    const queryString="INSERT INTO users(firstname,secondname) values(?,?)";
    getConnection().query(queryString,[firstName,secondName],function(err,results,fields){
        if(err){
            console.log("there is some error"+err);
        }else{
            console.log("inserted with new user id"+results.insertedId);
            res.end();
        }
    })

})
app.get("/users",(req,res)=>{
    
    const queryString="SELECT * FROM users"
   
    getConnection().query(queryString,(err,rows,fields)=>{
        if(err){
            console.log("there is some error fetching the data");
        }

        res.json(rows);
    })
})

app.get("/user/:id",(req,res)=>{
    const queryString="SELECT * FROM users where id = "+req.params.id
    
    getConnection().query(queryString,(err,rows,fields)=>{
       
        if(err){
            console.log("There is some error which you can see "+ err);
        }
       

        res.json(rows);
    })



    
})