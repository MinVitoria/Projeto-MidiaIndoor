const btn_cad_tela = document.getElementById("btn_cad");
const btn_ed = document.getElementById("btn_ed");
const btn_rem = document.getElementById("btn_rem");
const btn_mos = document.getElementById("btn_mos");
const btn_lis = document.getElementById("btn_lis");
const btn_add = document.getElementById("btn_add");


btn_cad_tela.addEventListener("click", cadastrar)

btn_ed.addEventListener("click", editar)

btn_lis.addEventListener("click", listar)

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
    let tipo = document.getElementById("tipo").value
    let url = document.getElementById("url").value
    let tempo = document.getElementById("tempo").value
    let data_inicio = document.getElementById("data_i").value
    let data_fim = document.getElementById("data_f").value
    let status = document.getElementById("status").value

    let dados = await fetch(`http://localhost:3307/midia/cadastrar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome: nome, tipo: tipo, url: url, tempo: tempo, status: status, data_inicio: data_inicio, data_fim: data_fim }),
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
    aparecer("editar");
    sumir("ola");
    sumir("imagem");
    sumir("cadastrar")

    let resposta = await fetch(`http://localhost:3307/midia/edit/${id}`)
    if(resposta.ok){//verificar se retornou status code 200-ok para a busca
      
    let dados = await resposta.json()

      console.clear()
      console.log(dados)
    //   btn_mos.click()
      document.getElementById("nv_nome").value = dados.nome
      document.getElementById("nv_tipo").value = dados.tipo
      document.getElementById("nv_url").value = dados.url
      document.getElementById("nv_tempo").value = dados.tempo
      document.getElementById("nv_data_i").value = dados.data_inicio
      document.getElementById("nv_data_f").value = dados.data_fim
      document.getElementById("nv_status").value = dados.status
  
    }
  }

async function listar() {
    aparecer("listar");
    sumir("ola");
    sumir("imagem");
    sumir("cadastrar")
    sumir("mostrar")

    let html = `<table class="table">
    <thead>
      <tr>    
        <th scope="col">ID</th>
        <th scope="col" class='text-start'>Nome</th>
        <th scope="col" class='text-start'>Status</th>
        <th scope="col">Editar</i></th>
        <th scope="col">Excluir</th>
      </tr>
    </thead>
    <tbody>`


    document.getElementById("saida_listar").innerHTML = html

let resposta = await fetch("http://localhost:3307/midia/midia/:id");

if (resposta.ok) {
    
    let res= await resposta.json();

    for (let element of res){
        html +=
        `<tr>                
         <td>${element.id}</td>
        <td class='text-start'>${element.nome}</td>
         <td class='text-start'>${element.status}</td>
        <td><i onclick="editar_info(${element.id})" class="bi bi-pencil"></td>
         <td><i onclick="excluir(${element.id})" class="bi bi-trash"></i></td>
         </tr>`
    }

}
 html=html
}

// mostrar e sumir ou outros
async function mostrar() {
    
    sumir("ola");
    sumir("imagem");
    sumir("cadastrar");
    sumir("editar");
    sumir("listar")
    aparecer("mostrar")
    
    
    let resposta = await fetch(`http://localhost:3307/midia/midia/:id`)
    if (resposta.ok){

      document.getElementById("nv_nome").value = dados.nome
      document.getElementById("nv_url").value = dados.url
      document.getElementById("nv_tempo").value = dados.tempo
      document.getElementById("nv_data_i").value = dados.data_inicio
      document.getElementById("nv_data_f").value = dados.data_fim
      document.getElementById("nv_status").value = dados.status

      let html = 

      `<div id="carouselExample" class="carousel slide">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <video src="${url}" class="d-block w-100" alt="Carrossel 1">
        </div>
        <div class="carousel-item">
          <video src="${url}" class="d-block w-100" alt="Carrossel 2">
        </div>
        <div class="carousel-item">
          <video src="${url}" class="d-block w-100" alt="Carrossel 3">
        </div>
      </div>`

    } else if {
        

    }
 }

    //   <div class="alert alert-primary" role="alert">${tempo}</div>
    //   <div class="alert alert-primary" role="alert">${data_inicio}</div>
    //   <div class="alert alert-primary" role="alert">${data_fim}</div>
    //   <div class="alert alert-primary" role="alert">${status}</div>
      
    //   acima as informações restantes
//     } 

// }