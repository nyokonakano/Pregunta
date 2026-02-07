const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
const heartLoader = document.querySelector(".cssload-main");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");
const gifContainer = document.getElementById("gif-container");

// Array de frases para el botón "No" - AÑADE TUS FRASES AQUÍ
const noButtonPhrases = [
  "Uy no",
  "Ahí nomás",
  "Piénsalo mejor",
  "¿Seguro?",
  "Dale otra oportunidad",
  "Mira el botón verde",
  "El Sí está creciendo...",
  "Ya casi no puedes escapar"
  // AÑADE MÁS FRASES AQUÍ
];

// Array de data-postid de Tenor - AÑADE TUS IDs AQUÍ
// Para obtener el ID: copia el número del data-postid="ESTE_NUMERO" del código embed de Tenor
/*const gifIds = "25789758" //[
  //"25789758" // GIF inicial
  // AÑADE MÁS data-postid AQUÍ
  // Ejemplo: "12345678901234567890"
//];
*/
let clickCount = 0;
let yesBtnScale = 1; // Escala inicial del botón Sí
/*
// Función para cambiar el GIF
function changeGif(gifId) {
  // Cambiar el data-postid
  gifContainer.setAttribute("data-postid", gifId);
  
  // Forzar la recarga del embed de Tenor
  // Eliminar el iframe actual si existe
  const iframe = gifContainer.querySelector('iframe');
  if (iframe) {
    iframe.remove();
  }
  
  // Recargar el script de Tenor para mostrar el nuevo GIF
  const script = document.querySelector('script[src*="tenor.com/embed.js"]');
  if (script) {
    script.remove();
    const newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.async = true;
    newScript.src = 'https://tenor.com/embed.js';
    document.body.appendChild(newScript);
  }
}*/

// Funcionalidad del botón "No"
noBtn.addEventListener("click", () => {
  clickCount++;
  
  // Cambiar el texto del botón "No"
  if (clickCount < noButtonPhrases.length) {
    noBtn.textContent = noButtonPhrases[clickCount];
  } else {
    // Si se acaban las frases, volver a empezar o mantener la última
    noBtn.textContent = noButtonPhrases[noButtonPhrases.length - 1];
  }
  
  // Hacer crecer el botón "Sí" (aumenta 30% cada vez)
  yesBtnScale += 0.3;
  yesBtn.style.transform = `scale(${yesBtnScale})`;
  yesBtn.style.zIndex = "1000"; // Asegurar que esté al frente
  
  // Cambiar el GIF
  const gifIndex = clickCount % gifIds.length;
  changeGif(gifIds[gifIndex]);
  
  // Opcional: Si el botón es muy grande, reducir opacidad del botón No
  if (yesBtnScale > 4) {
    noBtn.style.opacity = Math.max(0.3, 1 - (yesBtnScale - 4) * 0.2);
  }
});

// Funcionalidad del botón "Sí"
yesBtn.addEventListener("click", () => {
  questionContainer.style.display = "none";
  heartLoader.style.display = "inherit";

  setTimeout(() => {
    heartLoader.style.display = "none";
    resultContainer.style.display = "inherit";
    gifResult.play();
  }, 3000);
});
