const express = require("express")

const cors= require("cors")

const mysql= require("mysql2/promise")

const app = express()
app.use(cors())
const porta = 3306

app.listen(porta, ()=> {
    console.log(`Servidor rodeando em http://localhost:${porta}`)
})

// criar pool de conexão
const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'db_node',
    waitForConnections:true,
    connectionLimit: 3,
    queueLimit:0
})
//ola
