
const colunasKanban = document.querySelector(".colunas");
const colunas = colunasKanban.querySelectorAll(".coluna");
const modalDeletar = document.querySelectorAll("#confirma-modal");

let tarefaAtual = null;

// FUNÇÕES ----------------------------------------------

const handleDragover = (event) => {
  event.preventDefault(); 

  const draggedTarefa = document.querySelector(".dragging");
  const target = event.target.closest(".tarefa, .tarefas");

  if (!target || target === draggedTarefa) return;

  if (target.classList.contains("tarefas")) {
    // target is the tasks element
    const lastTarefa = target.lastElementChild;
    if (!lastTarefa) {
      // tasks is empty
      target.appendChild(draggedTarefa);
    } else {
      const { bottom } = lastTarefa.getBoundingClientRect();
      event.clientY > bottom && target.appendChild(draggedTarefa);
    }
  } else {
    // target is another
    const { top, height } = target.getBoundingClientRect();
    const distance = top + height / 2;

    if (event.clientY < distance) {
      target.before(draggedTask);
    } else {
      target.after(draggedTask);
    }
  }
};

const handleDrop = (event) => {
  event.preventDefault();
};

const handleDragend = (event) => {
  event.target.classList.remove("dragging");
};

const handleDragstart = (event) => {
  event.dataTransfer.effectsAllowed = "move";
  event.dataTransfer.setData("text/plain", "");
  requestAnimationFrame(() => event.target.classList.add("dragging"));
};

const deletarTarefa = (event) => {
  tarefaAtual = event.target.closest(".tarefa");//encontrar o ancestral mais próximo que corresponda a um seletor CSS específico
  modalDeletar.querySelector(".preview").innerText = tarefaAtual.innerText.substring(0, 100);
  modalDeletar.showModal();

}

const editarTarefa = (event) => {
  const tarefa = event.target.closest(".tarefa");
  const input = criarTarefaInput(tarefa.innerText);
  tarefa.replaceWith(input);
  input.focus();

  // mover cursos
  const selecionar = window.getSelection();
  selecionar.selectAllChildren(input)
  selecionar.collapseToEnd();

}
const handleBlur = (event) => {
  const input = event.target;
  const content = input.innerText.trim() || "Untitled";
  const tarefa = criarTarefa(content.replace(/\n/g, "<br>"));
  input.replaceWith(tarefa);
};
// FUNÇÃO ADD TAREFA
const addTarefa = (event) => {
  const tarefaElemento = event.target.closest(".coluna").lastElementChild;
  const input = criarTarefaInput();
  tarefaElemento.appendChild(input);
  input.focus();
};

// FUNÇÃO ATUALIZAR CONTADOR DE TAREFA
const atualizarContador = (column) => {
  const tarefas = column.querySelector(".tarefas").children;
  const contadorTarefa = tarefa.length;
  column.querySelector(".coluna-titulo h3").dataset.tarefa = contadorTarefa
}
const observaTarefas = () =>{
  for(const coluna of colunas){
    const observar = new MutationObserver(() => atualizarContador(coluna));
    observar.observe(coluna.querySelector(".tarefas"), {childList: true});

  }
};

observaTarefas();

// FUNÇÃO PARA CRIAR TAREFA
const criarTarefa = (content) => {
  const tarefa = document.createElement("div"); // cia o elemento div
  tarefa.className = "tarefa"; // cria classe tarefa
  tarefa.draggable = true; // atributo para arrastar 
  tarefa.innerHTML = `
  <div>${content}</div>
  <menu>
      <button data-edit><i class="bi bi-pencil-square"></i></button>
      <button data-delete><i class="bi bi-trash"></i></button>
  </menu>`;
  tarefa.addEventListener("dragstart", handleDragstart);
  tarefa.addEventListener("dragend", handleDragend);
  return tarefa;
};
// FUNÇÃO PARA CRIAR INPUT
const criarTarefaInput = (text = "") => {
  const input = document.createElement("div");
  input.className = "tarefa-input";
  input.dataset.placeholder = "Nome da Tarefa";
  input.contentEditable = true;
  input.innerText = text;
  input.addEventListener("blur", handleBlur);
  return input;
};
// FUNÇÃO PARA CLICK NO BOTÃO +
colunasKanban.addEventListener("click", (event) => {
  if (event.target.closest("button[data-add]")) {
    addTarefa(event);
  } else if (event.target.closest("button[data-edit]")) {
    handleEdit(event);
  } else if (event.target.closest("button[data-delete]")) {
    handleDelete(event);
  }
});

modalDeletar.addEventListener('submit', () => tarefaAtual && tarefaAtual.remove());
modalDeletar.querySelector("#inCancela").addEventListener("click", () => modalDeletar.close());

modalDeletar.addEventListener("close", () => (tarefaAtual = null))