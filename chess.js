 // script.js
document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('chessboard');
    const squares = 64;
    const pieces = [
        'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R',
        'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
        'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'
    ];

    const pieceImages = {
        'R': 'Wrook.png',
        'N': 'Wknight.png',
        'B': 'Wbishop.png',
        'Q': 'Wqueen.png',
        'K': 'Wking.png',
        'P': 'Wpawn.png',
        'r': 'Brook.png',
        'n': 'Bknight.png',
        'b': 'Bbishop.png',
        'q': 'Bqueen.png',
        'k': 'Bking.png',
        'p': 'Bpawn.png'
    };

    // Create the chessboard squares
    for (let i = 0; i < squares; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.dataset.index = i;
        board.appendChild(square);
    }

    // Initial setup of pieces
    for (let i = 0; i < squares; i++) {
        if (pieces[i]) {
            const img = document.createElement('img');
            img.src = pieceImages[pieces[i]];
            board.children[i].appendChild(img);
        }
    }

    // Add event listeners to handle piece movement
    let selectedSquare = null;

    board.addEventListener('click', (e) => {
        const targetSquare = e.target.closest('.square');

        if (targetSquare) {
            if (selectedSquare) {
                movePiece(selectedSquare, targetSquare);
                clearHighlights();
                selectedSquare = null;
            } else {
                selectedSquare = targetSquare;
                highlightSquare(selectedSquare);
            }
         }
    });

    function movePiece(fromSquare, toSquare) {
        if (!toSquare.firstChild && fromSquare.firstChild) { // Simplified move validation
            toSquare.appendChild(fromSquare.firstChild);
            highlightMove(toSquare);
        }
    }

    function highlightSquare(square) {
        square.classList.add('highlight');
    }

    function highlightMove(square) {
        square.classList.add('move');
        setTimeout(() => {
            square.classList.remove('move');
        }, 500);
    }

    function clearHighlights() {
        document.querySelectorAll('.square').forEach(square => {
            square.classList.remove('highlight');
        });
    }

    // Add drag-and-drop functionality
    board.addEventListener('dragstart', (e) => {
        if (e.target.tagName === 'IMG') {
            e.dataTransfer.setData('text', e.target.parentNode.dataset.index);
        }
    });

    board.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    board.addEventListener('drop', (e) => {
        const fromIndex = e.dataTransfer.getData('text');
        const fromSquare = board.children[fromIndex];
        const toSquare = e.target.closest('.square');

        if (toSquare && !toSquare.firstChild && fromSquare.firstChild) {
            movePiece(fromSquare, toSquare);
            clearHighlights();
        }
    });
});
