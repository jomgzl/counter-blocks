import { useState } from "react";
import type { BlockT } from "../types";

function Block({ block }: { block: BlockT }) {
  const [left, setLeft] = useState(block.left);
  const [top, setTop] = useState(block.top);

  const blocks: BlockT[] = [];

  const buttonsArray = [
    {
      innerText: "⬅️",
      className: "left",
      onclick() {
        setLeft(left - 10);
        localStorage.setBlock("blocks", JSON.stringify(blocks));
      },
    },
    {
      innerText: "➡️",
      className: "right",
      onclick() {
        setLeft(left + 10);
        localStorage.setBlock("blocks", JSON.stringify(blocks));
      },
    },
    {
      innerText: "⬆️",
      className: "top",
      onclick() {
        setTop(top - 10);
        localStorage.setBlock("blocks", JSON.stringify(blocks));
      },
    },
    {
      innerText: "⬇️",
      className: "bottom",
      onclick() {
        setTop(top + 10);
        localStorage.setBlock("blocks", JSON.stringify(blocks));
      },
    },
    {
      innerText: "❌",
      className: "closeButton",
      // onclick() {
      //   state--;
      //   number.textContent = state;
      //   block.remove();
      //   const index = blocks.findIndex((block) => id == block.id);
      //   blocks.splice(index, 1);
      //   localStorage.setBlock("blocks", JSON.stringify(blocks));
      // },
    },
  ];

  return (
    <div
      style={{
        left: left + "px",
        top: top + "px",
        width: block.width + "px",
        height: block.height + "px",
        backgroundColor: block.color,
      }}
    >
      {buttonsArray.map((button, index) => (
        <button
          key={index}
          className={button.className}
          onClick={button.onclick}
        >
          {button.innerText}
        </button>
      ))}
    </div>
  );
}

export default Block;
