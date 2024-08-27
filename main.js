//Kothapalle Harshavardhan
const socket = new WebSocket('ws://localhost:8765');
socket.addEventListener('open', function (event) {
    socket.send(JSON.stringify({
        type: 'initialize',
        player_a_positions: ['P1', 'H1', 'P2', 'H2', 'P3'],
        player_b_positions: ['P1', 'H1', 'P2', 'H2', 'P3']
    }));
});
socket.addEventListener('message', function (event) {
    const data = JSON.parse(event.data);
    if (data.type === 'game_state') {
        renderBoard(data.state);
    } else if (data.type === 'invalid_move') {
        alert("Invalid move. Please try again.");
    } else if (data.type === 'game_over') {
        alert(`Game over! Winner: ${data.winner}`);
    }
});
function renderBoard(state) {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = state[i][j];
            boardElement.appendChild(cell);
        }
    }
}
