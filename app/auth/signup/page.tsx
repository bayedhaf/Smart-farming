"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link  from "next/link";
import { useRouter } from "next/navigation";


export default function RegisterForm() {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const validateFullname = (name: string) => name.trim().length >= 3;
  const validatePhone = (p: string) => /^([+]?[0-9]{7,15})$/.test(p.replace(/[\s()-]/g, ""));
  const validatePassword = (pw: string) => pw.length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateFullname(fullname)) return setError("Full name should be at least 3 characters.");
    if (!validatePhone(phone)) return setError("Invalid phone number format.");
    if (!validatePassword(password)) return setError("Password should be at least 6 characters.");

    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, phone, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Registration failed");
      setSuccess("🎉 Registration successful! You can now sign in.");
      setFullname(""); setPhone(""); setPassword("");
      //redirect to dashboard
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
            🌱 Farmer Seed Register
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Join our farmer community — grow smarter together.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full name */}
            <div>
              <Label htmlFor="fullname" className="text-green-800 font-medium">Full name</Label>
              <Input
                id="fullname"
                placeholder="e.g. Bayisa Balcha"
                className="mt-1 border-green-300 focus:ring-green-500 focus:border-green-500"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>

            {/* Phone */}
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

            {/* Password */}
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
              {loading ? "Registering..." : "Create Account"}
            </Button>
          <p className="text-sm text-gray-600 text-center mt-4">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-green-600 hover:text-green-800 transition"
              >
                Login
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
