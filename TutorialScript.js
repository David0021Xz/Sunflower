const textBox = document.getElementById('rpgTextBox');
const textElement = document.getElementById('rpgText');
const continueButton = document.getElementById('continueButton');
const skipButton = document.getElementById('skipButton');
const dogImage = document.getElementById('dogImage');

let textArray = [
    "Clique em continuar!",
    "Oi, amiguinho! Eu sou o Rivo, o cachorrinho aventureiro, e vou estar com você em uma jornada cheia de descobertas e diversão!",
    "Este jogo foi criado com muito carinho pela nossa equipe da Sunflower especialmente para você.",
    "Vamos explorar juntos o mundo mágico das formas geométricas?",
    "O seu desafio é ligar as imagens às formas corretas, e assim, aprender brincando! Estou aqui para ajudar você a cada passo do caminho. Vamos lá?"
];

let audioFiles = [
    "audio1.mp3",  // Áudio correspondente ao primeiro texto
    "audio2.mp3",  // Áudio correspondente ao segundo texto
    "audio3.mp3",  // Áudio correspondente ao terceiro texto
    "audio4.mp3"   // Áudio correspondente ao quarto texto
];

let textIndex = 0;
let charIndex = 0;
let typingSpeed = 50; // Velocidade de digitação (em milissegundos)
let audio = new Audio();

// Função para iniciar a reprodução de áudio
function playAudio(index) {
    if (audio) {
        audio.pause();  // Interrompe o áudio anterior
        audio.currentTime = 0;  // Reseta o tempo do áudio
    }
    audio.src = audioFiles[index];  // Carrega o arquivo de áudio correspondente
    audio.play().catch((error) => {
        // Ocorre um erro se a reprodução for bloqueada
        console.log('Reprodução automática bloqueada, aguardando interação do usuário');
    });
}

// Função para digitar o texto automaticamente
function typeText() {
    if (charIndex < textArray[textIndex].length) {
        textElement.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeText, typingSpeed);
    }
}

// Inicializa o texto e o áudio quando a página carrega
window.addEventListener('load', () => {
    textElement.textContent = ''; // Limpa o conteúdo da caixa de texto ao carregar
    typeText(); // Inicia a digitação do texto
    playAudio(textIndex); // Inicia o áudio correspondente ao texto
});

// Função para passar para o próximo texto e áudio
continueButton.addEventListener('click', () => {
    if (audio) {
        audio.pause(); // Interrompe o áudio atual
    }
    if (textIndex < textArray.length - 1) {
        textIndex++;
        charIndex = 0;
        textElement.textContent = ''; // Limpa o texto anterior
        typingSpeed = 50; // Restaura a velocidade de digitação
        typeText();
        playAudio(textIndex); // Reproduz o próximo áudio
    } else {
        // Redireciona para outra tela após o último texto
        window.location.href = 'PrimeiraTela.html';
    }
});

// Função para acelerar a digitação
skipButton.addEventListener('click', () => {
    typingSpeed = 0; // Ajusta a velocidade para instantâneo
    if (audio) {
        audio.pause(); // Interrompe o áudio atual
    }
});

// Função para mover a caixa de texto
let isDraggingTextBox = false;
let offsetXTextBox, offsetYTextBox;

textBox.addEventListener('mousedown', (e) => {
    isDraggingTextBox = true;
    offsetXTextBox = e.clientX - textBox.offsetLeft;
    offsetYTextBox = e.clientY - textBox.offsetTop;
});

document.addEventListener('mousemove', (e) => {
    if (isDraggingTextBox) {
        textBox.style.left = `${e.clientX - offsetXTextBox}px`;
        textBox.style.top = `${e.clientY - offsetYTextBox}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDraggingTextBox = false;
});

// Função para mover a imagem do cachorro
let isDraggingDogImage = false;
let offsetXDogImage, offsetYDogImage;

dogImage.addEventListener('mousedown', (e) => {
    isDraggingDogImage = true;
    offsetXDogImage = e.clientX - dogImage.offsetLeft;
    offsetYDogImage = e.clientY - dogImage.offsetTop;
});

document.addEventListener('mousemove', (e) => {
    if (isDraggingDogImage) {
        dogImage.style.left = `${e.clientX - offsetXDogImage}px`;
        dogImage.style.top = `${e.clientY - offsetYDogImage}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDraggingDogImage = false;
});

// Função que força a reprodução de áudio após interação
document.addEventListener('click', () => {
    if (audio.paused) {
        playAudio(textIndex);  // Reproduz o áudio assim que o usuário interage
    }
});
