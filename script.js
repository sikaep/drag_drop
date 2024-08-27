document.addEventListener("DOMContentLoaded", function() {
    const tiles = document.querySelectorAll(".tile");
    const droppables = document.querySelectorAll(".droppable");
    const tilesContainer = document.querySelector(".tiles");
    let draggedTile = null;

    tiles.forEach(tile => {
        tile.addEventListener("dragstart", function() {
            draggedTile = tile;
        });

        tile.addEventListener("dragend", function() {
            draggedTile = null;
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

            if (!drop.innerHTML) { // Only drop if the cell is empty
                drop.appendChild(draggedTile);
            }
        });
    });

    document.getElementById("submit").addEventListener("click", function() {
        droppables.forEach(drop => {
            const answer = drop.getAttribute("data-answer");
            const value = drop.querySelector(".tile")?.getAttribute("data-value");

            if (answer === value) {
                drop.classList.add("correct");
                drop.querySelector(".tile").style.backgroundColor = "#2ecc71"; // Correct tile color
            } else {
                if (drop.querySelector(".tile")) {
                    const wrongTile = drop.querySelector(".tile");

                    // Move wrong tile back to the original tiles area
                    tilesContainer.appendChild(wrongTile);
                    wrongTile.style.backgroundColor = "#3498db"; // Reset tile color to original
                }
            }
        });
    });
});
