import { Loader2, CreditCard, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useAppStore } from "../../store/useAppStore"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const Cart = () => {

    const cambiarPagina = useNavigate()

    const { cart, updateQuantity, removeFromCart, apiUrl, user, clearCart } = useAppStore()

    const [isCheckingOut, setIsCheckingOut] = useState(false)
    const totalAmount = cart.reduce((acc, item) => {
        return acc + (item.room.pricePerNight * item.quantity)
    }, 0)

    const handleCheckout = async () => {
        try {
            setIsCheckingOut(true)

            for (let i = 0; i < cart.length; i++) {
                const jsonReserve = {
                    "userId": user.id,
                    "userEmail": user.email,
                    "roomId": cart?.[i]?.room?.id,
                    "roomCategory": cart?.[i]?.room?.category,
                    "roomImage": cart?.[i]?.room?.images?.[0],
                    "roomStatus": cart?.[i]?.room?.status,                    
                    "totalNights": cart?.[i]?.quantity,
                    "reservationPrice": cart?.[i]?.room?.pricePerNight*cart?.[i]?.quantity,
                    "reservationBeds": cart?.[i]?.room?.bedConfiguration+" "+cart?.[i]?.room?.bedType,
                    "date": new Date().toISOString(),
                }
                const postReserve = await axios.post(`${apiUrl}/reserves`, jsonReserve)
                console.log("reserve: ", postReserve)
                if (postReserve?.status !== 201) {
                    break
                }
                const jsonRoomStatus = {        
                    "status": "Ocupada",                    
                }
                console.log("🔄 Actualizando estado de habitación:", cart?.[i]?.room?.id)
                
                const patchRoomStatus = await axios.patch(`${apiUrl}/rooms/${cart?.[i]?.room?.id}`, jsonRoomStatus)
                if (patchRoomStatus?.status !== 200) {
                    break
                }

            }
            clearCart()
            Swal.fire({
                title: 'Pago exitoso',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            })
            cambiarPagina("/rooms")
        }
        catch (error) {
            console.log("error: ", error)
            Swal.fire({
                title: 'Error',
                text: "Hubo un error al momento de procesar el pago",
                icon: 'error',
            })
        }
        finally {
            setIsCheckingOut(false)
        }
    }

    if (cart.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <div className="bg-white rounded-3xl p-16 shadow-sm border border-slate-200">
                    <ShoppingCart size={80} className="mx-auto text-slate-200 mb-6" />
                    <h2 className="text-3xl font-bold text-slate-800 mb-4">Tu carrito está vacío</h2>
                    <p className="text-slate-500 mb-8">¡Tenemos la habitación ideal para hoy!</p>
                    <Link to="/rooms" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-md">
                        Volver al Catálogo
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2">
                <h1 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <ShoppingCart /> Mi Carrito de reservas
                </h1>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden divide-y divide-slate-100">
                    {cart.map((item) => {
                        const r = item?.room;
                        const mainImg = r?.images?.[0]

                        return (
                            <div key={r.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6">
                                <img src={mainImg} alt={r.category} className="w-24 h-24 object-cover rounded-xl border border-slate-100" />

                                <div className="flex grow text-center sm:text-left">
                                    <h3 className="font-bold text-slate-800 text-lg mb-1">Habitación {r.category}</h3>
                                    <span className="text-slate-700 font-black">&nbsp;&nbsp;&nbsp;S/.{r.pricePerNight}</span>
                                </div>

                                <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                                    <button
                                        onClick={() => updateQuantity(r.id, item.quantity - 1)}
                                        className="p-1 bg-white rounded-md text-slate-600 hover:bg-slate-200 shadow-sm transition"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="w-6 text-center font-bold text-slate-800">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(r.id, item.quantity + 1)}
                                        className="p-1 bg-white rounded-md text-slate-600 hover:bg-slate-200 shadow-sm transition"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <span className="text-slate-400 font-normal text-sm">noche(s)</span>

                                <div className="font-black text-indigo-600 text-lg min-w-20 sm:text-right text-center">
                                    S/. {r.pricePerNight * item.quantity}
                                </div>

                                <button
                                    onClick={() => removeFromCart(r.id)}
                                    className="p-2 text-rose-400 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition"
                                    title="Eliminar del carrito"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="lg:col-span-1">
                <div className="bg-slate-900 rounded-2xl p-6 shadow-xl text-white sticky top-24">
                    <h2 className="text-xl font-bold mb-6 pb-4 border-b border-slate-700">Resumen del Pedido</h2>

                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-slate-300">
                            <span>Subtotal ({cart.length} items)</span>
                            <span>S/.{totalAmount}</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                            <span>Desayuno americano</span>
                            <span className="text-green-400 font-bold">Gratis</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-end mb-8 pt-4 border-t border-slate-700">
                        <span className="text-lg font-bold">Total a Pagar</span>
                        <span className="text-3xl font-black text-indigo-400">S/.{totalAmount}</span>
                    </div>

                    <button
                        onClick={handleCheckout}
                        disabled={isCheckingOut}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/25 flex justify-center items-center gap-2 text-lg cursor-pointer"
                    >
                        {isCheckingOut ? <Loader2 className="animate-spin" /> : <><CreditCard /> Proceder al Pago</>}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cart