const targetContainer = document.querySelector('.etchSketchGrid');

function createGrid(size) {
  targetContainer.innerHTML = ''; // Clear the existing grid

  // Set the grid template columns and rows based on the size
  targetContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  targetContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  // Create the divs based on the grid size
  for (let i = 0; i < size * size; i++) {
    const newDiv = document.createElement('div'); // Create new div element
    targetContainer.appendChild(newDiv); // Append it to the container
  }
}

// Example usage: create a 16x16 grid
createGrid(16);
