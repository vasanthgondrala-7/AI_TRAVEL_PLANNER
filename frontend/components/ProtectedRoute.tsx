"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {

  const {
    token,
    loading
  } = useAuth();

  const router = useRouter();

  useEffect(() => {

    console.log(
      "Auth State:",
      {
        loading,
        token
      }
    );

    if (
      !loading &&
      !token
    ) {

      router.push("/login");

    }

  }, [
    loading,
    token,
    router
  ]);

  if (loading) {

    return (
      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
        text-white
        "
      >
        Loading...
      </div>
    );

  }

  if (!token) {

    return null;

  }

  return <>{children}</>;

}