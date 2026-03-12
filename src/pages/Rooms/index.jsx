import axios from "axios"
import { Loader2} from "lucide-react"
import { useEffect, useState } from "react"
import { useAppStore } from "../../store/useAppStore"
import Room from "../../components/Rooms/Room"
import PopupDetailsRoom from "../../components/Rooms/PopupDetailsRoom"

const Rooms = () => {
    const { addToCart, apiUrl, hasRole } = useAppStore()
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
                            <Room
                                key={index}
                                item={item}
                                handlePopup={handlePopup}
                                handleRoom={handleRoom}
                                addToCart={addToCart}
                            />
                        )                            
                    })
                }
            </div>

            {
                show &&
                <PopupDetailsRoom
                    {...{
                        room,
                        handlePopup,
                        handleRoom,
                        addToCart,
                        handleNextImage,
                        handlePrevImage,
                        currentImageIndex
                    }}
                />
            }

        </div>
    )
}

export default Rooms

