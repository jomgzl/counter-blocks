let number = document.querySelector("div");
let section = document.querySelector("section");

console.log(number);

let addButton = document.getElementById("add");
let substractButton = document.getElementById("substract");

let state = 0;

addButton.addEventListener("click", () => {
  state++;
  number.textContent = state;

  let block = document.createElement("div");

  block.id = "blockId";

  block.style.height = "60px";
  block.style.width = "60px";
  block.style.backgroundColor = "navy";
  block.style.margin = "5px";

  section.style.display = "flex";
  section.append(block);
});

substractButton.addEventListener("click", () => {
  if (state > 0) {
    state--;
    number.textContent = state;

    let block = document.getElementById("blockId");

    block.remove();
  }
});
