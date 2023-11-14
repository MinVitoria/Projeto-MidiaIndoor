document.getElementById("btn_cad").addEventListener("click",cadastrar)

document.getElementById("btn_ed").addEventListener("click",editar)


function aparecer(id){
     document.getElementById(id).classList.remove("d-none");
}
function sumir(id){
    document.getElementById(id).classList.add("d-none");
}

function cadastrar(){
    aparecer("cadastrar");
    sumir("ola");
    sumir("imagem");

}
function remover(){

}
function editar(){
    aparecer("editar")
    sumir("ola");
    sumir("imagem");
    sumir("cadastrar");
    
}

// Mostrar
function mostrar(){ 

}



function listar(){

}