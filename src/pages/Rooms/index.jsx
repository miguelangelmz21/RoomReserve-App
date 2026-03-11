import axios from "axios"
import { Loader2, Eye, ShoppingCart, X, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { useAppStore } from "../../store/useAppStore"
import Swal from "sweetalert2"

const Rooms = () => {
    const { addToCart, cart, apiUrl, hasRole } = useAppStore()
    console.log("Desde Rooms el contenido de cart: ", cart)
    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [room, setRoom] = useState(null)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    useEffect(() => {

        const fetchrooms = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`${apiUrl}/rooms`)    
                console.log(response)            
                if(hasRole("admin")){
                    setRooms(response.data)
                }else{
                    setRooms(response.data.filter((item)=>item.status!="Ocupada"))
                }
            }
            catch (err) {
                console.log("err: ", err)
            }
            finally {
                setLoading(false)
            }
        }

        fetchrooms()

    }, [apiUrl, hasRole])

    const handlePopup = (active) => {
        setShow(active)
    }

    const handleRoom = (roomOnly) => {
        setRoom(roomOnly)
        setCurrentImageIndex(0)
    }

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) => 
            prev === 0 ? room.images.length - 1 : prev - 1
        )
    }

    const handleNextImage = () => {
        setCurrentImageIndex((prev) => 
            prev === room.images.length - 1 ? 0 : prev + 1
        )
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <Loader2 className="h-20 w-20 text-indigo-600 animate-spin" />
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-start w-full p-5 relative z-10">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                Catálogo de habitaciones 
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {
                    rooms.map((item, index) => {
                        return (
                            <div key={index} className="bg-white shadow-lg rounded-lg max-w-75 h-112 overflow-hidden pb-3">
                                <div className="relative">
                                    <img
                                        src={item.images[0]}
                                        alt="room"
                                        className="w-full h-75 object-cover"
                                    />
                                    <button
                                        className={`absolute top-2 right-2 w-8 h-8 rounded-full font-bold text-white text-xs flex items-center justify-center cursor-pointer ${
                                            item.status === "Disponible"
                                                ? "bg-green-500"
                                                : item.status === "Limpieza"? "bg-yellow-500" :"bg-red-500"
                                        }`}
                                        title={item.status}
                                    >
                                    </button>
                                </div>
                                <div className="p-3">
                                    <div className="flex justify-start gap-5 items-center">
                                        <h1 className="truncate font-bold">{item.category}</h1>
                                        <span className="text-indigo-500 font-extrabold">S/.{item.pricePerNight}</span>
                                    </div>
                                    <p className="line-clamp-2">{item.bedConfiguration} {(item.bedConfiguration>1)?"Camas":"Cama"} {item.bedType}</p>
                                </div>

                                <div className="flex justify-between items-center gap-3 px-3">
                                    <button
                                        className="text-white bg-indigo-800 flex gap-2 items-center justify-center px-4 py-2 rounded-md font-sbold w-full hover:bg-blue-700 cursor-pointer"
                                        onClick={() => {
                                            handlePopup(true)
                                            handleRoom(item)
                                        }}
                                    >
                                        <Eye
                                            className="text-white -mt-[0.05rem]"
                                            size={20}
                                        /> Detalles
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (item.status !== "Disponible") {
                                                Swal.fire({
                                                    title: 'No disponible',
                                                    text: `Esta habitación no se puede agregar (${item.status})`,
                                                    icon: 'warning',
                                                    showConfirmButton: false,
                                                    timer: 1500
                                                })
                                            } else if (cart.some(cartItem => cartItem.room.id === item.id)) {
                                                Swal.fire({
                                                    title: 'Ya esta en el carrito',
                                                    text: 'Esta habitación ya está en tu carrito',
                                                    icon: 'info',
                                                    showConfirmButton: false,
                                                    timer: 1500
                                                })
                                            } else {
                                                addToCart(item)
                                            }
                                        }}
                                        className="text-white bg-indigo-800 flex gap-2 items-center justify-center px-4 py-2 rounded-md font-sbold w-full hover:bg-blue-700 cursor-pointer"
                                    >
                                        <ShoppingCart
                                            className="text-white -mt-[0.20rem]"
                                            size={20}
                                        /> Añadir
                                    </button>
                                </div>

                            </div>
                        )                            
                    })
                }
            </div>

            {
                show &&
                <div className="fixed inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-5">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col md:flex-row relative">

                        <button
                            onClick={() => {
                                handlePopup(false)
                                handleRoom(null)
                            }}
                            className="text-slate-700 rounded-full p-2 cursor-pointer absolute top-2 right-2"
                        >
                            <X />
                        </button>

                        <div className="md:w-1/2 bg-slate-100 relative flex items-center justify-center">
                            <button
                                onClick={handlePrevImage}
                                className="absolute left-2 z-10 bg-indigo-600 hover:bg-indigo-700 rounded-full p-2 transition cursor-pointer"
                            >
                                <ChevronLeft size={24} className="text-slate-900" />
                            </button>
                            <img
                                src={room?.images[currentImageIndex]}
                                alt="room"
                                className="w-full h-64 md:h-full object-cover"
                            />
                            <button
                                onClick={handleNextImage}
                                className="absolute right-2 z-10 bg-indigo-600 hover:bg-indigo-700 rounded-full p-2 transition cursor-pointer"
                            >
                                <ChevronRight size={24} className="text-slate-900" />
                            </button>
                            <span className="absolute bottom-2 right-2 bg-slate-900/70 text-white text-xs px-2 py-1 rounded">
                                {currentImageIndex + 1} / {room?.images.length}
                            </span>
                        </div>

                        <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-center">
                                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md mb-3 inline-block">
                                        Habitación {room.category}
                                    </span>
                                </div>
                                <div className="text-3xl text-center font-black text-slate-800 mb-4 border-b pb-4">
                                    S/. {room.pricePerNight}
                                </div>
                                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                                    {room.bedConfiguration} {(room.bedConfiguration>1)?"Camas":"Cama"} {room.bedType}
                                </p>
                                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                                    {room.maxOccupancy}
                                </p>
                                <h3 className={`text-2xl text-center font-black mb-2  ${room.status == "Disponible"? "text-green-500" : room.status == "Limpieza"? "text-yellow-500" : "text-red-500"}`}>{room.status}</h3>
                            </div>


                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

export default Rooms

