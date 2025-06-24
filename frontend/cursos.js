// // array de cursos
// let cursos = [
//   { codigo: 1, nomeCurso: 'TSI', semestres: 5, coordenador: 'Joice' },
//   { codigo: 2, nomeCurso: 'BSI', semestres: 8, coordenador: 'Aujor' },
// ];

// variavel para o id atual
let currentCursoIndex = null;
let cursos = [];

// abrir janela modal
function openModal(modalId) {
  document.getElementById(modalId).style.display = 'block';
}

// fechar janela modal
function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

// chama função openModal()
const btAddCurso = document.getElementById('addCurso');
btAddCurso.addEventListener('click', function () {
  currentCursoIndex = null;
  document.getElementById('cursoForm').reset();
  openModal('cursoModal');
});

// chama função closeModal()
document.querySelectorAll('.close').forEach(function (closeBtn) {
  closeBtn.addEventListener('click', function () {
    closeModal('cursoModal');
  });
});

// carregar os cursos como linhas de tabela
function renderCursos() {
  const tbody = document.querySelector('#cursosTable tbody');
  tbody.innerHTML = '';

  fetch('http://localhost:3000/cursos')
    .then((response) => response.json())
    .then((cursos) => {
      // cursos = data.cursos;
      // Log lista recebida da resposta do servidor
      console.log(cursos);

      cursos.forEach((curso, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${curso.nome}</td>
        <td>${curso.sigla}</td>
        <td>${curso.descricao}</td>
        <td>${curso.cordenador}</td>
        <td>
              <button onclick="editCurso(${index})">Editar</button>
              <button onclick="deleteCurso(${index})">Excluir</button>
        </td>
        `;
        tbody.appendChild(row);
      });
    });
}

function editCurso(index) {
  //   console.log('Inicio editCurso()');
  const curso = cursos[index];
  currentCursoIndex = index;
  document.getElementById('codigo').value = curso.codigo;
  document.getElementById('nomeCurso').value = curso.nomeCurso;
  document.getElementById('semestres').value = curso.semestres;
  document.getElementById('coordenador').value = curso.coordenador;
  //   console.log(curso);
  openModal('cursoModal');
}

function deleteCurso(index) {
  if (confirm('Tem certeza que deseja excluir este curso?'))
    cursos.splice(index, 1);
  renderCursos();
}

function addCurso(nome, sigla, descricao, coordenador) {
  let curso = { nome, sigla, descricao, coordenador };
  console.log(professor);

  fetch('http://localhost:3000/cursos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(curso),
  })
    .then((response) => response.json())
    .then((dados) => {
      console.log(dados);
      renderCursos();
    });
}

const cursoForm = document.getElementById('cursoForm');
cursoForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const id = document.getElementById('id').value;
  const nome = document.getElementById('nome').value;
  const sigla = document.getElementById('sigla').value;
  const descricao = document.getElementById('descricao').value;
  const coordenador = document.getElementById('coordenador').value;

  // Inclusao ou alteraçao
  if (currentCursoIndex !== null)
    cursos[currentCursoIndex] = { codigo, nome, sigla, descricao, coordenador };
  else addCurso(nome, sigla, descricao, coordenador);

  closeModal('cursoModal');
  renderCursos();
});

renderCursos();
