import { Link } from "react-router-dom"

const ContactUs = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
                Acerca de RoomReserve
            </h1>
            <p className="text-2xl text-slate-600 mb-8 max-w-2xl mx-auto text-justify">
                <span className="font-bold text-slate-900">RoomReserve</span> nace para que la gestión de nuestro hotel sea tan acogedora como nuestras habitaciones. Diseñamos esta plataforma para conectar directamente con nuestros huéspedes, ofreciendo una reserva rápida y segura. Aquí, cada detalle cuenta para que tu única preocupación sea disfrutar de tu estancia
            </p>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                Para más información, escribenos al +51987654321
            </p>
            <Link
                to="/"
                className="mt-8 bg-[#003b95] hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-md transition-all shadow-md"
            >
                Volver a la tienda
            </Link>
        </div>
    )
}

export default ContactUs