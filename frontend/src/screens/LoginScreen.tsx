import * as React from "react";
import { Link } from "react-router-dom"; // Use Link for navigation
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spline } from "lucide-react";
import intorImg from '@/assets/introImg.jpg'





const LoginScreen = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }



    return (
        <div className="h-screen bg-slate-100">

            <div className="container relative  h-screen flex-col items-center justify-center grid md:max-w-none lg:grid-cols-2 lg:px-0  ">



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
                                Welcome , the place where your ideas take flight. Create inspiring content, share your stories with the world, and connect with like-minded readers. Whether you're an aspiring writer or an experienced blogger, your journey starts here. Ready to make your mark?
                            </p>
                            <footer className="text-sm">Srived Kakde</footer>
                        </blockquote>
                    </div>
                </div>


                <div className="lg:p-8 ">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-left mb-4 ">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Login
                            </h1>

                        </div>
                        {/* Form Start */}
                        <form onSubmit={onSubmit}>
                            <div className="grid gap-6">
                                <div className="grid gap-1 space-y-2">
                                    <Label htmlFor="input-02">
                                        Email   <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="email"
                                        placeholder="name@example.com"
                                        type="email"
                                        autoCapitalize="none"
                                        autoComplete="email"
                                        autoCorrect="off"
                                        disabled={isLoading}
                                        required
                                    />
                                </div>
                                <div className="grid gap-1 space-y-2">
                                    <Label htmlFor="input-02">
                                        Password  <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="email"
                                        placeholder="name@example.com"
                                        type="email"
                                        autoCapitalize="none"
                                        autoComplete="email"
                                        autoCorrect="off"
                                        disabled={isLoading}
                                        required
                                    />
                                </div>

                                <div>




                                    <div className="flex flex-col gap-3">

                                        <Button disabled={isLoading}>
                                            {isLoading && (
                                                <Spline className="mr-2 h-4 w-4 animate-spin" />
                                            )}
                                            Submit
                                        </Button>
                                        <Button disabled={isLoading}>
                                            {isLoading && (
                                                <Spline className="mr-2 h-4 w-4 animate-spin" />
                                            )}
                                            Test User
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>


                        <p className="px-8 text-center text-sm text-muted-foreground">

                            <Link to="/register" >
                                {"Don't have an account? Sign Up"}
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
