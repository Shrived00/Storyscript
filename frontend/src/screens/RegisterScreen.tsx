import * as React from "react";
import { Link } from "react-router-dom"; // Use Link for navigation
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Eye, EyeOff, Spline, X } from "lucide-react";
import { useMemo, useState } from "react";
import intorImg from '@/assets/introImg.jpg'

const RegisterScreen = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const toggleVisibility = () => setIsVisible((prevState) => !prevState);

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }

    const checkStrength = (pass: string) => {
        const requirements = [
            { regex: /.{8,}/, text: "At least 8 characters" },
            { regex: /[0-9]/, text: "At least 1 number" },
            { regex: /[a-z]/, text: "At least 1 lowercase letter" },
            { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
        ];

        return requirements.map((req) => ({
            met: req.regex.test(pass),
            text: req.text,
        }));
    };

    const strength = checkStrength(password);

    const strengthScore = useMemo(() => {
        return strength.filter((req) => req.met).length;
    }, [strength]);

    const getStrengthColor = (score: number) => {
        if (score === 0) return "bg-border";
        if (score <= 1) return "bg-red-500";
        if (score <= 2) return "bg-orange-500";
        if (score === 3) return "bg-amber-500";
        return "bg-emerald-500";
    };

    const getStrengthText = (score: number) => {
        if (score === 0) return "Enter a password";
        if (score <= 2) return "Weak password";
        if (score === 3) return "Medium password";
        return "Strong password";
    };

    return (
        <div className="h-screen bg-slate-100">
            <div className="container relative h-screen flex-col items-center justify-center grid md:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">


                    <img
                        src={intorImg}
                        alt="IntroImg"
                        className="absolute inset-0 w-full h-full object-cover"
                    />



                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-6 w-6"
                        >
                            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                        </svg>
                        StroyScript
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                Welcome to StroyScript, where your journey of sharing stories begins!
                            </p>
                            <footer className="text-sm">Srived Kakde</footer>
                        </blockquote>
                    </div>
                </div>

                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-left mb-4">
                            <h1 className="text-2xl font-semibold tracking-tight">Register</h1>
                        </div>

                        {/* Form Start */}
                        <form onSubmit={onSubmit}>
                            <div className="grid gap-6">
                                <div className="grid gap-1 space-y-2">
                                    <Label htmlFor="username">Username  <span className="text-destructive">*</span></Label>
                                    <Input
                                        id="username"
                                        placeholder="Username"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        disabled={isLoading}
                                        required
                                    />
                                </div>

                                <div className="grid gap-1 space-y-2">
                                    <Label htmlFor="email">Email  <span className="text-destructive">*</span></Label>
                                    <Input
                                        id="email"
                                        placeholder="name@example.com"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={isLoading}
                                        required
                                    />
                                </div>

                                <div>
                                    {/* Password input field with toggle visibility button */}
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                className="pe-9"
                                                placeholder="Password"
                                                type={isVisible ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                aria-invalid={strengthScore < 4}
                                                aria-describedby="password-strength"
                                            />
                                            <button
                                                className="absolute inset-y-px end-px flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                                type="button"
                                                onClick={toggleVisibility}
                                                aria-label={isVisible ? "Hide password" : "Show password"}
                                                aria-pressed={isVisible}
                                                aria-controls="password"
                                            >
                                                {isVisible ? (
                                                    <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
                                                ) : (
                                                    <Eye size={16} strokeWidth={2} aria-hidden="true" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Password strength indicator */}
                                    <div
                                        className="mb-4 mt-3 h-1 w-full overflow-hidden rounded-full bg-border"
                                        role="progressbar"
                                        aria-valuenow={strengthScore}
                                        aria-valuemin={0}
                                        aria-valuemax={4}
                                        aria-label="Password strength"
                                    >
                                        <div
                                            className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
                                            style={{ width: `${(strengthScore / 4) * 100}%` }}
                                        ></div>
                                    </div>

                                    {/* Password strength description */}
                                    <p id="password-strength" className="mb-2 text-sm font-medium text-foreground">
                                        {getStrengthText(strengthScore)}. Must contain:
                                    </p>

                                    {/* Password requirements list */}
                                    <ul className="space-y-1.5" aria-label="Password requirements">
                                        {strength.map((req, index) => (
                                            <li key={index} className="flex items-center space-x-2">
                                                {req.met ? (
                                                    <Check size={16} className="text-emerald-500" aria-hidden="true" />
                                                ) : (
                                                    <X size={16} className="text-muted-foreground/80" aria-hidden="true" />
                                                )}
                                                <span className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}>
                                                    {req.text}
                                                    <span className="sr-only">
                                                        {req.met ? " - Requirement met" : " - Requirement not met"}
                                                    </span>
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>


                            </div>

                            <Button
                                type="submit"
                                className="w-full mt-4"
                                disabled={isLoading}
                            >
                                {isLoading ? <Spline className="mr-2 h-4 w-4 animate-spin " /> : "Register"}
                            </Button>
                        </form>
                        {/* Form End */}

                        <p className="px-8 text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link to="/login" className="underline underline-offset-4 hover:text-primary">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterScreen;
