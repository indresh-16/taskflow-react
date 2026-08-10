import { useState } from "react"

export default function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")
    const [loading,setLoading] =useState(false)
    function handleLogin(e){
        e.preventDefault();
        if(email === "" && password === ""){
            return setError("Type both credentials");
        }
        if(email === ""){
            return setError("Email is reqired");
        }
        if(password === ""){
            return setError("Password is required");
        }
        setError("");
        console.log(email,password)
        setLoading(true)

        fetch("http://localhost:5000/login",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                email:email,
                password:password
            })

        })
        .then(response => response.json())
        .then((data) => {
            console.log(data.message)
        });
    }
    return <>
    <div >
        <div className="flex h-64 flex-col justify-center">
            <form onSubmit={handleLogin} className="flex flex-col  gap-1 border-1"><h1>Login</h1>
                <label htmlFor="">Email:<input type="email" placeholder="email" value={email} onChange={(e) => {setEmail(e.target.value);setError("")}}/></label>
                <label htmlFor="">Password:<input type="password" placeholder="password" value={password} onChange={(e) => {setPassword(e.target.value);setError("")}}/></label>
                {error && <p>{error}</p>}
                <button type="submit" className="border-1 active:scale-95">Login</button> 
            </form>
        {loading && <p>{loading}</p>}
            
        </div>

       
    </div>
    
    </>
}