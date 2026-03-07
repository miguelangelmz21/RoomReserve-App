import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">        
        <div className="min-h-screen bg-[#f5f7fa] flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#1a1a1a] tracking-tight">
            Bienvenido a <br />
            <span className="text-[#003b95]">RoomReserve</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-md">
            Descubre el confort en nuestras instalaciones. Tu habitación ideal
            está a un click.
          </p>
          <Link to="/rooms" className="mt-8 bg-[#003b95] hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-md transition-all shadow-md">
            Explorar Habitaciones
          </Link>          
        </div>
      </div>
    </div>
  );
};

export default Home;
