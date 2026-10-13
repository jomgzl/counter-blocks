import { useState } from "react";
import type { BlockT } from "../types";

function Block({ block, setBlocks }: { block: BlockT }) {
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
      onclick() {
        console.log("TEST");
        setBlocks((prevBlocks) => {
          const copy = [...prevBlocks];
          const index = prevBlocks.findIndex(
            (item) => block.top == item.top && block.left == item.left,
          );
          copy.splice(index, 1);
          return copy;
        });

        localStorage.setBlock("blocks", JSON.stringify(blocks));
      },
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
