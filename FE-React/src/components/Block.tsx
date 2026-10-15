import type { BlockT } from "../types";

function Block({ block, setBlocks }: { block: BlockT }) {
  // const [left, setLeft] = useState(block.left);
  // const [top, setTop] = useState(block.top);

  const handleMove = (left, top) => {
    setBlocks((prevBlocks) => {
      const index = prevBlocks.findIndex(
        (item) => block.top == item.top && block.left == item.left,
      );

      prevBlocks[index].left = left;
      prevBlocks[index].top = top;

      return [...prevBlocks];
    });
  };

  const blocks: BlockT[] = [];

  const buttonsArray = [
    {
      innerText: "⬅️",
      className: "left",
      onclick() {
        handleMove(block.left - 10, block.top);
        localStorage.setBlock("blocks", JSON.stringify(blocks));
      },
    },
    {
      innerText: "➡️",
      className: "right",
      onclick() {
        handleMove(block.left + 10, block.top);
        localStorage.setBlock("blocks", JSON.stringify(blocks));
      },
    },
    {
      innerText: "⬆️",
      className: "top",
      onclick() {
        handleMove(block.left, block.top - 10);
        localStorage.setBlock("blocks", JSON.stringify(blocks));
      },
    },
    {
      innerText: "⬇️",
      className: "bottom",
      onclick() {
        handleMove(block.left, block.top + 10);
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
          // const index = prevBlocks.findIndex(
          //   (item) => block.top == item.top && block.left == item.left,
          // );
          // prevBlocks.splice(index, 1);
          //    console.log(prevBlocks);
          // return prevBlocks;
        });

        localStorage.setBlock("blocks", JSON.stringify(blocks));
      },
    },
  ];

  return (
    <div
      style={{
        left: block.left + "px",
        top: block.top + "px",
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
