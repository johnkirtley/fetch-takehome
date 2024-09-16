export default async function getDogsById(ids: string[]) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dogs`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ids)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const dogsData = await response.json();
    return dogsData;
}