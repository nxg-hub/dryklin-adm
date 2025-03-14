import { useState } from "react";
import InputField from "../../shared/Inputs/Input.jsx";
import Button from "../../shared/Buttons/Button.jsx";
import Logo from "../../components/Logo/logo.jsx";
import {Checkbox} from "../../components/checkbox.jsx";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // API integration
        console.log({ email, password, rememberMe });
    };

    return (
        <div className="min-h-screen flex flex-col items-center p-6">
            <div className="flex justify-start absolute top-6 left-6">
                <Logo />
            </div>

            <div className="w-full max-w-md mt-20">
                <h2 className="text-3xl font-medium text-[#E85C13] text-center mb-2">Welcome</h2>
                <p className="text-gray-600 text-center mb-8">Input your log in details below</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <InputField
                        id="email"
                        type="email"
                        label="Enter Email Address"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <InputField
                        id="password"
                        type="password"
                        label="Enter Password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Checkbox />
                            {/*<input*/}
                            {/*    id="remember-me"*/}
                            {/*    type="checkbox"*/}
                            {/*    checked={rememberMe}*/}
                            {/*    onChange={(e) => setRememberMe(e.target.checked)}*/}
                            {/*    className="h-4 w-4 text-[#E85C13] focus:ring-[#E85C13] border-gray-300 rounded"*/}
                            {/*    style={{*/}
                            {/*        accentColor: "#E85C13",*/}
                            {/*    }}*/}
                            {/*/>*/}
                            <label htmlFor="remember-me" className="ml-2 block text-gray-600">
                                Remember Me
                            </label>
                        </div>
                        <div className="flex justify-end">
                            <a href="/reset-password" className="text-[#E85C13] hover:underline">
                                Forgotten Password
                            </a>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                    >
                        Log In
                    </Button>
                </form>
            </div>
        </div>
    );
}