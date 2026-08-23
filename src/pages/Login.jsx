import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ setIsLoggedIn }) {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();

        if (email === "" && password === "") {
            return setError("Type both credentials");
        }

        if (email === "") {
            return setError("Email is required");
        }

        if (password === "") {
            return setError("Password is required");
        }

        setError("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            console.log("LOGIN RESPONSE:", data);

            if (!response.ok) {
                setError(data.message);
                return;
            }

            // ⭐ SAVE JWT
            if (response.ok) {

                localStorage.setItem("token", data.token);

                console.log(
                    "JWT SAVED:",
                    localStorage.getItem("token")
                );

                setIsLoggedIn(true);

                navigate("/");
            }

        } catch (error) {
            console.log("LOGIN ERROR:", error);
            setError("Unable to connect to server");

        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="flex h-64 flex-col justify-center">

                <form
                    onSubmit={handleLogin}
                    className="flex flex-col gap-2 border-1 p-4"
                >

                    <h1>Login</h1>

                    <label>
                        Email:
                        <input
                            type="email"
                            placeholder="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError("");
                            }}
                        />
                    </label>

                    <label>
                        Password:
                        <input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError("");
                            }}
                        />
                    </label>

                    {error && <p>{error}</p>}

                    <button
                        type="submit"
                        className="border-1 active:scale-95"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <p>
                        Don't have an account?
                        <Link to="/register"> Register</Link>
                    </p>

                </form>

            </div>
        </div>
    );
}