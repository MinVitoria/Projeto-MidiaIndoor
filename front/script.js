const btn_cad_tela = document.getElementById("btn_cad");
const btn_ed = document.getElementById("btn_ed");
const btn_rem = document.getElementById("btn_rem");
const btn_mos = document.getElementById("btn_mos");
const btn_bus = document.getElementById("btn_bus");
const btn_add = document.getElementById("btn_add");


btn_cad_tela.addEventListener("click", cadastrar)

btn_ed.addEventListener("click", editar)

btn_bus.addEventListener("click", buscar)

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
        btn_cad_tela.click()

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

async function buscar() {
    aparecer("buscar");
    sumir("ola");
    sumir("imagem");
    sumir("cadastrar")
    sumir("mostrar")

//     let html = `<table class="table">
//     <thead>
//       <tr>    
//         <th scope="col">ID</th>
//         <th scope="col" class='text-start'>Nome</th>
//         <th scope="col" class='text-start'>Status</th>
//         <th scope="col">Editar</i></th>
//         <th scope="col">Excluir</th>
//       </tr>
//     </thead>
//     <tbody>`


//     document.getElementById("saida_buscar").innerHTML

// let resposta = await fetch("http://localhost:3307/midia/midia/:id");

// if (resposta.ok) {
    
//     let res= await resposta.json();

//     for (let element of res){
//         html +=
//         `<tr>                
//          <td>${element.id}</td>
//         <td class='text-start'>${element.nome}</td>
//          <td class='text-start'>${element.status}</td>
//         <td><i onclick="editar_info(${element.id})" class="bi bi-pencil"></td>
//          <td><i onclick="excluir(${element.id})" class="bi bi-trash"></i></td>
//          </tr>`
//     }

// }
//  html=html
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

    }
 }

 btn_para_buscar.addEventListener("click", async () => {
  let input_buscar = document.getElementById("input_buscar").value;
  let opcao = document.getElementById("opcoes").value;
  let html = `<table class="table">
                <thead>
                  <tr>    
                    <th scope="col">ID</th>
                    <th scope="col" class='text-start'>Nome</th>
                    <th scope="col" class='text-start'>Status</th>
                    <th scope="col" class='text-start'>Editar</th>
                    <th scope="col" class='text-start'>Remover</th>
                  </tr>
                </thead>
                <tbody>`;
  
  document.getElementById("saida_buscar").innerHTML = "";
  document.getElementById("input_buscar").value = ""

  let resposta = "";
  if (opcao == "todos") {
    resposta = await fetch(`http://localhost:3307/midia/mostrar`);
  } else if (opcao == "id") {
    resposta = await fetch(`http://localhost:3307/midia/id/${input_buscar}`);
  } else if (opcao == "nome") {
    resposta = await fetch(`http://localhost:3307/midia/nome/${input_buscar}`);
  }

//  

if (resposta.ok) {
  html = html;
  let array_resultado = await resposta.json();
  if (opcao == "todos" || opcao == "nome") {
    for (const dados of array_resultado) {
      html += `<tr>                
      <td>${dados.id}</td>
      <td class='text-start'>${dados.nome}</td>
      <td class='text-start'>${dados.status}</td>
      <td><i onclick="editar(${dados.id})" class="bi bi-pencil"></td>
      <td><i onclick="excluir(${dados.id})" class="bi bi-trash"></i></td>
      </tr>`;
    }
  } else if (opcao == "id") {
    html += `<tr>                
      <td>${array_resultado.id}</td>
      <td class='text-start'>${array_resultado.nome}</td>
      <td class='text-start'>${array_resultado.status}</td>
      <td><i onclick="editar(${array_resultado.id})" class="bi bi-pencil"></i></td>
      <td><i onclick="excluir(${array_resultado.id})"class="bi bi-trash"></i></td>
      </tr>`;
  }

  html += `</tbody></table>`;
}
document.getElementById("saida_buscar").innerHTML = html;

});

async function editar(id){
  
}

