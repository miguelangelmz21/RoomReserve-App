import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppStore } from "../store/useAppStore";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate()

    const { login, user, isLoading } = useAppStore();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("el email es: ", email);
        console.log("el password es: ", password);

        await login(email, password);

    }

    useEffect(() => {
        if (user !== null) {
            navigate("/rooms")
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200"
            >

                <div className="space-y-4">

                    <div>
                        <label className="block text-slate-700 font-bold mb-2 text-sm">
                            Correo:
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-slate-700 font-bold mb-2 text-sm">
                            Contraseña:
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-6 bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 px-4 rounded-lg flex justify-center items-center h-12 disabled:bg-slate-400 cursor-pointer"
                >
                    {
                        isLoading ?
                            <Loader2 className="h-5 w-5 text-indigo-700 animate-spin" />
                            :
                            'Ingresar a Room Reserve'
                    }
                </button>
            </form>
        </div>
    )
}

export default Login