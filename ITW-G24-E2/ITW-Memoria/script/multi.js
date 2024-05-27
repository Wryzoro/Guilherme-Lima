document.addEventListener('DOMContentLoaded', () => {
    const cardsArray = ['😀', '😀', '😎', '😎', '😁', '😁', '😂', '😂', '😍', '😍', '😜', '😜', '😘', '😘', '🤩', '🤩'];
    let shuffledCards1 = [];
    let shuffledCards2 = [];
    const gameBoard1 = document.getElementById('gameBoard1');
    const gameBoard2 = document.getElementById('gameBoard2');
    let firstCard = null;
    let secondCard = null;
    let flippedCards1 = 0;
    let flippedCards2 = 0;
    let timer1Element = document.getElementById('timer1');
    let score1Element = document.getElementById('score1');
    let timer2Element = document.getElementById('timer2');
    let score2Element = document.getElementById('score2');
    let time1 = 0;
    let time2 = 0;
    let score1 = 0;
    let score2 = 0;
    let timer1, timer2;
    const startButton = document.getElementById('startButton');
    const resetButton = document.getElementById('resetButton');
    const mainMenuButton = document.getElementById('mainMenuButton');
    let currentPlayer = 1;

    // Função para iniciar o temporizador
    function startTimer(player) {
        if (player === 1) {
            timer1 = setInterval(() => {
                time1++;
                timer1Element.textContent = `Tempo: ${time1}s`;
            }, 1000);
        } else {
            timer2 = setInterval(() => {
                time2++;
                timer2Element.textContent = `Tempo: ${time2}s`;
            }, 1000);
        }
    }

    // Função para parar o temporizador
    function stopTimer(player) {
        if (player === 1) {
            clearInterval(timer1);
        } else {
            clearInterval(timer2);
        }
    }

    // Função para resetar o jogo
    function resetGame() {
        stopTimer(1);
        stopTimer(2);
        time1 = 0;
        time2 = 0;
        score1 = 0;
        score2 = 0;
        score1Element.textContent = 'Pontuação: 0';
        score2Element.textContent = 'Pontuação: 0';
        timer1Element.textContent = 'Tempo: 0s';
        timer2Element.textContent = 'Tempo: 0s';
        gameBoard1.innerHTML = '';
        gameBoard2.innerHTML = '';
        shuffledCards1 = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());
        shuffledCards2 = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());
        shuffledCards1.forEach(emoji => createCard(emoji, gameBoard1, 1));
        shuffledCards2.forEach(emoji => createCard(emoji, gameBoard2, 2));
        flippedCards1 = 0;
        flippedCards2 = 0;
        firstCard = null;
        secondCard = null;
        currentPlayer = 1;
        startTimer(1);
    }

    // Função para iniciar o jogo
    function startGame() {
        resetGame();
    }

    // Função para criar um elemento de carta
    function createCard(emoji, gameBoard, player) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.emoji = emoji;
        card.dataset.player = player;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    }

    // Função para manipular a virada de cartas
    function flipCard() {
        if (this.classList.contains('flipped') || parseInt(this.dataset.player) !== currentPlayer) return;

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
            if (currentPlayer === 1) {
                flippedCards1 += 2;
                score1 += 10;
                score1Element.textContent = `Pontuação: ${score1}`;
                firstCard = null;
                secondCard = null;

                if (flippedCards1 === shuffledCards1.length) {
                    stopTimer(1);
                    setTimeout(() => {
                        alert(`Jogador 1 completou o jogo em ${time1} segundos! Pontuação: ${score1}.`);
                    }, 500);
                }
            } else {
                flippedCards2 += 2;
                score2 += 10;
                score2Element.textContent = `Pontuação: ${score2}`;
                firstCard = null;
                secondCard = null;

                if (flippedCards2 === shuffledCards2.length) {
                    stopTimer(2);
                    setTimeout(() => {
                        alert(`Jogador 2 completou o jogo em ${time2} segundos! Pontuação: ${score2}.`);
                    }, 500);
                }
            }
        } else {
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                firstCard.innerHTML = '';
                secondCard.classList.remove('flipped');
                secondCard.innerHTML = '';
                firstCard = null;
                secondCard = null;
                switchPlayer();
            }, 1000);
        }
    }

    // Função para alternar o jogador atual
    function switchPlayer() {
        if (currentPlayer === 1) {
            stopTimer(1);
            startTimer(2);
            currentPlayer = 2;
        } else {
            stopTimer(2);
            startTimer(1);
            currentPlayer = 1;
        }
    }

    // Adicionando ouvintes de eventos aos botões
    startButton.addEventListener('click', startGame);
    resetButton.addEventListener('click', resetGame);
    mainMenuButton.addEventListener('click', () => {
        window.location.href = 'Modosdejogo.html';
    });
});
