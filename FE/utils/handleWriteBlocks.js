export default async function handleWriteBlocks(newBlock) {
  const request = await fetch("https://counter-blocks-be-production.up.railway.app/", {
    method: "POST",
    body: JSON.stringify(newBlock),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`There was an error ${response.status}`);
      }
      if (response.status === 200) {
        console.log("Request has succeeded");
      }
    })
    .catch((error) => {
      console.log("Fetch error: ", error);
    });
}
