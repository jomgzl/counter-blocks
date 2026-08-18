import handleReadBlocks from "./utils/handleReadBlocks.js";
import handleWriteBlocks from "./utils/handleWriteBlocks.js";

let number = document.querySelector("div");
let section = document.querySelector("section");
let colorInput = document.querySelector("input");
let widthInput = document.getElementById("width");
let heightInput = document.getElementById("height");
let addButton = document.getElementById("add");
let substractButton = document.getElementById("substract");
let postButton = document.getElementById("post");
let textArea = document.getElementById("text-area");
let name = document.getElementById("name");

let state = 0;
let blockId = 0;
let numberOfImage = {
  number: 1,
};

const url = new URL(location.href);
const id = url.searchParams.get("id");

let blocks = [];

if (id) {
  let { blocks: newBlocks, name: newName } = await handleReadBlocks(id);
  blocks = newBlocks;
  name.value = newName;
}

state = blocks.length;
number.textContent = state;
if (blocks.length) {
  blockId = blocks.at(-1).id + 1;
} else {
  blockId = 1;
}

for (let i = 0; i < blocks.length; i++) {
  const block = createBlock(blocks[i]);
  section.append(block);
}

addButton.addEventListener("click", () => {
  state++;
  number.textContent = state;

  let width = +widthInput.value || 50;
  let height = +heightInput.value || 50;

  const newBlock = {
    id: blockId,
    color: colorInput.value,
    width: width,
    height: height,
    left:
      Math.round((window.innerWidth - (width + 30 + 30)) * Math.random()) + 30,
    top:
      Math.round((window.innerHeight - (height + 30 + 30)) * Math.random()) +
      30,
  };

  blockId++;

  const block = createBlock(newBlock);

  blocks.push(newBlock);
  localStorage.setItem("blocks", JSON.stringify(blocks));

  section.append(block);
});

substractButton.addEventListener("click", () => {
  if (state > 0) {
    state--;
    number.textContent = state;

    blocks.pop();
    section.lastElementChild.remove();
    localStorage.setItem("blocks", JSON.stringify(blocks));
  }
});

function createBlock(newBlock = {}) {
  const { id, color = "black", height = 50, width = 50, left, top } = newBlock;
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
    newBlock.left -= 10;
    localStorage.setItem("blocks", JSON.stringify(blocks));
    block.style.left = newBlock.left + "px";
  });

  let rightButton = document.createElement("button");
  rightButton.innerText = "➡️";
  rightButton.className = "right";

  rightButton.addEventListener("click", () => {
    newBlock.left += 10;
    localStorage.setItem("blocks", JSON.stringify(blocks));
    block.style.left = newBlock.left + "px";
  });

  let topButton = document.createElement("button");
  topButton.innerText = "⬆️";
  topButton.className = "top";

  topButton.addEventListener("click", () => {
    newBlock.top -= 10;
    localStorage.setItem("blocks", JSON.stringify(blocks));
    block.style.top = newBlock.top + "px";
  });

  let bottomButton = document.createElement("button");
  bottomButton.innerText = "⬇️";
  bottomButton.className = "bottom";

  bottomButton.addEventListener("click", () => {
    newBlock.top += 10;
    localStorage.setItem("blocks", JSON.stringify(blocks));
    block.style.top = newBlock.top + "px";
  });

  block.append(closeButton, leftButton, rightButton, topButton, bottomButton);

  closeButton.addEventListener("click", () => {
    state--;
    number.textContent = state;
    block.remove();
    const index = blocks.findIndex((item) => id == item.id);
    blocks.splice(index, 1);
    localStorage.setItem("blocks", JSON.stringify(blocks));
  });

  return block;
}

postButton.addEventListener("click", async () => {
  console.log(name.value);
  const id = await handleWriteBlocks(blocks, name.value);
  const url = new URL(location.href);
  url.searchParams.set("id", id);
  textArea.setAttribute("href", url.toString());
  textArea.innerText = name.value || "image" ;
  localStorage.removeItem("blocks");
});
