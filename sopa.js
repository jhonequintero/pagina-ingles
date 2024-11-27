/* script para sopa de letras */

const sopaLetrasContainer = document.getElementById('sopa-letras');
const palabrasLista = document.querySelectorAll('.palabras li');
const enviarSopaBtn = document.getElementById('enviar-sopa');
const resultadoDiv = document.getElementById('resultado');

// Palabras que se buscarán en la sopa
const palabras = ["GROUND", "WATER", "NOURISH", "HEAT", "AIR", "BAN", "HUNT", "CUT", "OVERUSE", "REFOREST",  "GROW", "ADAPT", "CHAIN", "FEED"];

// Configuración de la sopa de letras
const sopa = [
  ['G', 'R', 'O', 'U', 'N', 'D', 'G', 'R', 'O', 'W'],
  ['R', 'I', 'A', 'H', 'R', 'X', 'O', 'J', 'E', 'N'],
  ['Z', 'L', 'T', 'E', 'R', 'W', 'A', 'T', 'E', 'R'],
  ['M', 'U', 'O', 'A', 'X', 'F', 'E', 'E', 'D', 'U'],
  ['C', 'R', 'S', 'T', 'R', 'E', 'F', 'O', 'R', 'E'],
  ['T', 'H', 'W', 'A', 'T', 'E', 'R', 'X', 'N', 'T'],
  ['O', 'V', 'E', 'R', 'U', 'S', 'E', 'B', 'I', 'N'],
  ['Y', 'T', 'V', 'T', 'P', 'A', 'D', 'A', 'A', 'U'],
  ['R', 'E', 'F', 'O', 'R', 'E', 'S', 'T', 'H', 'H'],
  ['H', 'S', 'I', 'R', 'U', 'O', 'N', 'D', 'C', 'F'],
];


// Crear la cuadrícula de la sopa de letras
function crearSopaLetras() {
  sopa.forEach((fila, i) => {
    fila.forEach((letra, j) => {
      const div = document.createElement('div');
      div.textContent = letra;
      div.dataset.row = i;
      div.dataset.col = j;
      div.addEventListener('click', seleccionarLetra);
      sopaLetrasContainer.appendChild(div);
    });
  });
}

let seleccionActual = [];

// Función para manejar la selección de letras
function seleccionarLetra(event) {
  const letraSeleccionada = event.target;
  letraSeleccionada.classList.toggle('seleccionado');

  const row = parseInt(letraSeleccionada.dataset.row);
  const col = parseInt(letraSeleccionada.dataset.col);
  const letra = letraSeleccionada.textContent;

  // Verificar si la letra ya fue seleccionada
  const index = seleccionActual.findIndex(item => item.row === row && item.col === col);

  if (index === -1) {
    // Si no está seleccionada, añadirla a la lista de selección
    seleccionActual.push({ row, col, letra });
  } else {
    // Si ya está seleccionada, eliminarla de la lista de selección
    seleccionActual.splice(index, 1);
  }
}

// Verificar las palabras seleccionadas al enviar la sopa
function verificarPalabras() {
  let palabrasEncontradas = 0;

  // Convertir la selección actual en una cadena de letras ordenada
  const seleccionOrdenada = seleccionActual
    .sort((a, b) => (a.row - b.row) || (a.col - b.col))
    .map(item => item.letra)
    .join('');

  // Comparar la selección con cada palabra en la lista
  palabras.forEach(palabra => {
    if (seleccionOrdenada.includes(palabra)) {
      palabrasEncontradas++;
    }
  });

  resultadoDiv.textContent = `Has encontrado ${palabrasEncontradas} de ${palabras.length} palabras.`;
}

// Evento para el botón de enviar
enviarSopaBtn.addEventListener('click', verificarPalabras);

// Inicializar la sopa de letras
crearSopaLetras();
