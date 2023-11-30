const express = require("express")

const cors = require("cors")

const mysql = require("mysql2/promise")
const app = express()

app.use(express.json())
app.use(cors())

const porta = 3307

app.listen(porta, ()=> {
    console.log(`Servidor rodeando em http://localhost:${porta}`)
})

// criar pool de conexão
const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'midia_indoor',
    waitForConnections:true,
    connectionLimit: 3,
    queueLimit:0
})

// rota Cadastrar - Yasmin Izaura
app.post('/midia/cadastrar', async (req,res)=>{
    try{
        const {nome, tipo, status, data_inicio, data_fim, url, tempo} = req.body
        const conexao= await pool.getConnection()
        const sql_cadastro = `INSERT INTO midia (nome, tipo, status, data_inicio, data_fim, url, tempo) VALUE ("${nome}", "${tipo}", "${status}", "${data_inicio}", "${data_fim}", "${url}", "${tempo}")`
        console.log(sql_cadastro)
        const [linhas] = await conexao.execute(sql_cadastro)
        console.log([linhas])
        conexao.release()
        res.json(linhas[0])
 
    } catch(error){
        console.log(`O Erro que ocorreu foi:${error}`)
        res.send(500).json({error:"Deu algum erro na busca"})
    }
 
})
//ROTA EDITAR PELO ID
app.get('/midia/edit/id/:id', async (req, res) => {
    try {
        const id = req.params.id
        const conexao = await pool.getConnection();
        const sql = `SELECT * FROM midia WHERE id = ${id}`;
        const [linhas] = await conexao.execute(sql);
        conexao.release()
        res.json(linhas[0])
 
    } catch(error){
        console.log(`O Erro que ocorreu foi:${error}`)
        res.send(500).json({error:"Deu algum erro"})
    }
    }
 );
// Rota Mostrar - Beatriz  =)
app.get("/midia/mostrar", async (req, res) => {
    try {

        const conexao = await pool.getConnection()
        const sql = `SELECT * FROM midia` 
        const [linhas] = await conexao.execute(sql)
        conexao.release()
        res.json(linhas)

    } catch  (error) {
        console.log(`O Erro que ocorreu foi: ${error}`)
        res.status(500).json({error: "Deu algum erro na conexão"})


    }
})



// Rota DELETE - Pedro
app.delete('/midia/remover/:id', async (req, res) => {
   try {
       const { id } = req.params;
       const conexao = await pool.getConnection();
       const sql = `DELETE FROM midia WHERE id = ${id}`;
       const [linhas] = await conexao.execute(sql);
       conexao.release();
       if(linhas.affectedRows > 0){
           res.json({message: 'Deletado com sucesso!'});
       } else {
           res.json({message: `Não foi possível deletar o registro com id=${id}`});
       }
   } catch (error) {
       console.log(`O Erro que ocorreu foi: ${error}`);
       res.status(500).json({error: "Deu algum erro na exclusão"});
   }
});

 
 // Rota Listar/Select - Pedro
app.get("/midia/mostrar", async (req, res) => {
   try {
       const conexao = await pool.getConnection()
       const sql = `SELECT * FROM midia` 
       const [linhas] = await conexao.execute(sql)
       conexao.release()
       res.json(linhas)
   } catch (error) {
       console.log(`O Erro que ocorreu foi: ${error}`)
       res.status(500).json({error: "Deu algum erro na conexão"})
   }
})




//ROTA PARA O UPDATE/EDITAR
app.put("/midia/edit/", async(req,res)=>{
    try{
        const {id, nome, tipo, status, data_inicio, data_fim, url, tempo}=req.body

        const conexao= await pool.getConnection()
        const sql = `UPDATE midia SET nome="${nome}", tipo="${tipo}", status="${status}", data_inicio="${data_inicio}", data_fim="${data_fim}", url="${url}", tempo="${tempo}" WHERE  id=${id}`
        const [linhas] = await conexao.execute(sql)
        console.log([linhas])
        conexao.release()
        res.json(linhas[0])
    } catch(error){
        console.log(`O Erro que ocorreu foi:${error}`)
        res.send(500).json({error:"Deu algum erro na atualização"})
    }
})

// rota nome yasmin izaura 
app.get("/midia/nome/:nome",async (req, res) => {
    try{
        const nome = req.params.nome
        const conexao = await pool.getConnection()
        const sql = `SELECT * FROM midia where nome like '%${nome}%'`
        const [linhas] = await conexao.execute(sql)
        console.log([linhas])
        conexao.release()
        res.json(linhas)
    }catch(error){
        console.log(`O Erro que ocorreu foi ${error}`)
        res.send(500).json({error:"Deu algum erro no delete"})
    }
 })
