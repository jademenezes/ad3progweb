const buttonPilha = document.getElementById('botaoPilha');
const buttonFila = document.getElementById('botaoFila');
const botaoDireita = document.getElementById('botao-direito');
const botaoEsquerda = document.getElementById('botao-esquerdo');
const tabelaPilha = document.getElementById('tabelaPilha');
const tabelaFila = document.getElementById('tabelaFila');

let filaInicio = 0;
let filaFim = 0;
let filaTamanho = 5;

let pilhaInicio = 1;
let pilhaFim = 1;
let pilhaTamanho = 6;

function adicionarPilha(item) {
  if (pilhaFim === pilhaTamanho) {
    alert('Pilha overflow!');
    return;
  }

  const rows = tabelaPilha.rows[pilhaFim];

  if (!item) {
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
  if (filaFim === filaTamanho) {
    alert('Fila overflow!');
    return;
  }

  const cells = tabelaFila.rows[1].cells;

  if (!item) {
    cells[filaFim].textContent = document.getElementById('texto').value;
    filaFim++;

    console.log(filaFim);

    document.getElementById('texto').value = '';
    return;
  }

  cells[filaFim].textContent = item;
  filaFim++;
  console.log(filaFim);

  document.getElementById('texto').value = '';
}

buttonPilha.addEventListener('click', () => adicionarPilha());
buttonFila.addEventListener('click', () => adicionarFila());
botaoDireita.addEventListener('click', () => moverItem(botaoDireita.className));
botaoEsquerda.addEventListener('click', () =>
  moverItem(botaoEsquerda.className)
);

// function adicionarItem(tipo, item) {
//   var table;

//   if (tipo == 'pilha') {
//     table = document.getElementById('tabelaPilha');
//   } else if (tipo == 'fila') {
//     table = document.getElementById('tabelaFila');
//   } else {
//     alert('erro');
//     return;
//   }

//   for (let row of table.rows) {
//     for (let cell of row.cells) {
//       if (!cell.textContent.trim()) {
//         if (!item) {
//           cell.textContent = document.getElementById('texto').value;
//           return;
//         }
//         cell.textContent = item;
//         return;
//       }
//     }
//   }
// }

// function removerItemFila() {
//   table = document.getElementById('tabelaFila');
//   var item;

//   for (let row of table.rows) {
//     for (let cell of row.cells) {
//       if (cell.textContent.trim() != '' && cell.textContent.trim() != 'Fila') {
//         item = cell.textContent;
//         cell.textContent = '';
//         return item;
//       }
//     }
//   }
// }

// function removerItemPilha() {
//   table = document.getElementById('tabelaPilha');
//   var item;

//   for (let row of table.rows) {
//     for (let cell of row.cells) {
//       if (cell.textContent.trim() != '') {
//         item = cell.textContent;
//       }
//     }
//   }

//   for (let row of table.rows) {
//     for (let cell of row.cells) {
//       if (cell.textContent.trim() == item) {
//         cell.textContent = '';
//       }
//     }
//   }

//   return item;
// }

// function moverItem(tipo) {
//   if (tipo == 'seta-direita') {
//     const item = removerItemPilha();

//     adicionarItem('fila', item);
//   } else if (tipo == 'seta-esquerda') {
//     const item = removerItemFila();

//     adicionarItem('pilha', item);
//   } else {
//     alert('erro ao mover item');
//     return;
//   }
// }
