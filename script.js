document.addEventListener("DOMContentLoaded", function() {
    const tilesContainer = document.querySelector(".tiles");
    const tiles = Array.from(document.querySelectorAll(".tile"));
    const droppables = document.querySelectorAll(".droppable");
    let draggedTile = null;

    // Shuffle tiles array
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Clear and append shuffled tiles
    function renderShuffledTiles() {
        const shuffledTiles = shuffle(tiles);
        shuffledTiles.forEach(tile => tilesContainer.appendChild(tile));
    }

    renderShuffledTiles(); // Render tiles in random order

    tiles.forEach(tile => {
        tile.addEventListener("dragstart", function() {
            draggedTile = tile;
            setTimeout(() => {
                tile.style.display = "none"; // Hide the tile during dragging
            }, 0);
        });

        tile.addEventListener("dragend", function() {
            setTimeout(() => {
                draggedTile.style.display = "block"; // Show the tile after dragging
                draggedTile = null;
            }, 0);
        });
    });

    droppables.forEach(drop => {
        drop.addEventListener("dragover", function(e) {
            e.preventDefault();
            drop.classList.add("over");
        });

        drop.addEventListener("dragleave", function() {
            drop.classList.remove("over");
        });

        drop.addEventListener("drop", function(e) {
            e.preventDefault();
            drop.classList.remove("over");

            if (!drop.innerHTML) { // Only drop if the span is empty
                drop.appendChild(draggedTile);
            }
        });
    });

    document.getElementById("submit").addEventListener("click", function() {
        droppables.forEach(drop => {
            const answer = drop.getAttribute("data-answer");
            const value = drop.querySelector(
