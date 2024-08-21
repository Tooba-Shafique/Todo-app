const express = require ('express')
const mongoose = require ('mongoose')
const cors = require ('cors')
const TodoModel = require ('./Models/Todo')
const dotenv=require('dotenv')
const ConnectDB =require('./utils/db')
const app=express()
app.use(cors({
    origin: 'https://todo-app-api-henna-kappa.vercel.app',//'http://localhost:5173',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }))
app.use(express.json())
dotenv.config()

ConnectDB();


app.post('/add' , (req , res)=>{
    const task = req.body.task;
    TodoModel.create ({
        task : task 
    })
    .then (result => res.json(result))
    .catch(err => res.json(err))
})
app.get ('/get' ,(req ,res)=>{
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err =>res.json(err))
})

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    console.log("The id is:", id);
    TodoModel.findByIdAndUpdate({ _id: id }, { task: task })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});
app.delete('/delete/:id' , (req , res)=>{
    const {id} =req.params;
    console.log("_id",id);
    TodoModel.findByIdAndDelete({_id:id})
    .then (result => res.json(result))
    .catch(err=> res.json(err))
})
const PORT = process?.env?.PORT;
  console.log("The port is:",PORT)
app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
})