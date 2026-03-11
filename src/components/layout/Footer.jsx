import { Link } from "react-router-dom"

const Footer = () => {

    return (
        <>
            <div className="w-full h-22 bg-[#003b95] flex justify-center items-center px-2 py-2 z-10">
                <div className="flex flex-col items-center gap-4">
                    <div className="flex flex-row items-center gap-4">
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
                        <div>
                            <Link to="/roomReserve" className="border-indigo-300 border-2 bg-white hover:bg-indigo-600 text-indigo-700 hover:text-white font-bold py-2 px-4 rounded-lg text-xs cursor-pointer">
                                Contactanos
                            </Link>
                        </div>                        
                    </div>
                    <div className="text-white text-xs">
                        Copyright © 2026 RoomReserve 
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer