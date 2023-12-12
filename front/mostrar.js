async function mostrar() {

    let html = ""
    
    let resposta = await fetch(`http://localhost:3307/midia/mostrar`)
    if (resposta.ok) {
  
      
      let url = document.getElementById("url").value
      let tempo = document.getElementById("tempo").value
      let data_inicio = document.getElementById("data_i").value
      let data_fim = document.getElementById("data_f").value
      let status = document.getElementById("status").value
  
      document.getElementById("saida_mostrar").innerHTML = "";
  
      let array_resultado = await resposta.json();
  
      for (const dados of array_resultado) {
      
      html +=`
       <div class="slide">
         <img src="${dados.url}">
       </div>
     </div>`
  
      }
    }
  
    document.getElementById("saida_mostrar").innerHTML = html;
  }
