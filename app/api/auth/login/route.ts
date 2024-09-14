export async function POST(req: Request) {
    try {
        const { name, email } = await req.json()

        const request = await fetch(`${process.env.BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name, email: email}),
            credentials: 'include'
        })
    
        console.log('req', request)
        if (!request.ok) {
            throw new Error(`Authentication Error: ${request.status}`)
        }

        return Response.json({status: request.status, name, email})
    } catch (error) {
        console.log('Error', error)
        return Response.json({error: 'Error has occurred', status: 500})
    }

}