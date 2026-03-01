import { Link } from "react-router-dom"

const Navbar = () => {

    return (
        <>
            <div className="sticky top-0 w-full h-16 bg-[#003b95] flex justify-between items-center px-2 z-50">
                <div className="flex items-center gap-4">
                    <div className="flex justify-center items-center gap-2">                        
                        <Link to="/">
                            <h2 className="text-white font-extrabold text-lg">RoomReserve</h2>
                        </Link>
                    </div>
                </div>

                
            </div>
        </>
    )
}

export default Navbar