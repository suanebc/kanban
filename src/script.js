
const a = document.getElementById("year");
a.innerText = new Date().getFullYear();
const colunas = document.querySelector(".colunas");
const coluna = colunas.querySelectorAll(".coluna");

const handleBlur = (event) => {
  const zona = event.target;
  const conteudo = zona.innerText.trim() || 'Vazio';
  const tarefa = criarTarefa(conteudo.replace(/\n/g, "<br>"));
  zona.replaceWith(tarefa);
}
// ADICIONAR TAREFA NA COLUNA
const adicionarTarefa = (event) => {
  const elementoTarefa = event.target.closest('.coluna').lastElementChild;
  const zona = criarZonaTarefa();
  elementoTarefa.appendChild(zona);
  zona.focus();
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
const criarZonaTarefa = (text = '') => {
  const zona = document.createElement("section");
  zona.className = "tarefa-zona";
  zona.dataset.placeholder = "Nome da Tarefa";
  zona.contentEditable = true;
  zona.innerText = text;
  zona.addEventListener('blur', handleBlur);
  return zona;
}
// EVENTOS 
colunas.addEventListener('click', (event) => {
  if(event.target.closest('button[data-add]')){
    adicionarTarefa(event);// eventono botão +
  }
})