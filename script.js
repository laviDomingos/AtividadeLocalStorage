//Criando o usuario
const usuario = {
    nome: "Lavínia",
    idade: 18,
    cidade: "Jaraguá do Sul"
}

//Salvando e recuperando os dados - 1
localStorage.setItem("usuario", JSON.stringify(usuario));

const dadosUsuario = JSON.parse(localStorage.getItem("usuario"));
console.log(dadosUsuario.nome); 

//Verificação de nome
localStorage.setItem("nomeUsuario", usuario.nome);

let nome = localStorage.getItem("nomeUsuario");
    if(nome) {
        document.getElementById("mensagem").innerText = `Bem-vindo de volta, ${dadosUsuario.nome}!`;
    } else {
    document.body.innerHTML = "<h1>Não foi possível encontrar o nome.</h1>";
    }

//---------------------------------------------------------

//Lista de tarefas - 2
//Carregando tarefas salvas
function carregarTarefasSalvas() {
    const dados = JSON.parse(localStorage.getItem('tarefasZonas'));
    if (!dados) return;

    Object.keys(dados).forEach(zonaId => {
        const zona = document.getElementById(zonaId);
        dados[zonaId].forEach(itemId => {
            const el = document.getElementById(itemId);
            if (el && zona) {
                zona.appendChild(el);
            }
        });
    });

    console.log("Tarefas carregadas no LocalStorage")
}

//Salvando tarefas
function salvarTarefas() {
    const zonas = document.querySelectorAll('.zone');
    const dados = {};

    zonas.forEach(zona => {
        const zonaId = zona.id;
        const tarefas = Array.from(zona.querySelectorAll('.draggable')).map(tarefa => tarefa.id);
        dados[zonaId] = tarefas;
    });
    localStorage.setItem('tarefasZonas', JSON.stringify(dados));
}

//Permitindo somente que as funções rodem após o HTML ser carregado
document.addEventListener('DOMContentLoaded', () => {
    carregarTarefasSalvas();

const draggables = document.querySelectorAll('.draggable');
const zones = document.querySelectorAll(".zone");

//Áreas do elemento
draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', draggable.id);
    draggable.classList.add('dragging');
    console.log('[dragstart] - Início do arrasto');
    });

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
        console.log('[dragend] - Fim do Arrasto');
    });

    draggable.classList.remove('over');
        console.log('[drop] - Elemento solto');
});

//Mapeando zonas 
zones.forEach((zone) => {
    zone.addEventListener('dragenter', (event) => {
        zone.classList.add('over');
        console.log('[dragenter] - Elemento entrou na área');
    });

    zone.addEventListener('dragover', (event) => {
        event.preventDefault();
        console.log(['dragover - Elemento está sobre: ', zone.id]);
    });
    
    zone.addEventListener('dragleave', () => {
        zone.classList.remove('over');
        console.log('[dragleave] - Saiu da área de Drop');
    });
    
    zone.addEventListener('drop', (event) => {
        const draggedId = event.dataTransfer.getData('text/plain');
        const draggedEl = document.getElementById(draggedId);
        zone.appendChild(draggedEl);
        zone.classList.remove('over');
        console.log('[drop] - Elemento Solto');

        salvarTarefas();
    });
    });
});

//---------------------------------------------------------
//Contador de visitas - 3

function atualizarContador() {
    let visitas = localStorage.getItem('contadorVisitas');

    if(visitas == null) {
        visitas = 1;
        console.log(`Contador não funcionando.`)
    } else {
        visitas = parseInt(visitas, 10) + 1; 
        console.log(`Contador funcionando.`);
    }

    //Armazenando no localstorage as visitas
    localStorage.setItem('contadorVisitas', visitas);

    document.getElementById('contador').textContent = `Você visitou esta página ${visitas} ${visitas > 1 ? 'vezes' : 'vez'}.`;
}

atualizarContador();

//---------------------------------------------------------
//Escolha de tema - 4

function alterarTema(tema) {
    document.body.className = tema;
    localStorage.setItem("tema", tema);
}

const temaSalvo = localStorage.getItem("tema");
    if(temaSalvo) {
        document.body.className = temaSalvo;
    }

document.querySelector("#claro").addEventListener("click", () => alterarTema("claro"));
document.querySelector("#escuro").addEventListener("click", () => alterarTema("escuro"));
