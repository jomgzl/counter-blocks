let number = document.querySelector("div");
let section = document.querySelector("section");
let colorInput = document.querySelector("input");
let widthInput = document.getElementById("width");
let heightInput = document.getElementById("height");

console.log(number);

let addButton = document.getElementById("add");
let substractButton = document.getElementById("substract");

let state = 0;

addButton.addEventListener("click", () => {
  state++;
  number.textContent = state;

  const newBlock = {
    color: colorInput.value,
    width: widthInput.value || 50,
    height: heightInput.value || 50,
  };

  const block = createBlock(newBlock);

  section.append(block);
});

substractButton.addEventListener("click", () => {
  if (state > 0) {
    state--;
    number.textContent = state;
  }
});

function createBlock(newBlock = {}) {
  const { color = "black", height = 50, width = 50 } = newBlock;
  let block = document.createElement("div");

  block.style.height = height + "px";
  block.style.width = width + "px";
  block.style.backgroundColor = color;

  let closeButton = document.createElement("button");
  closeButton.innerText = "❌";
  closeButton.className = "closeButton";

  let leftButton = document.createElement("button");
  leftButton.innerText = "⬅️";
  leftButton.className = "left";

  let rightButton = document.createElement("button");
  rightButton.innerText = "➡️";
  rightButton.className = "right";

  let topButton = document.createElement("button");
  topButton.innerText = "⬆️";
  topButton.className = "top";

  let bottomButton = document.createElement("button");
  bottomButton.innerText = "⬇️";
  bottomButton.className = "bottom";

  block.append(closeButton, leftButton, rightButton, topButton, bottomButton);

  closeButton.addEventListener("click", () => {
    block.remove();
  });

  return block;
}
