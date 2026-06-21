"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import api from "@/services/api";

import Link from "next/link";

import toast from "react-hot-toast";

import {
  Plane,
  UserPlus,
  Sparkles,
  Globe
} from "lucide-react";

export default function RegisterPage() {

  const router =
    useRouter();

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

      await api.post(
        "/auth/register",
        {
          email,
          password
        }
      );

      toast.success(
        "Registration Successful"
      );

      router.push(
        "/login"
      );

    } catch (error: any) {

      toast.error(
        error?.response?.data?.message ||
        "Registration Failed"
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
              Start Your
              <br />
              Next Adventure
            </h2>

            <p
              className="
              text-lg
              text-gray-400
              mb-10
              "
            >
              Join travelers using AI
              to create smarter itineraries,
              discover destinations,
              and build unforgettable journeys.
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
                AI Powered Trip Planning
              </div>

              <div
                className="
                flex
                items-center
                gap-3
                "
              >
                <Globe
                  className="text-blue-400"
                />
                Worldwide Destination Discovery
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

            <div
              className="
              flex
              items-center
              gap-3
              mb-6
              "
            >

              <UserPlus
                className="
                text-yellow-400
                "
              />

              <h1
                className="
                text-3xl
                font-bold
                "
              >
                Create Account
              </h1>

            </div>

            <p
              className="
              text-gray-400
              mb-8
              "
            >
              Create your account and start
              generating AI-powered travel plans.
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
              disabled:opacity-50
              "
            >

              {
                loading
                  ? "Creating Account..."
                  : "Register"
              }

            </button>

            <p
              className="
              text-center
              text-gray-400
              mt-6
              "
            >
              Already have an account?{" "}

              <Link
                href="/login"
                className="
                text-yellow-400
                font-semibold
                "
              >
                Login
              </Link>

            </p>

          </form>

        </div>

      </div>

    </main>

  );
}