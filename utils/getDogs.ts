export default async function getDogs(sortType: string, url?: string) {
  let urlToFetch;

  if (url) {
    urlToFetch = `${process.env.NEXT_PUBLIC_BASE_URL}${url}`;
  } else {
    urlToFetch = `${process.env.NEXT_PUBLIC_BASE_URL}/dogs/search?sort=breed:${sortType}`;
  }
  const response = await fetch(`${urlToFetch}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const searchResponse = await response.json();

  const dogsResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dogs`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(searchResponse.resultIds.slice(0, 9)),
  });

  if (!dogsResponse.ok) {
    throw new Error(`HTTP error! status: ${dogsResponse.status}`);
  }

  const dogsData = await dogsResponse.json();

  return { dogsData, searchResponse };
}
