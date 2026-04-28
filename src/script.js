
const a = document.getElementById("year");
a.innerText = new Date().getFullYear();
const colunas = document.querySelector(".colunas");
const coluna = colunas.querySelectorAll(".coluna");

const editarTarefa = (event) =>{
  const tarefa = event.target.closest('tarefa');
  const paragrafo = criarParagrafoTarefa(tarefa.innerText);
  tarefa.replaceWith(paragrafo);
  paragrafo.focus();

  // mover o cursosr para o final do texto
  const selecao = window.getSelection();
  selecao.selectAllChildren(paragrafo);
  selecao.collapseToEnd();
}

const handleBlur = (event) => {
  const paragrafo = event.target;
  const conteudo = paragrafo.innerText.trim() || 'Vazio';
  const tarefa = criarTarefa(conteudo.replace(/\n/g, "<br>"));
  paragrafo.replaceWith(tarefa);
}
// ADICIONAR TAREFA NA COLUNA
const adicionarTarefa = (event) => {
  const elementoTarefa = event.target.closest('.coluna').lastElementChild;
  const paragrafo = criarParagrafoTarefa();
  elementoTarefa.appendChild(paragrafo);
  paragrafo.focus();
}


// CRIAR TAREFA
const criarTarefa = (content) => {
  const tarefa = document.createElement("section");
  tarefa.className = "tarefa";
  tarefa.draggable = true;
  tarefa.innerHTML = `
  <section>${content}</section>
  <menu>
      <button data-edit><i class="bi bi-pencil-square"></i></button>
      <button data-delete><i class="bi bi-trash"></i></button>
  </menu>`;
  //tarefa.addEventListener("dragstart", handleDragstart);
  //tarefa.addEventListener("dragend", handleDragend);
  return tarefa;
};
//CRIA ELEMENTO PARA ENTRADA DA TAREFA
const criarParagrafoTarefa = (text = '') => {
  const paragrafo = document.createElement("p");
  paragrafo.className = "tarefa-paragrafo";
  paragrafo.dataset.placeholder = "Digite sua tarefa";
  paragrafo.contentEditable = true;
  paragrafo.innerText = text;
  paragrafo.addEventListener('blur', handleBlur);
  return paragrafo;
}
// EVENTOS 
colunas.addEventListener('click', (event) => {
  if(event.target.closest('button[data-add]')){
    adicionarTarefa(event);// 
  } else if (event.target.closest('button[data-edit]')){
    editarTarefa(event);
  }
});