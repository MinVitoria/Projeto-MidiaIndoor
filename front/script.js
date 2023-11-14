const btn_cad_tela = document.getElementById("btn_cad");
const btn_ed = document.getElementById("btn_ed");
const btn_rem = document.getElementById("btn_rem");
const btn_mos = document.getElementById("btn_mos");
const btn_lis = document.getElementById("btn_lis");
const btn_add = document.getElementById("btn_add");


btn_cad_tela.addEventListener("click", cadastrar)

btn_ed.addEventListener("click", editar)

// Evento ao clicar em mostrar
btn_mos.addEventListener("click", mostrar)


function aparecer(id) {
    document.getElementById(id).classList.remove("d-none");
}
function sumir(id) {
    document.getElementById(id).classList.add("d-none");
}

function cadastrar() {
    aparecer("cadastrar");
    sumir("ola");
    sumir("imagem");
    sumir("editar");

}

btn_add.addEventListener("click", async () => {

    let nome = document.getElementById("nome").value
    let url = document.getElementById("url").value
    let tempo = document.getElementById("tempo").value
    let data_inicio = document.getElementById("data_inicio").value
    let data_fim = document.getElementById("data_fim").value
    let status = document.getElementById("status").value

    let dados = await fetch("http://localhost:3306/midia/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome: nome, url: url, tempo: tempo, status: status, data_inicio: data_inicio, data_fim: data_fim }),
    });

    if (dados.ok) {
        btn_cad.click()

    }
})
function remover() {

}
function editar() {
    aparecer("editar");
    sumir("ola");
    sumir("imagem");
    sumir("cadastrar");

}

async function editar_info(id){
    let resposta = await fetch(`http://localhost:3306/midia/edit/${id}`)
    if(resposta.ok){//verificar se retornou status code 200-ok para a busca
      let dados = await resposta.json()
      console.clear()
      console.log(dados)
      btn_mos.click()
      document.getElementById("nv_nome").value= dados.nome
      document.getElementById("nv_url").value= dados.url
      document.getElementById("nv_tempo").value= dados.tempo
      document.getElementById("nv_data_i").value= dados.data_inicio
      document.getElementById("nv_data_f").value= dados.data_fim
      document.getElementById("nv_status").value= dados.status
  
    }
  }

function listar() {

}

// mostrar e sumir ou outros
function mostrar() {
    sumir("ola");
    sumir("imagem");
    sumir("cadastrar");
    sumir("editar");
    varredura()

}

function varredura(){
    for (let _carrossel of dados) {

        // atribuindo valores no html 
        html += `<div class="carousel-item">
        <video src=${dados.url}>
        <div class="carousel-caption d-none d-md-block">
          <h5>${dados.nome}</h5>
        </div>
      </div>

      <br>

      <div class="alert alert-primary" role="alert">${dados.tempo}</div>
      <div class="alert alert-primary" role="alert">${dados.data_inicio}</div>
      <div class="alert alert-primary" role="alert">${dados.data_fim}</div>
      <div class="alert alert-primary" role="alert">${dados.status}</div>
      `
    //   acima as informações restantes
    }

}