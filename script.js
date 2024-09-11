const targetContainer = document.querySelector('.etchSketchGrid');

for (i = 0; i < 16; i++) {
  const newDiv = document.createElement('div'); // Create div element

  targetContainer.appendChild(newDiv);
}