// let professores = [
//   {
//     codigo: 1,
//     nome: 'Joice',
//     email: 'joice...@...com',
//     sala: '2A',
//     turno: 'Manhã',
//     disciplinas: [
//       'Programação Orientada a Objetos',
//       'Banco de Dados Geográficos',
//     ],
//   },
//   {
//     codigo: 2,
//     nome: 'Rafael',
//     email: 'rafael...@...com',
//     sala: '1C',
//     turno: 'Tarde',
//     disciplinas: ['Algoritmos e Lógica de Programação', 'Programação Web'],
//   },
// ];

let currentProfIndex = null;
let currentDisciplinas = [];
let professores = [];

// abrir janela modal
function openModal(modalId) {
  document.getElementById(modalId).style.display = 'block';
}

// fechar janela modal
function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

// Gera um código para cada professor
function gerarCodigo() {
  const min = 0;
  const max = 99;
  return Math.floor(min + Math.random() * (max - min + 1));
}

// Renderizar lista de professores
function renderProfessores() {
  const tbody = document.querySelector('#profTable tbody');
  tbody.innerHTML = '';

  fetch('http://localhost:3000/professores')
    .then((response) => response.json())
    .then((dados) => {
      professores = dados.professores;
      // Log lista recebida da resposta do servidor
      console.log(professores);

      professores.forEach((professor, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
              <td>${professor.nome}</td>
              <td>${professor.email}</td>
              <td>${professor.sala}</td>
              <td>${professor.turno}</td>
              <td>${professor.disciplinas}</td>
              <td>
              <button onclick="editProf(${index})">Editar</button>
              <button onclick="deleteProf(${index})">Excluir</button>
              </td>
              `;
        tbody.appendChild(row);
      });
    });
}
// Adiciona uma disciplina na lista
function addDisciplina() {
  const disciplinaInput = document.getElementById('disciplinaProf');
  const disciplina = disciplinaInput.value.trim();
  if (disciplina) currentDisciplinas.push(disciplina);
  console.log(currentDisciplinas);
  disciplinaInput.value = '';

  renderDisciplinas();
}

// Renderiza a lista de disciplinas
function renderDisciplinas() {
  const list = document.getElementById('disciplinasList');
  list.innerHTML = '';
  currentDisciplinas.forEach((disciplina) => {
    const li = document.createElement('li');
    li.innerHTML = disciplina;
    list.appendChild(li);
  });
}

// Edita informações professor
function editProf(index) {
  //   console.log('Inicio editProf()');
  const prof = professores[index];
  currentProfIndex = index;
  document.getElementById('nomeProfessor').value = prof.nome;
  document.getElementById('email').value = prof.email;
  document.getElementById('sala').value = prof.sala;
  document.getElementById('turnoProf').value = prof.turno;
  document.getElementById('disciplinaProf').value = '';
  currentDisciplinas = prof.disciplinas;
  renderDisciplinas();
  openModal('profModal');
}

// Deleta professor da lista
function deleteProf(index) {
  if (confirm('Tem certeza que deseja excluir este(a) professor(a)?'))
    professores.splice(index, 1);
  renderProfessores();
}

// Adiciona professor à lista
function addProf(nome, email, sala, turno, disciplinas) {
  // professores.push({ codigo, nome, email, sala, turno, disciplinas });

  // cria um codigo aleatorio para o professor
  const codigo = gerarCodigo();
  console.log('código = ' + codigo);

  let professor = { codigo, nome, email, sala, turno, disciplinas };
  console.log(professor);

  fetch('http://localhost:3000/professores', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(professor),
  })
    .then((response) => response.json())
    .then((dados) => {
      console.log(dados);
      renderProfessores();
    });
}

// chama função openModal() limpando os campos
const btAddProf = document.getElementById('addProf');
btAddProf.addEventListener('click', function () {
  currentProfIndex = null;
  currentDisciplinas = [];
  document.getElementById('profForm').reset();
  document.getElementById('codigo').value = '';
  const disciplinasList = document.getElementById('disciplinasList');
  disciplinasList.innerHTML = '';

  openModal('profModal');
});

// chama função addDisciplina;
const btnAddDisciplina = document.getElementById('addDisciplina');
btnAddDisciplina.addEventListener('click', () => {
  addDisciplina();
});

// Adiciona um professor à lista
const profForm = document.getElementById('profForm');
profForm.addEventListener('submit', (e) => {
  e.preventDefault();

  addDisciplina();

  const codigo = document.getElementById('codigo').value;
  const nome = document.getElementById('nomeProfessor').value;
  const email = document.getElementById('email').value;
  const sala = document.getElementById('sala').value;
  const turno = document.getElementById('turnoProf').value;
  const disciplinas = [...currentDisciplinas];

  // Inclusao ou alteraçao
  if (currentProfIndex !== null)
    professores[currentProfIndex] = {
      codigo,
      nome,
      email,
      sala,
      turno,
      disciplinas,
    };
  else addProf(nome, email, sala, turno, disciplinas);

  closeModal('profModal');
  // renderProfessores();
});

// chama função closeModal()
document.querySelectorAll('.close').forEach(function (closeBtn) {
  closeBtn.addEventListener('click', function () {
    closeModal('profModal');
  });
});

renderProfessores();
