const targetContainer = document.querySelector('.etchSketchGrid');
const inputField = document.querySelector('input[type="number"]');
const submitButton = document.querySelector('button[type="submit"]');
const gridSizeSpan = document.querySelector('.gridSize'); // Select the span element

// Function to create the grid
function createGrid(size) {
  targetContainer.innerHTML = ''; // Clear the existing grid

  // Set the grid template columns and rows based on the size
  targetContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  targetContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  // Create the divs based on the grid size
  for (let i = 0; i < size * size; i++) {
    const newDiv = document.createElement('div'); // Create new div element
    newDiv.classList.add('grid-item'); // Add a class for potential styling
    targetContainer.appendChild(newDiv); // Append it to the container
  }

  // Update the grid size in the span
  gridSizeSpan.textContent = `${size} x ${size}!`;
}

// Event listener for the button click
submitButton.addEventListener('click', function() {
  const gridSize = parseInt(inputField.value); // Get the input value and convert it to an integer

  if (gridSize > 0) { // Check if the input is valid
    createGrid(gridSize); // Call createGrid with the input value
  } else {
    alert('Please enter a valid number greater than 0.');
  }
});

// Initial grid creation (optional)
createGrid(16); // You can remove this if you don't want a default grid on load
