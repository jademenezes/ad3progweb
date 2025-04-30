const buttonPilha = document.getElementById('botaoPilha');
const buttonFila = document.getElementById('botaoFila');
const botaoDireito = document.getElementById('botao-direito');
const botaoEsquerdo = document.getElementById('botao-esquerdo');
const botaoLimpar = document.getElementById('botao-limpar');
const tabelaPilha = document.getElementById('tabelaPilha');
const tabelaFila = document.getElementById('tabelaFila');

let filaInicio = 0;
let filaFim = 0;
let filaTamanho = 5;

let pilhaInicio = 1;
let pilhaFim = 1;
let pilhaTamanho = 5;

function adicionarPilha(item) {
  if (pilhaFim > pilhaTamanho) {
    alert('Pilha overflow!');
    return;
  }

  const rows = tabelaPilha.rows[pilhaFim];

  if (!item) {
    const texto = document.getElementById('texto').value;
    if (texto == '') {
      return;
    }

    rows.cells[0].textContent = document.getElementById('texto').value;
    pilhaFim++;

    document.getElementById('texto').value = '';
    return;
  }

  rows.cells[0].textContent = item;
  pilhaFim++;

  document.getElementById('texto').value = '';
}

function adicionarFila(item) {
  if (filaFim >= filaTamanho) {
    alert('Fila overflow!');
    return;
  }

  const cells = tabelaFila.rows[1].cells;

  if (!item) {
    const texto = document.getElementById('texto').value;
    if (texto === '') {
      return;
    }

    cells[filaFim].textContent = texto;
    console.log(filaFim);

    filaFim++;

    document.getElementById('texto').value = '';
    return;
  }

  cells[filaFim].textContent = item;
  filaFim++;

  document.getElementById('texto').value = '';
}

function removerPilha() {
  if (pilhaFim === pilhaInicio) {
    alert('Pilha vazia!');
    return;
  }

  const row = tabelaPilha.rows[pilhaFim - 1];

  const item = row.cells[0].textContent;

  row.cells[0].textContent = '';
  pilhaFim--;

  return item;
}

function removerFila() {
  if (filaFim <= filaInicio) {
    alert('Fila vazia!');
    return;
  }

  const cells = tabelaFila.rows[1].cells;
  const item = cells[filaInicio].textContent;

  cells[filaInicio].textContent = '';
  filaInicio++;

  if (filaFim === filaInicio) {
    filaFim = 0;
    filaInicio = 0;
  }

  return item;
}

function moverItem(id) {
  if (id === 'botao-direito') {
    const item = removerPilha();

    adicionarFila(item);
  }

  if (id === 'botao-esquerdo') {
    const item = removerFila();

    adicionarPilha(item);
  }
}

function limpar() {
  let isFirstRow = true;
  for (let row of tabelaFila.rows) {
    if (isFirstRow) {
      isFirstRow = false;
      continue;
    }
    for (let cell of row.cells) {
      cell.textContent = '';
    }
  }

  isFirstRow = true;
  for (let row of tabelaPilha.rows) {
    if (isFirstRow) {
      isFirstRow = false;
      continue;
    }
    for (let cell of row.cells) {
      cell.textContent = '';
    }
  }

  filaInicio = 0;
  filaFim = 0;
  filaTamanho = 5;

  pilhaInicio = 1;
  pilhaFim = 1;
  pilhaTamanho = 5;
}

buttonPilha.addEventListener('click', () => adicionarPilha());
buttonFila.addEventListener('click', () => adicionarFila());
botaoDireito.addEventListener('click', () => moverItem(botaoDireito.id));
botaoEsquerdo.addEventListener('click', () => moverItem(botaoEsquerdo.id));
botaoLimpar.addEventListener('click', () => limpar());
