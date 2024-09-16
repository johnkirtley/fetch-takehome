'use client'
import withAuth from '../../components/ProtectedRoute';

function FindMyMatch() {
    return (
        <div>
            <h1>Find My Match</h1>
        </div>
    )
}

export default withAuth(FindMyMatch);