"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const validatePhone = (p: string) => /^([+]?[0-9]{7,15})$/.test(p.replace(/[\s()-]/g, ""));
  const validatePassword = (pw: string) => pw.length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validatePhone(phone)) return setError("Invalid phone number format.");
    if (!validatePassword(password)) return setError("Password must be at least 6 characters.");

    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Login failed");
      setSuccess("🌾 Welcome back, farmer!");
      setPhone(""); setPassword("");
      // You could redirect here, e.g.:
      router.push("/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-green-50 via-amber-50 to-white px-4 py-12">
      <Card className="w-full max-w-md border border-green-200 shadow-lg shadow-green-100 rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-green-700">
            🌱 Farmer Seed Login
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Sign in to continue your growth journey.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Phone field */}
            <div>
              <Label htmlFor="phone" className="text-green-800 font-medium">Phone</Label>
              <Input
                id="phone"
                placeholder="+251912345678"
                className="mt-1 border-green-300 focus:ring-green-500 focus:border-green-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Password field */}
            <div>
              <Label htmlFor="password" className="text-green-800 font-medium">Password</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="border-green-300 focus:ring-green-500 focus:border-green-500 pr-16"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 text-sm hover:text-green-800 transition"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
            <p className="text-sm text-gray-600 text-center">
              Dont have an account? {" "}
               <Link href="/auth/signup" className="text-sm underline text-green-600 hover:text-green-800 transition">
                     Sign up
                </Link>
            </p>
           

            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
            {success && <p className="text-sm text-green-600 text-center">{success}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
