let c = document.getElementById('inColunas');
let filhoC = document.querySelectorAll(".coluna");
//console.log(filhoC)
//const coluna = colunas.querySelectorAll(".coluna");
/*
const tituloTarefas = document.querySelectorAll("h3");
tituloTarefas.forEach(titulo =>{
  console.log(parseInt(titulo.dataset.tarefas))
})
*/
const updateTaskCount = () => {
  const tarefas = filhoC.querySelector(".tarefas").children;
  const taskCount = tarefas.length;
  
  console.log(tarefas.querySelector(".coluna-titlo h3").dataset.tarefas = taskCount);
  
};

const observeTaskChanges = () => {
  for (const coluna of colunas) {
    const observer = new MutationObserver(() => updateTaskCount(coluna));
    observer.observe(coluna.querySelector(".tarefas"), { childList: true });
  }
};


observeTaskChanges();