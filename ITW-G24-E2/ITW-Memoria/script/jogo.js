document.addEventListener('DOMContentLoaded', () => {
    const cardsArray = ['😀', '😀', '😎', '😎', '😁', '😁', '😂', '😂', '😍', '😍', '😜', '😜', '😘', '😘', '🤩', '🤩'];
    let shuffledCards = [];
    const gameBoard = document.getElementById('gameBoard');
    let firstCard = null;
    let secondCard = null;
    let flippedCards = 0;
    let timerElement = document.getElementById('timer');
    let scoreElement = document.getElementById('score');
    let time = 0;
    let score = 0;
    let timer;
    const startButton = document.getElementById('startButton');
    const resetButton = document.getElementById('resetButton');
    const mainMenuButton = document.getElementById('mainMenuButton');

    // Função para iniciar o temporizador
    function startTimer() {
        timer = setInterval(() => {
            time++;
            timerElement.textContent = `Tempo: ${time}s`;
        }, 1000);
    }

    // Função para parar o temporizador
    function stopTimer() {
        clearInterval(timer);
    }

    // Função para resetar o jogo
    function resetGame() {
        stopTimer();
        time = 0;
        score = 0;
        scoreElement.textContent = 'Pontuação: 0';
        timerElement.textContent = 'Tempo: 0s';
        gameBoard.innerHTML = '';
        shuffledCards = cardsArray.sort(() => 0.5 - Math.random());
        shuffledCards.forEach(createCard);
        flippedCards = 0;
        firstCard = null;
        secondCard = null;
    }

    // Função para iniciar o jogo
    function startGame() {
        resetGame();
        startTimer();
    }

    // Função para criar um elemento de carta
    function createCard(emoji) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.emoji = emoji;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    }

    // Função para manipular a virada de cartas
    function flipCard() {
        if (this.classList.contains('flipped') || time === 0) return;

        this.innerHTML = '<span class="emoji">' + this.dataset.emoji + '</span>';
        this.classList.add('flipped');

        if (!firstCard) {
            firstCard = this;
        } else {
            secondCard = this;
            checkMatch();
        }
    }

    // Função para verificar se duas cartas coincidem
    function checkMatch() {
        if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
            flippedCards += 2;
            score += 10;
            scoreElement.textContent = `Pontuação: ${score}`;
            firstCard = null;
            secondCard = null;

            if (flippedCards === shuffledCards.length) {
                stopTimer();
                setTimeout(() => {
                    alert(`Parabéns! Você completou o jogo em ${time} segundos! Sua pontuação é ${score}.`);
                    saveScore(score, time);
                }, 500);
            }
        } else {
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                firstCard.innerHTML = '';
                secondCard.classList.remove('flipped');
                secondCard.innerHTML = '';
                firstCard = null;
                secondCard = null;
            }, 1000);
        }
    }

    // Função para salvar a pontuação no localStorage
    function saveScore(score, time) {
        const scores = JSON.parse(localStorage.getItem('scores')) || [];
        const newScore = { score, time, date: new Date().toLocaleDateString() };
        scores.push(newScore);
        localStorage.setItem('scores', JSON.stringify(scores));
    }

    // Adicionando ouvintes de eventos aos botões
    startButton.addEventListener('click', startGame);
    resetButton.addEventListener('click', resetGame);
    mainMenuButton.addEventListener('click', () => {
        window.location.href = 'MainMenu.html';
    });
});
