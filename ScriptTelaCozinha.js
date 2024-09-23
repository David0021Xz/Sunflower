const textBox = document.getElementById('rpgTextBox');
const textElement = document.getElementById('rpgText');
const continueButton = document.getElementById('continueButton');
const skipButton = document.getElementById('skipButton');
const dogImage = document.getElementById('dogImage');

let textArray = [
    "Hora do café da manhã! Precisamos de nutrientes para seguirmos nossa jornada porta afora!",
    "Um café da manhã nutritivo é muito importante para nossa saúde, ainda mais quando é preparado por quem mais amamos!",
    "Ligue cada comida até sua forma correspondente, confio em você!",
];
let textIndex = 0;
let charIndex = 0;
let typingSpeed = 50; // Velocidade inicial da digitação (em milissegundos)

// Função para digitar o texto automaticamente
function typeText() {
    if (charIndex < textArray[textIndex].length) {
        textElement.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeText, typingSpeed);
    }
}

// Inicializa a primeira linha de texto
typeText();

// Função para passar para o próximo texto
continueButton.addEventListener('click', () => {
    if (textIndex < textArray.length - 1) {
        textIndex++;
        charIndex = 0;
        textElement.textContent = '';
        typingSpeed = 50; // Restaura a velocidade de digitação
        typeText();
    } else {
        // Redireciona para outra tela após o último texto
        window.location.href = 'TelaCozinhaJogo.html'; // Substitua 'outra_pagina.html' pelo URL desejado
    }
});

// Função para acelerar a digitação
skipButton.addEventListener('click', () => {
    typingSpeed = 0; // Ajusta a velocidade para instantâneo
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
