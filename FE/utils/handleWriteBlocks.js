export default async function handleWriteBlocks(blocks) {
  return await fetch(
    // "https://counter-blocks-be-production.up.railway.app/blocks",
    "http://localhost:3000/blocks",
    {
      method: "POST",
      body: JSON.stringify(blocks),
      headers: {
        "Content-type": "application/json",
      },
    },
  )
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`There was an error ${response.status}`);
      }
      if (response.status === 200) {
        console.log("Request has succeeded");
        return response.text();
      }
    })
    .then((id) => {
      return id;
    })
    .catch((error) => {
      console.log("Fetch error: ", error);
    });
}
