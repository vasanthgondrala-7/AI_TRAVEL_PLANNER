"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import api from "@/services/api";
import { useAuth } from "@/context/AuthContext";

import Link from "next/link";

import toast from "react-hot-toast";

import {
  Plane,
  ShieldCheck,
  Sparkles
} from "lucide-react";

export default function LoginPage() {

  const router = useRouter();

  const { login } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response =
        await api.post(
          "/auth/login",
          {
            email,
            password
          }
        );

      login(
        response.data.token
      );

      toast.success(
        "Login Successful"
      );

      router.push(
        "/dashboard"
      );

    } catch (error: any) {

      toast.error(
        error?.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <main
      className="
      min-h-screen
      bg-[#050816]
      text-white
      flex
      items-center
      justify-center
      px-4
      py-10
      "
    >

      <div
        className="
        w-full
        max-w-7xl
        mx-auto
        grid
        lg:grid-cols-2
        gap-12
        items-center
        "
      >

        {/* Left Section */}

        <div
          className="
          hidden
          lg:flex
          flex-col
          justify-center
          "
        >

          <div className="max-w-xl">

            <div
              className="
              flex
              items-center
              gap-3
              mb-8
              "
            >

              <Plane
                size={36}
                className="text-yellow-400"
              />

              <h1
                className="
                text-3xl
                font-extrabold
                "
              >
                AI Travel Planner
              </h1>

            </div>

            <h2
              className="
              text-4xl
              xl:text-5xl
              font-extrabold
              leading-tight
              mb-6
              "
            >
              Plan Better.
              <br />
              Travel Smarter.
            </h2>

            <p
              className="
              text-lg
              text-gray-400
              mb-10
              "
            >
              Generate itineraries,
              hotel recommendations,
              travel budgets and
              packing lists powered
              by AI.
            </p>

            <div className="space-y-5">

              <div
                className="
                flex
                items-center
                gap-3
                "
              >
                <Sparkles
                  className="text-yellow-400"
                />
                AI Generated Itineraries
              </div>

              <div
                className="
                flex
                items-center
                gap-3
                "
              >
                <ShieldCheck
                  className="text-green-400"
                />
                Secure Account Access
              </div>

            </div>

          </div>

        </div>

        {/* Right Section */}

        <div
          className="
          flex
          justify-center
          "
        >

          <form
            onSubmit={handleSubmit}
            className="
            w-full
            max-w-md
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-8
            shadow-2xl
            "
          >

            <h1
              className="
              text-3xl
              font-bold
              mb-2
              "
            >
              Welcome Back
            </h1>

            <p
              className="
              text-gray-400
              mb-8
              "
            >
              Sign in to continue
              your travel planning.
            </p>

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="
              w-full
              p-4
              rounded-2xl
              bg-slate-800
              border
              border-slate-700
              mb-4
              "
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="
              w-full
              p-4
              rounded-2xl
              bg-slate-800
              border
              border-slate-700
              mb-6
              "
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="
              w-full
              p-4
              rounded-2xl
              bg-yellow-400
              text-black
              font-bold
              hover:bg-yellow-300
              transition
              "
            >

              {
                loading
                  ? "Signing In..."
                  : "Login"
              }

            </button>

            <p
              className="
              text-center
              text-gray-400
              mt-6
              "
            >
              Don't have an account?{" "}

              <Link
                href="/register"
                className="
                text-yellow-400
                font-semibold
                "
              >
                Register
              </Link>

            </p>

          </form>

        </div>

      </div>

    </main>

  );
}