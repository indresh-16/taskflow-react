import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("")

    async function handleRegister(e) {
        e.preventDefault();
        if (email === "" && password === "") {
            return setError("Type both credentials");
        }
        if (email === "") {
            return setError("Email is reqired");
        }
        if (password === "") {
            return setError("Password is required");
        }
        setError("");
        const response = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        const data = await response.json();
        setMessage(data.message);
        if (response.ok) {
            setMessage(data.message)
            navigate("/login");
        }
    }

    return <>
        <div>
            <div className="flex h-64 flex-col justify-center">
                <form onSubmit={handleRegister}  className="flex flex-col  gap-1 border-1  items-center">
                    <h1 className="font-semibold">Register Form</h1>
                    <label htmlFor="">Email:
                        <input type="email" name="email" id="" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}  className="border-1 shadow-xl mb-2 ml-8"/>
                    </label>
                    <label>Password:
                        <input type="password" name="password" id="" value={password} onChange={(e) => setPassword(e.target.value)} className="border-1 shadow-xl ml-2 "/>
                    </label>

                    <button type="submit" className="border-1 active:scale-95  mt-5 p-2 ">
                        Register
                    </button>
                    <p>{message}</p>
                    {error && <p>{error}</p>}
                </form>
            </div>

        </div>

    </>
}

