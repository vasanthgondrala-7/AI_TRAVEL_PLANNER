"use client";                              
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function HomePage() {

  const { token } = useAuth();

  return (
    <>
      <Navbar />

      <main className="bg-[#050816] text-white">

        <section className="px-6 py-24 md:py-32">

          <div className="max-w-6xl mx-auto text-center">

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Discover The World
              <span className="block text-yellow-400">
                With AI
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-gray-400 mb-10">
              Generate itineraries, budgets, hotels and packing lists.
            </p>

            <div className="flex justify-center gap-4">

              <Link
                href={token ? "/create-trip" : "/register"}
                className="
                px-6
                py-3
                rounded-xl
                bg-yellow-400
                text-black
                font-bold
                "
              >
                {token ? "Plan A Trip" : "Start Planning"}
              </Link>

              {!token && (
                <Link
                  href="/login"
                  className="
                  px-6
                  py-3
                  rounded-xl
                  border
                  border-gray-700
                  "
                >
                  Sign In
                </Link>
              )}

            </div>

          </div>

        </section>

        <section className="max-w-6xl mx-auto px-6 pb-20">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-slate-900 p-8 rounded-3xl">
              AI Planning
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl">
              24/7 Assistant
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl">
              Unlimited Trips
            </div>

          </div>

        </section>

      </main>
    </>
  );
}