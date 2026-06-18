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

  section.append(block);
});

substractButton.addEventListener("click", () => {
  state--;
  number.textContent = state;
});
