import { Loader2, CreditCard, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useAppStore } from "../../store/useAppStore"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import RoomCart from "../../components/Cart/RoomCart";
import PaymentDetail from "../../components/Cart/PaymentDetail";

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
                    "checkOut": "No",                    
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
                        return (
                            <RoomCart
                                key={item?.room.id}
                                {...{
                                    item,
                                    updateQuantity,
                                    removeFromCart
                                }}
                            />
                        );
                    })}
                </div>
            </div>
            <PaymentDetail
                {...{
                    cart,
                    totalAmount,
                    handleCheckout,
                    isCheckingOut
                }}
            />
        </div>
    )
}

export default Cart