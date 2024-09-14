"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function withAuth<P extends object>(Component: React.ComponentType<P>) {
    return function ProtectedComponent(props: P) {
        const WrappedComponent = () => {
            const router = useRouter();
            const [isAuth, setIsAuth] = useState(false);

            useEffect(() => {
                const auth = typeof window !== undefined ? window.localStorage.getItem('auth') : null

                if (auth !== 'true') {
                    router.push('/login')
                } else {
                    setIsAuth(true)
                }
            }, [router])

            if (!isAuth) return null;

            return <Component {...props} />
        }
        return <WrappedComponent />
    }
}