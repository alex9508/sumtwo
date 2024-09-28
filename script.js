document.addEventListener('DOMContentLoaded', (event) => {
    generateSum();
});

let questionCount = 0;
let correctCount = 0;
let incorrectCount = 0;

function generateSum() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    document.getElementById('sum').textContent = `${num1} + ${num2} = ?`;
    document.getElementById('sum').dataset.answer = num1 + num2;

    // Mostrar emojis
    document.getElementById('emojis').innerHTML = `
        <p>${'🌻'.repeat(num1)}</p>
        <p>${'🦋'.repeat(num2)}</p>
    `;
}

function checkAnswer() {
    const answerInput = document.getElementById('answer');
    const userAnswer = answerInput.value.trim();
    const feedback = document.getElementById('feedback');

    if (userAnswer === '') {
        feedback.textContent = 'Por favor, ingresa una respuesta.';
        feedback.style.color = 'orange';
        return;
    }

    const correctAnswer = parseInt(document.getElementById('sum').dataset.answer);

    if (parseInt(userAnswer) === correctAnswer) {
        feedback.textContent = '¡Correcto!';
        feedback.style.color = 'green';
        correctCount++;
    } else {
        feedback.textContent = 'Incorrecto, intenta de nuevo.';
        feedback.style.color = 'red';
        incorrectCount++;
        showPopup(correctAnswer);
    }

    questionCount++;
    if (questionCount >= 5) {
        showResults();
    } else {
        generateSum();
    }

    answerInput.value = '';
}

function showPopup(correctAnswer) {
    document.getElementById('correct-answer').textContent = correctAnswer;
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function showResults() {
    const resultsPopup = document.createElement('div');
    resultsPopup.className = 'popup';
    resultsPopup.style.display = 'block';

    const resultMessage = correctCount >= incorrectCount ? 
        `<p style="color: green;">¡Ganaste el juego!</p>` : 
        `<p style="color: red;">Perdiste el juego.</p>`;

    resultsPopup.innerHTML = `
        <div class="popup-content">
            <span class="close" onclick="closeResultsPopup()">&times;</span>
            <p>Resultados:</p>
            <p>Aciertos: ${correctCount}</p>
            <p>Errores: ${incorrectCount}</p>
            ${resultMessage}
        </div>
    `;
    document.body.appendChild(resultsPopup);
}

function resetGame() {
    questionCount = 0;
    correctCount = 0;
    incorrectCount = 0;
}

// Añadir un contenedor para los emojis en el HTML
document.addEventListener('DOMContentLoaded', (event) => {
    const container = document.querySelector('.container');
    const emojisDiv = document.createElement('div');
    emojisDiv.id = 'emojis';
    container.insertBefore(emojisDiv, document.getElementById('answer'));
});
function closeResultsPopup() {
    const resultsPopup = document.querySelector('.popup');
    resultsPopup.remove();
    location.reload(); // Refrescar la página después de cerrar el pop-up
}

function resetGame() {
    questionCount = 0;
    correctCount = 0;
    incorrectCount = 0;
}