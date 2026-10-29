import { useState, useEffect } from "react";
import "./App.css";
import type { BlockT } from "./types";
import Block from "./components/Block";
import handleReadBlocks from "./utils/handleReadBlocks";
import { uiFifty } from "./constants";

function App({ initialCount }: { initialCount: number }) {
  // const initialCount = props.initialCount;
  // const { initialCount } = props;
  const [count, setCount] = useState(initialCount);
  const [blocks, setBlocks] = useState<BlockT[]>([]);

  const url = new URL(location.href);
  const id = url.searchParams.get("id");

  useEffect(() => {
    console.log("Use Effect triggered");
    if (id) {
      console.log("Rerendered");
      handleReadBlocks(id).then(({ blocks: newBlocks, name: newName }) => {
        setBlocks(newBlocks);
      });
      // name.value = newName;
    }
  }, [id]);

  // let count = 1;

  console.log(blocks, id);

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

  return (
    <div style={{ backgroundColor: count > 3 ? "red" : "blue" }}>
      Hello {count}
      {count !== 5 && <button onClick={handleIncrement}>Increment</button>}
      <section>
        {blocks.map((block) => (
          <Block
            key={block.top + block.left}
            block={block}
            setBlocks={setBlocks}
          />
        ))}
      </section>
    </div>
  );
}

export default App;
