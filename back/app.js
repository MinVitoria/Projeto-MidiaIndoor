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

//("/api/usuarios/", async(req,res)=>{
    try{
      //  const {id, nome, email}=req.body

        const conexao= await pool.getConnection()
        const sql = `UPDATE usuarios SET nome="${nome}", email="${email}" WHERE  id=${id}`
        const [linhas] = await conexao.execute(sql)
        console.log([linhas])
        conexao.release()
        res.json(linhas[0])
    } catch(error){
        console.log(`O Erro que ocorreu foi:${error}`)
        res.send(500).json({error:"Deu algum erro na atualização"})
    }
})
//ROTA PARA O UPDATE/EDITAR
app.put("/midia/edit/", async(req,res)=>{
    try{
        const{id, nome, tipo, status, data_inicio, data_fim, url, tempo}= req.body
        
        const conexao= await pool.getConnection()
        const sql = `UPDATE usuarios SET nome="${nome}", email="${email}", status="${status}",data_inicio="${data_inicio}",data_fim="${data_fim}",url="${url}",tempo="${tempo}" WHERE  id=${id}`



    }catch(error){
        console.log(`O Erro que ocorreu foi:${error}`)
        res.send(500).json({error:"Deu algum erro na atualização"})
    }
})