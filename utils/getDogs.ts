export default async function getDogs(sortType: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dogs/search?size=100&sort=breed:${sortType}`, {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('data', data)

    const dogsResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dogs`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data.resultIds.slice(0, 99))
    });

    if (!dogsResponse.ok) {
        throw new Error(`HTTP error! status: ${dogsResponse.status}`);
    }

    const dogsData = await dogsResponse.json()
    console.log('dogsData', dogsData);

    return dogsData;
}