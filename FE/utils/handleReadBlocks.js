export default async function handleReadBlocks() {
  const request = await fetch("https://counter-blocks-be-production.up.railway.app/");
  if (request.status === 200) {
    return await request.json();
  } else {
    let memory = localStorage.getItem("blocks");
    if (memory) {
      return JSON.parse(memory);
    } else {
      return [];
    }
  }
}
