window.addEventListener("load", async () => {
  let html = ""
  let resposta = await fetch(`http://localhost:3307/midia/mostrar`)
  if (resposta.ok) {
    // let dados = await fetch (resposta.json())
    // console.log(dados)
    // let url = document.getElementById("url").value
    //  let tempo = document.getElementById("tempo").value
    //  let data_inicio = document.getElementById("data_i").value
    // let data_fim = document.getElementById("data_f").value
    // let status = document.getElementById("status").value
 
    document.getElementById("saida_mostrar").innerHTML = "";
 
    let array_resultado = await resposta.json();
 
    for (const dados of array_resultado) {
      if (dados.status == "A") {
 
        html += `
<div class="slide carousel-item active" data-bs-interval="${dados.tempo}">
<img src="${dados.url}" class="imagens">
</div>
</div>`
      }
 
    }
 
  }
 
  document.getElementById("saida_mostrar").innerHTML = html;
}
)