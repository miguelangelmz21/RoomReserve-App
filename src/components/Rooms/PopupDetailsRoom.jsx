import { ShoppingCart, X, ChevronLeft, ChevronRight } from "lucide-react";

const PopupDetailRoom = ({ room, handlePopup, handleRoom, addToCart, handlePrevImage, handleNextImage, currentImageIndex}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-5">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col md:flex-row relative">
            <button
            onClick={() => {
                handlePopup(false);
                handleRoom(null);
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
                {room.bedConfiguration}{" "}
                {room.bedConfiguration > 1 ? "Camas" : "Cama"} {room.bedType}
                </p>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                {room.maxOccupancy}
                </p>
                <h3
                className={`text-2xl text-center font-black mb-2  ${room.status == "Disponible" ? "text-green-500" : room.status == "Limpieza" ? "text-yellow-500" : "text-red-500"}`}
                >
                {room.status}
                </h3>
            </div>
            <button
                onClick={() => addToCart(room)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/30 flex justify-center items-center gap-2 cursor-pointer"
            >
                <ShoppingCart size={20} /> Añadir al Carrito
            </button>
            </div>
        </div>
        </div>
    );
};

export default PopupDetailRoom;
