const btn_cad_tela = document.getElementById("btn_cad");
const btn_ed = document.getElementById("btn_ed");
const btn_rem = document.getElementById("btn_rem");
const btn_ini = document.getElementById("btn_ini");
const btn_mos = document.getElementById("btn_mos");
const btn_bus = document.getElementById("btn_bus");
const btn_add = document.getElementById("btn_add");
const btn_at = document.getElementById("btn_at");
const btn_para_busca = document.getElementById("btn_para_busca")
const btn_log = document.getElementById("btn_login");


btn_ini.addEventListener("click", iniciar)

btn_cad_tela.addEventListener("click", cadastrar)

btn_ed.addEventListener("click", editar)

btn_bus.addEventListener("click", buscar)


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
})


// Evento ao clicar em mostrar
btn_mos.addEventListener("click", mostrar)

function iniciar() {
  aparecer("ola");
  aparecer("imagem");
  sumir("cadastrar");
  sumir("buscar");
  sumir("editar")
}

btn_at.addEventListener("click", async () => {

  const nome_atual = document.getElementById("nv_nome").value
  const tipo_atual = document.getElementById("nv_tipo").value
  const url_atual = document.getElementById("nv_url").value
  const tempo_atual = document.getElementById("nv_tempo").value
  const d_i_atual = document.getElementById("nv_data_i").value
  const d_f_atual = document.getElementById("nv_data_f").value
  const status_atual = document.getElementById("nv_status").value
  const id_atual = document.getElementById("nv_id").value

  let dados = await fetch("http://localhost:3307/midia/edit/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id_atual, nome: nome_atual, tipo: tipo_atual, url: url_atual, tempo: tempo_atual, status: status_atual, data_inicio: d_i_atual, data_fim: d_f_atual }),
  });

  if (dados.ok) {
    btn_bus.click()
    btn_para_busca.click()
  }
})

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
  sumir("buscar")
  sumir("mostrar")

}


async function remover(id) {
  const resultado = window.confirm("Deseja excluir este usuário?");
  if (resultado) {
    let dados = await fetch(`http://localhost:3307/remover/id/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    btn_bus.click()
    btn_para_busca.click()
    location.reload(true)

  }
}


function editar() {
  aparecer("editar");
  sumir("ola");
  sumir("imagem");
  sumir("cadastrar");
  sumir("buscar")
  sumir("mostrar")

}

async function editar_info(id) {
  aparecer("editar");
  sumir("ola");
  sumir("imagem");
  sumir("cadastrar");
  sumir("buscar")
  sumir("mostrar")

  let resposta = await fetch(`http://localhost:3307/midia/edit/id/${id}`)
  if (resposta.ok) {//verificar se retornou status code 200-ok para a busca

    let dados = await resposta.json()
    console.log(dados)
    //   btn_mos.click()
    document.getElementById("nv_nome").value = dados.nome
    document.getElementById("nv_tipo").value = dados.tipo
    document.getElementById("nv_url").value = dados.url
    document.getElementById("nv_tempo").value = dados.tempo
    document.getElementById("nv_data_i").value = dados.data_inicio
    document.getElementById("nv_data_f").value = dados.data_fim
    document.getElementById("nv_status").value = dados.status
    document.getElementById("nv_id").value = dados.id

  }
}

function buscar() {
  aparecer("buscar");
  sumir("ola");
  sumir("imagem");
  sumir("cadastrar");
  sumir("mostrar");
  sumir("editar");

}


btn_para_busca.addEventListener("click", async () => {
  let input_buscar = document.getElementById("input_buscar").value;
  let opcao = document.getElementById("opcoes").value;
  let html = ""
  html += `<table class="table">
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
      <td><i onclick="editar_info(${dados.id})" class="bi bi-pencil"></i></td>
      <td><i onclick="remover(${dados.id})" class="bi bi-trash" id="lixo"></i></td>
      </tr>`;
      }
    } else if (opcao == "id") {
      html += `<tr>                
      <td>${array_resultado.id}</td>
      <td class='text-start'>${array_resultado.nome}</td>
      <td class='text-start'>${array_resultado.status}</td>
      <td><i onclick="editar_info(${array_resultado.id})" class="bi bi-pencil"></i></td>
      <td><i onclick="remover(${array_resultado.id})"class="bi bi-trash"></i></td>
      </tr>`;
    }

    html += `</tbody></table>`;
  }
  document.getElementById("saida_buscar").innerHTML = html;

});


async function mostrar() {

  sumir("ola");
  sumir("imagem");
  sumir("cadastrar");
  sumir("editar");
  sumir("listar");
  aparecer("mostrar");


  let resposta = await fetch(`http://localhost:3307/midia/midia/:id`)
  if (resposta.ok) {

    let nome = document.getElementById("nome").value
    let tipo = document.getElementById("tipo").value
    let url = document.getElementById("url").value
    let tempo = document.getElementById("tempo").value
    let data_inicio = document.getElementById("data_i").value
    let data_fim = document.getElementById("data_f").value
    let status = document.getElementById("status").value
    
    let array_resultado = await resposta.json();

    for(const dados of array_resultado){
    html += `
    <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="${dados.url}" class="d-block w-100">
      </div>
    </div>
  </div>`

  }
}
}
