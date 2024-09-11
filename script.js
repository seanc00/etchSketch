const targetContainer = document.querySelector('.etchSketchGrid');
const inputField = document.querySelector('input[type="number"]');
const submitButton = document.querySelector('button[type="submit"]');
const saveButton = document.querySelector('#saveBtn'); // Save button
const canvas = document.querySelector('#canvas'); // Canvas element
const gridSizeSpan = document.querySelector('.gridSize');
const colorButtons = document.querySelectorAll('.changeColorBtns > button');

let isDrawing = false; // Flag to check if the mouse is pressed
let useRandomColor = false; // Flag to check if the random color mode is active

// Set the first button (black) as active by default
colorButtons[0].classList.add('pressed');

// Function to generate a random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to handle button press effect
colorButtons.forEach((button, index) => {
  button.addEventListener('click', function() {
    // Remove 'pressed' class from all buttons
    colorButtons.forEach(btn => btn.classList.remove('pressed'));
    
    // Add 'pressed' class to the clicked button
    button.classList.add('pressed');
    
    // Set the drawing mode: black or random color
    useRandomColor = index === 1;
  });
});

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

    // Event listener for mousedown to start drawing on click
    newDiv.addEventListener('mousedown', function() {
      newDiv.style.backgroundColor = useRandomColor ? getRandomColor() : 'black';
      isDrawing = true; // Set drawing mode on
    });

    // Event listener for mouseover, but only change color if mouse is pressed
    newDiv.addEventListener('mouseenter', function() {
      if (isDrawing) {
        newDiv.style.backgroundColor = useRandomColor ? getRandomColor() : 'black';
      }
    });

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

// Event listener to stop drawing when the mouse button is released
document.body.addEventListener('mouseup', () => {
  isDrawing = false;
});

// Function to save the grid as PNG
saveButton.addEventListener('click', function() {
  const gridItems = document.querySelectorAll('.grid-item');
  const gridSize = Math.sqrt(gridItems.length); // Calculate grid size (since it's always square)

  // Set canvas size to match grid container
  canvas.width = targetContainer.offsetWidth;
  canvas.height = targetContainer.offsetHeight;
  const ctx = canvas.getContext('2d');

  const divWidth = targetContainer.offsetWidth / gridSize;
  const divHeight = targetContainer.offsetHeight / gridSize;

  // Draw each grid div onto the canvas
  gridItems.forEach((div, index) => {
    const x = (index % gridSize) * divWidth;
    const y = Math.floor(index / gridSize) * divHeight;
    ctx.fillStyle = div.style.backgroundColor || 'lightgray'; // Default to light gray if no color
    ctx.fillRect(x, y, divWidth, divHeight);
  });

  // Convert canvas to PNG and download
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = 'etchSketchGrid.png';
  link.click();
});

// Initial grid creation
createGrid(16);
