
const colunasKanba = document.querySelector(".colunas");
const colunas = colunasKanba.querySelectorAll(".coluna");

//let tarefaAtual = null;
const handleBlur = (event) => {
  const input = event.target;
  const content = input.innerText.trim() || "Untitled";
  const tarefa = criarTarefa(content.replace(/\n/g, "<br>"));
  input.replaceWith(tarefa);
};
const handleAdd = (event) => {
  const tarefaElemento = event.target.closest(".coluna").lastElementChild;
  const input = criarTarefaInput();
  tarefaElemento.appendChild(input);
  input.focus();
};
const criarTarefa = (content) => {
  const tarefa = document.createElement("div");
  tarefa.className = "tarefa";
  tarefa.draggable = true;
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
const criarTarefaInput = (text = "") => {
  const input = document.createElement("div");
  input.className = "tarefa-input";
  input.dataset.placeholder = "tarefa";
  input.contentEditable = true;
  input.innerText = text;
  input.addEventListener("blur", handleBlur);
  return input;
};

colunasKanba.addEventListener("click", (event) => {
  if (event.target.closest("button[data-add]")) {
    handleAdd(event);
  } else if (event.target.closest("button[data-edit]")) {
    handleEdit(event);
  } else if (event.target.closest("button[data-delete]")) {
    handleDelete(event);
  }
});