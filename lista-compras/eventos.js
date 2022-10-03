const API_URL = 'http://localhost:8000'

function marcarTodos(){
    let todos = document.querySelectorAll('[data-check="acao"]');

    todos.forEach((cadaCheck) => {
        cadaCheck.checked = true;
    });
}

async function excluir (id){
    let resposta = confirm('você tem certeza?');

    if (resposta !== true) {
        return;
    }
    



    await fetch(API_URL+'/compras/'+id, {
        method: 'DELETE'
        

    });
    


    atualizarLista();

}

function atualizarLista(){

    tabela_compras.innerHTML = '';
    fetch(API_URL+'/compras')
    

    .then(function(resposta){
        return resposta.json();
    })
    .then(function(lista){
        lista.forEach(function(cadaItem){
            tabela_compras.innerHTML +=`
            <tr>
                <td> <input data-check="acao" type="checkbox"></td>
                <td>${cadaItem.id}</td>
                <td>${cadaItem.item}</td>
                <td>${cadaItem.quantidade}</td>
                <td>
                    <button onclick="buscarParaEditar(${cadaItem.id})" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEditar" class="btn btn-warning"> Editar </button>
                    
                    <button onclick="excluir(${cadaItem.id})" class="btn btn-danger">Excluir</button>
                    
                </td>
                
            </tr> 
            `;
        });     
    })
    

}

atualizarLista();

function inserir(){
    event.preventDefault();
    let dados = {
        item: input_item.value,
        quantidade: parseInt(input_quantidade.value),
    };

    fetch(API_URL+'/compras', {
        method: 'POST',
        body: JSON.stringify(dados),
        headers:{
            'Content-Type': 'application/json'
        }
    })
      .then(resposta => resposta.json())
      .then(resposta => atualizarLista());
    
    form_add.reset();
    

}

function buscarParaEditar(id){
    fetch(API_URL+'/compras/'+id)
        .then(res => res.json())
        .then(item => {
            input_editar_id.value = id;
            input_editar_item.value = item.item;
            input_editar_quantidade.value = item.quantidade;
           
        });
}

function editar(id){
    event.preventDefault();

    let dados = {
        item: input_editar_item.value,
        quantidade: input_editar_quantidade.value,

    };

    fetch(API_URL+'/compras/'+input_editar_id.value,{
        method: 'PATCH',
        body: JSON.stringify(dados),
        headers: {
            'Content-Type': 'application/json'
        }
    
    })    
     .then(res => res.json())
     .then(() => atualizarLista());

    let x = document.querySelector('[data-bs-dismiss="offcanvas"]')
    x.dispatchEvent(new Event('click'));

}
