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

// rota Cadastrar - Yasmin Izaura
app.post('/midia/cadastrar', async (req,res)=>{
    try{
        const cadastro = req.params.cadastro
        const conexao= await pool.getConnection()
        const sql_cadastro = `INSERT INTO midia (nome, tipo, status, data_inicio, data_fim, url, tempo) VALUE "${nome}", "${tipo}", "${status}", "${data_inicio}", "${data_fim}", "${url}", "${tempo}"`
        const [linhas] = await conexao.execute(sql_cadastro)
        console.log([linhas])
        conexao.release()
        res.json(linhas[0])
 
    } catch(error){
        console.log(`O Erro que ocorreu foi:${error}`)
        res.send(500).json({error:"Deu algum erro na busca"})
    }
 
})


// Rota Mostrar - Beatriz  =)
app.get("/midia/mostrar", async (req, res) => {
    try {

        const conexao = await pool.getConnection()
        const arquivos_sql = `SELECT * FROM midia` 
        const [linhas] = await conexao.execute(sql)
        conexao.release()
        res.json(linhas[0])

    } catch  (error) {
        console.log(`O Erro que ocorreu foi: ${error}`)
        res.status(500).json({error: "Deu algum erro na conexão"})


    }
})

// Rota DELETE - Pedro
app.delete("/midia/midia/:id",async (req, res) => {
    try{
        const id_passado = req.params.id
        const conexao = await pool.getConnection()
        const sql = `DELETE FROM midia WHERE id=${id_passado}`
        const [linhas] = await conexao.execute(sql)
        console.log([linhas])
        conexao.release()
        res.json(linhas[0])
    }catch(error){
        console.log(`O Erro que ocorreu foi ${error}`)
        res.send(500).json({error:"Deu algum erro no delete"})
    }
 })
 
 // Rota Listar/Select - Pedro
 app.get("/midia/midia/:id",async (req, res) => {
    try{
        const id_passado = req.params.id
        const conexao = await pool.getConnection()
        const sql = `SELECT * FROM midia LIKE "%${nome}%"`
        const [linhas] = await conexao.execute(sql)
        console.log([linhas])
        conexao.release()
        res.json(linhas[0])
    }catch(error){
        console.log(`O Erro que ocorreu foi ${error}`)
        res.send(500).json({error:"Deu algum erro no delete"})
    }
 })



//ROTA PARA O UPDATE/EDITAR
app.put("/midia/edit/", async(req,res)=>{
    try{
        const {id, nome, tipo, status, data_inicio, data_fim, url, tempo}=req.body

        const conexao= await pool.getConnection()
        const sql = `UPDATE midia SET nome="${nome}", tipo="${tipo}", status="${status}", data_inicio="${data_inicio}", data_fim="${data_fim}", url="${url}", tempo="${tempo} WHERE  id=${id}`
        const [linhas] = await conexao.execute(sql)
        console.log([linhas])
        conexao.release()
        res.json(linhas[0])
    } catch(error){
        console.log(`O Erro que ocorreu foi:${error}`)
        res.send(500).json({error:"Deu algum erro na atualização"})
    }
})