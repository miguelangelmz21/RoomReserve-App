import { Minus, Plus, Trash2 } from "lucide-react"

const RoomCart = ({ item, updateQuantity, removeFromCart }) => {
    return (
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6">
            <img src={item?.room?.images?.[0]} alt={item?.room.category} className="w-24 h-24 object-cover rounded-xl border border-slate-100" />

            <div className="flex grow text-center sm:text-left">
                <h3 className="font-bold text-slate-800 text-lg mb-1">Habitación {item?.room.category}</h3>
                <span className="text-slate-700 font-black">&nbsp;&nbsp;&nbsp;S/.{item?.room.pricePerNight}</span>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                <button
                    onClick={() => updateQuantity(item?.room.id, item.quantity - 1)}
                    className="p-1 bg-white rounded-md text-slate-600 hover:bg-slate-200 shadow-sm transition"
                >
                    <Minus size={16} />
                </button>
                <span className="w-6 text-center font-bold text-slate-800">{item?.quantity}</span>
                <button
                    onClick={() => updateQuantity(item?.room.id, item?.quantity + 1)}
                    className="p-1 bg-white rounded-md text-slate-600 hover:bg-slate-200 shadow-sm transition"
                >
                    <Plus size={16} />
                </button>
            </div>
            <span className="text-slate-400 font-normal text-sm">noche(s)</span>

            <div className="font-black text-indigo-600 text-lg min-w-20 sm:text-right text-center">
                S/. {item?.room.pricePerNight * item?.quantity}
            </div>

            <button
                onClick={() => removeFromCart(item?.room.id)}
                className="p-2 text-rose-400 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition"
                title="Eliminar del carrito"
            >
                <Trash2 size={20} />
            </button>
        </div>
    )
}

export default RoomCart