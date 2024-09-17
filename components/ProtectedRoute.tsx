"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { getValueExpiration } from "../utils/valueExpiration";

function useAuthCheck() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = () => {
    const authToken = getValueExpiration("auth");
    if (!authToken) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [router]);

  return isAuthenticated;
}

export default function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function AuthProtectedComponent(props: P) {
    const isAuthenticated = useAuthCheck();

    if (!isAuthenticated) return null;

    return <WrappedComponent {...props} />;
  };
}
