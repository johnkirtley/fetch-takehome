export async function getDogByBreed(breed: string) {
  const searchResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/dogs/search?breeds=${breed}&size=99`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!searchResponse.ok) {
    throw new Error(`HTTP error! status: ${searchResponse.status}`);
  }

  const searchData = await searchResponse.json();

  const dogsResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dogs`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(searchData.resultIds),
  });

  if (!dogsResponse.ok) {
    throw new Error(`HTTP error! status: ${dogsResponse.status}`);
  }

  const dogsData = await dogsResponse.json();
  return dogsData;
}
