export async function getAllBreeds() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/dogs/breeds`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
