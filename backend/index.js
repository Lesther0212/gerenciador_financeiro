const express = require('express');

const app = express();

app.listen(3000,()=> console.log("Gatinho"));

app.get('/', (req,res)=>{
    res.send("minhal")
})

app.get('/cachorro', (req,res)=>{
    res.send("AUAU")
})

app.get('/fim', (req,res)=> {res.end()} )

const dados = ['Murilo'];

app.get('/j', (req,res)=>{res.json({dados})})