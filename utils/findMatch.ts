export default async function findMatch(favorites: string[]) {
  const matchResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/dogs/match`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(favorites),
    }
  );

  if (!matchResponse.ok) {
    throw new Error(`HTTP error! status: ${matchResponse.status}`);
  }

  const matchData = await matchResponse.json();

  const matchInfo = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dogs`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([matchData.match]),
  });

  if (!matchInfo.ok) {
    throw new Error(`HTTP error! status: ${matchInfo.status}`);
  }

  const matchInfoData = await matchInfo.json();

  return matchInfoData;
}
