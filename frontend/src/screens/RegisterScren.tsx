"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../state/auth/userSlice";
import type { RootState, AppDispatch } from "../state/store";
import { useNavigate } from "react-router-dom";
import { GalleryVerticalEnd, LogIn, ArrowRight } from "lucide-react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import loginLottie from "../assets/login.json";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";

const RegisterScreen = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { userInfo, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (userInfo) {
      navigate("/main");
    }
  }, [userInfo, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordError("");

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    dispatch(registerUser({ name, email, password }));
  };

  const handleTestLogin = () => {
    dispatch(loginUser({ email: "robertslore@gmail.com", password: "1234" }));
  };

  return (
    <div className="min-h-[calc(100vh-54px)] bg-[#F5D04E]/10 font-['Figtree_Variable',sans-serif] flex items-center">
      <div className="container mx-auto px-8 py-3 ">
        <Card className="rounded-2xl border border-black shadow-[0.4rem_0.4rem_0_0_#000] overflow-hidden bg-white max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 p-0 ">
            {/* Left Column - Animation */}
            <div className=" p-8 flex flex-col items-center justify-center">
              <div className="mb-4 text-center">
                <div className="bg-[#F5D04E] rounded-full p-3 mb-4 mx-auto inline-flex">
                  <GalleryVerticalEnd className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-[800] mb-1">StoryScript</h2>
                <p className="text-neutral-600 text-sm">
                  Share your stories with the world
                </p>
              </div>
              <div className="hidden md:block">
                <Lottie
                  animationData={loginLottie}
                  loop
                  className="w-full h-[250px] "
                />
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="p-6 md:px-4 md:py-4 ">
              <h1 className="text-2xl font-[800] text-center mb-2">
                Create an account
              </h1>
              <p className="text-neutral-500 text-center text-sm mb-6">
                Enter your details below
              </p>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 mb-6 text-sm">
                  {error}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-[600] text-sm">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-lg border-gray-300 focus:border-black focus:ring-black"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-[600] text-sm">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-lg border-gray-300 focus:border-black focus:ring-black"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="font-[600] text-sm">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-lg border-gray-300 focus:border-black focus:ring-black"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="font-[600] text-sm"
                  >
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="rounded-lg border-gray-300 focus:border-black focus:ring-black"
                  />
                  {passwordError && (
                    <p className="text-red-500 text-xs mt-1">{passwordError}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-800 text-white font-[700] py-2 rounded-lg transition-colors h-10"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating account...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Sign Up <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>

                {/* Test Account Login Button */}
                <Button
                  type="button"
                  onClick={handleTestLogin}
                  className="w-full bg-white border border-black hover:bg-gray-50 text-black font-[700] py-2 rounded-lg transition-colors flex items-center justify-center gap-2 h-10"
                  variant="outline"
                  disabled={loading}
                >
                  <LogIn className="h-4 w-4" /> Login as Test Account
                </Button>

                <div className="text-center text-sm font-[600] mt-4">
                  Already have an account?{" "}
                  <Link
                    to="/"
                    className="text-blue-600 hover:text-blue-800 underline underline-offset-4"
                  >
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RegisterScreen;
