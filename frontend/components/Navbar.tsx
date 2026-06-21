"use client";

import Link from "next/link";
import { Plane, LogOut, LayoutDashboard, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const router = useRouter();

  const { token, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header
      className="
      sticky
      top-0
      z-50
      border-b
      border-white/10
      bg-[#050816]/80
      backdrop-blur-xl
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        h-20
        flex
        items-center
        justify-between
        "
      >
        <Link
          href="/"
          className="
          flex
          items-center
          gap-3
          "
        >
          <div
            className="
            w-11
            h-11
            rounded-xl
            bg-yellow-400
            flex
            items-center
            justify-center
            "
          >
            <Plane
              size={22}
              className="text-black"
            />
          </div>

          <div>
            <h1
              className="
              text-xl
              font-extrabold
              text-white
              "
            >
              AI Travel
            </h1>

            <p
              className="
              text-xs
              text-gray-400
              "
            >
              Smart Journey Planner
            </p>
          </div>
        </Link>

        <div
          className="
          flex
          items-center
          gap-4
          "
        >
          {token ? (
            <>
              <Link
                href="/dashboard"
                className="
                flex
                items-center
                gap-2
                px-4
                py-2
                rounded-xl
                text-gray-300
                hover:bg-white/10
                hover:text-white
                transition
                "
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>

              <Link
                href="/create-trip"
                className="
                flex
                items-center
                gap-2
                px-4
                py-2
                rounded-xl
                bg-yellow-400
                text-black
                font-semibold
                hover:scale-105
                transition
                "
              >
                <PlusCircle size={18} />
                New Trip
              </Link>

              <button
                onClick={handleLogout}
                className="
                flex
                items-center
                gap-2
                px-4
                py-2
                rounded-xl
                bg-red-500
                text-white
                hover:bg-red-600
                transition
                "
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="
                px-5
                py-2.5
                rounded-xl
                border
                border-gray-700
                text-gray-300
                hover:bg-white/10
                hover:text-white
                transition
                "
              >
                Login
              </Link>

              <Link
                href="/register"
                className="
                px-5
                py-2.5
                rounded-xl
                bg-yellow-400
                text-black
                font-bold
                hover:scale-105
                transition
                "
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
