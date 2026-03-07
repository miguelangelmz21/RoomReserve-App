import { LogOut, ShoppingBag, ShoppingCart } from "lucide-react"
import { useAppStore } from "../../store/useAppStore"
import { Link } from "react-router-dom"
import logo from "../../assets/vite.svg"

const Navbar = () => {
    const { user, logout, hasRole, cart, clearCart } = useAppStore()

    return (
        <>
            <div className="sticky top-0 w-full h-16 bg-[#003b95] flex justify-between items-center px-2 z-50">
                <div className="flex items-center gap-4">
                    <div className="flex justify-center items-center gap-2">                        
                        <Link to="/" className="flex items-center gap-2">
                            <img src={logo} alt="RoomReserve Logo" className="bg-white rounded-lg w-8 h-8 p-1" />
                            <h2 className="text-white font-extrabold text-lg">RoomReserve</h2>
                        </Link>
                    </div>
                    <div>
                        <Link to="/rooms" className="border-indigo-300 border-2 bg-white hover:bg-indigo-600 text-indigo-700 hover:text-white font-bold py-2 px-4 rounded-lg text-xs cursor-pointer">
                            Habitaciones
                        </Link>
                    </div>
                    <div>
                        <Link to="/reserves" className="border-indigo-300 border-2 bg-white hover:bg-indigo-600 text-indigo-700 hover:text-white font-bold py-2 px-4 rounded-lg text-xs cursor-pointer">
                            Mis Reservas
                        </Link>
                    </div>

                    {
                        hasRole(["admin", "editor", "manager", "finance", "RRHH"]) &&
                        <div>
                            <Link to="/panel-admin" className="border-2 bg-indigo-700 hover:bg-indigo-100 text-white hover:text-indigo-500 font-bold py-2 px-4 rounded-lg text-xs cursor-pointer">
                                Admin Panel 
                            </Link>
                        </div>
                    }
                </div>
                {
                    user !== null ?
                        <div className="mr-2 flex items-center gap-6">

                            <Link
                                to="/cart"
                                className="relative"
                            >
                                <ShoppingCart
                                    className="text-indigo-100 hover:text-indigo-400 cursor-pointer"
                                    size={25}
                                />
                                {
                                    cart.length > 0 &&
                                    <span className="absolute -top-2 -right-2 text-xs text-white rounded-full bg-red-500 w-4 flex justify-center items-center">
                                        {cart.length}
                                    </span>
                                }
                            </Link>

                            <div>
                                <h2 className="text-lg text-white text-right">{user?.name}</h2>
                                <h3 className="text-xs text-gray-300 text-right">{user?.role}</h3>
                            </div>

                            <LogOut
                                onClick={() => {
                                    logout()
                                    clearCart()
                                }}
                                className="w-10 h-10 text-slate-600 hover:text-slate-400 cursor-pointer bg-slate-800 p-2 rounded-md"
                            />
                        </div>
                        :
                        <Link
                            to="/login"
                            className="bg-indigo-600 border-2 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg text-xs cursor-pointer"
                        >
                            Iniciar Sesión
                        </Link>
                }                
            </div>
        </>
    )
}

export default Navbar