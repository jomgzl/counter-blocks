let number = document.querySelector("div");
let section = document.querySelector("section");
let colorInput = document.querySelector("input");
let widthInput = document.getElementById("width");
let heightInput = document.getElementById("height");

console.log(number);

let blocks = [];
let memory = localStorage.getItem("blocks");

if (memory) {
  blocks = JSON.parse(memory);
}

for (let i = 0; i < blocks.length; i++) {
  const block = createBlock(blocks[i]);

  section.append(block);
}

let addButton = document.getElementById("add");
let substractButton = document.getElementById("substract");

let state = 0;

addButton.addEventListener("click", () => {
  state++;
  number.textContent = state;

  let width = +widthInput.value || 50;
  let height = +heightInput.value || 50;

  const newBlock = {
    color: colorInput.value,
    width: width,
    height: height,
    left:
      Math.round((window.innerWidth - (width + 30 + 30)) * Math.random()) + 30,
    top:
      Math.round((window.innerHeight - (height + 30 + 30)) * Math.random()) +
      30,
  };

  blocks.push(newBlock);
  localStorage.setItem("blocks", JSON.stringify(blocks));

  console.log(newBlock);
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
  const { color = "black", height = 50, width = 50, left, top } = newBlock;
  let block = document.createElement("div");

  block.style.height = height + "px";
  block.style.width = width + "px";
  block.style.left = left + "px";
  block.style.top = top + "px";
  block.style.backgroundColor = color;

  let closeButton = document.createElement("button");
  closeButton.innerText = "❌";
  closeButton.className = "closeButton";

  let leftButton = document.createElement("button");
  leftButton.innerText = "⬅️";
  leftButton.className = "left";

  leftButton.addEventListener("click", () => {
    newBlock.left--;
    block.style.left = newBlock.left + "px";
  });

  let rightButton = document.createElement("button");
  rightButton.innerText = "➡️";
  rightButton.className = "right";

  rightButton.addEventListener("click", () => {
    newBlock.left++;
    block.style.left = newBlock.left + "px";
  });

  let topButton = document.createElement("button");
  topButton.innerText = "⬆️";
  topButton.className = "top";

  topButton.addEventListener("click", () => {
    newBlock.top--;
    block.style.top = newBlock.top + "px";
  });

  let bottomButton = document.createElement("button");
  bottomButton.innerText = "⬇️";
  bottomButton.className = "bottom";

  bottomButton.addEventListener("click", () => {
    newBlock.top++;
    block.style.top = newBlock.top + "px";
  });

  block.append(closeButton, leftButton, rightButton, topButton, bottomButton);

  closeButton.addEventListener("click", () => {
    block.remove();
  });

  return block;
}
