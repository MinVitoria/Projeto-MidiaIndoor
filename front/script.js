const btn_cad_tela = document.getElementById("btn_cad");
const btn_ed = document.getElementById("btn_ed");
const btn_rem = document.getElementById("btn_rem");
const btn_ini = document.getElementById("btn_ini");
const btn_mos = document.getElementById("btn_mos");
const btn_bus = document.getElementById("btn_bus");
const btn_add = document.getElementById("btn_add");
const btn_at = document.getElementById("btn_at");
const btn_para_busca = document.getElementById("btn_para_busca")
// const btn_log = document.getElementById("btn_login");
// const btn_log = document.getElementById("login_aqui");
btn_ini.addEventListener("click", iniciar)

btn_cad_tela.addEventListener("click", cadastrar)

btn_ed.addEventListener("click", editar)

btn_bus.addEventListener("click", buscar)



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
    body: JSON.stringify({id: id_atual, nome: nome_atual, tipo: tipo_atual, url: url_atual, tempo: tempo_atual, status: status_atual, data_inicio: d_i_atual, data_fim: d_f_atual }),
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
  if (resultado.ok) {
    let dados = await fetch(`http://localhost:3307/midia/remover/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: stringify.json({ id: id })
    });

    if (dados.ok) {
      btn_bus.click()
      btn_para_busca.click()
    }
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

// mostrar e sumir ou outros
async function mostrar() {

  sumir("ola");
  sumir("imagem");
  sumir("cadastrar");
  sumir("editar");
  sumir("listar");
  aparecer("mostrar");

  let html=""
  html +=
    `<div id="carouselExampleCaptions" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="..." class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>`


  let resposta = await fetch(`http://localhost:3307/midia/midia/:id`)
  if (resposta.ok) {

    document.getElementById("nv_nome").value = dados.nome
    document.getElementById("nv_url").value = dados.url
    document.getElementById("nv_tempo").value = dados.tempo
    document.getElementById("nv_data_i").value = dados.data_inicio
    document.getElementById("nv_data_f").value = dados.data_fim
    document.getElementById("nv_status").value = dados.status

  }
}

btn_para_busca.addEventListener("click", async () => {
  let input_buscar = document.getElementById("input_buscar").value;
  let opcao = document.getElementById("opcoes").value;
  let html=""
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
      <td><i onclick="editar_info(${dados.id})" class="bi bi-pencil"></td>
      <td><i onclick="remover(${dados.id})" class="bi bi-trash"></i></td>
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

async function login() {


//login.addEventListener("click", async () => {
//aparecer("login");

// })

}

