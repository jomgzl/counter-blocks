import type { BlockT } from "../types";

export default async function handleReadBlocks(
  id: string,
): Promise<{ blocks: BlockT[]; name: string }> {
  const request = await fetch(`http://localhost:3000/blocks/${id}`);
  if (request.status === 200) {
    return await request.json();
  } else {
    const memory = localStorage.getItem("blocks");
    if (memory) {
      return { blocks: JSON.parse(memory), name: "" };
    } else {
      return { blocks: [], name: "" };
    }
  }
}
