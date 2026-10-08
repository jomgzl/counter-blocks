import { useState } from "react";
import "./App.css";
import type { BlockT } from "./types";
import Block from "./components/Block";

const uiFifty = 50;

const mocks: BlockT[] = [
  {
    color: "blue",
    width: uiFifty,
    height: uiFifty,
    left:
      Math.round((window.innerWidth - (uiFifty + 30 + 30)) * Math.random()) +
      30,
    top:
      Math.round((window.innerHeight - (uiFifty + 30 + 30)) * Math.random()) +
      30,
  },
  {
    color: "blue",
    width: uiFifty,
    height: uiFifty,
    left:
      Math.round((window.innerWidth - (uiFifty + 30 + 30)) * Math.random()) +
      30,
    top:
      Math.round((window.innerHeight - (uiFifty + 30 + 30)) * Math.random()) +
      30,
  },
  {
    color: "blue",
    width: uiFifty,
    height: uiFifty,
    left:
      Math.round((window.innerWidth - (uiFifty + 30 + 30)) * Math.random()) +
      30,
    top:
      Math.round((window.innerHeight - (uiFifty + 30 + 30)) * Math.random()) +
      30,
  },
  {
    color: "blue",
    width: uiFifty,
    height: uiFifty,
    left:
      Math.round((window.innerWidth - (uiFifty + 30 + 30)) * Math.random()) +
      30,
    top:
      Math.round((window.innerHeight - (uiFifty + 30 + 30)) * Math.random()) +
      30,
  },
  {
    color: "blue",
    width: uiFifty,
    height: uiFifty,
    left:
      Math.round((window.innerWidth - (uiFifty + 30 + 30)) * Math.random()) +
      30,
    top:
      Math.round((window.innerHeight - (uiFifty + 30 + 30)) * Math.random()) +
      30,
  },
];

function App({ initialCount }: { initialCount: number }) {
  // const initialCount = props.initialCount;
  // const { initialCount } = props;
  const [count, setCount] = useState(initialCount);
  const [blocks, setBlocks] = useState<BlockT[]>(mocks);

  // let count = 1;

  const handleIncrement = () => {
    console.log(count);
    setCount(count + 1);

    const newBlock: BlockT = {
      color: "blue",
      width: uiFifty,
      height: uiFifty,
      left:
        Math.round((window.innerWidth - (uiFifty + 30 + 30)) * Math.random()) +
        30,
      top:
        Math.round((window.innerHeight - (uiFifty + 30 + 30)) * Math.random()) +
        30,
    };
    localStorage.setItem("blocks", JSON.stringify(blocks));
    setBlocks(blocks.concat(newBlock));
  };

  console.log(blocks);

  return (
    <div style={{ backgroundColor: count > 3 ? "red" : "blue" }}>
      Hello {count}
      {count !== 5 && <button onClick={handleIncrement}>Increment</button>}
      <section>
        {blocks.map((block, index) => (
          <Block key={index} block={block} />
        ))}
      </section>
    </div>
  );
}

export default App;
