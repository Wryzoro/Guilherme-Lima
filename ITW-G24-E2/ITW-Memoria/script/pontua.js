// script/pontuacoes.js
document.addEventListener('DOMContentLoaded', () => {
    const scoresTableBody = document.querySelector('#scoresTable tbody');
    const scores = JSON.parse(localStorage.getItem('scores')) || [];

    scores.forEach(score => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${score.date}</td>
            <td>${score.score}</td>
            <td>${score.time}s</td>
        `;
        scoresTableBody.appendChild(row);
    });
});


function startMainMenu() {
    window.location.href = 'MainMenu.html';
}