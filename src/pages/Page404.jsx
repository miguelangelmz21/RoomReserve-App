import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
        404
      </h1>
      <p class="text-2xl font-semibold text-slate-600">
        ¡Página no encontrada!
      </p>
      <p class="text-lg text-slate-600 mx-auto mt-4">
         Página no disponible. Por favor, verifica la URL o vuelve al inicio.
      </p>
      <Link
        to="/"
        className="mt-8 bg-[#003b95] hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-md transition-all shadow-md"
      >
        Volver al Inicio
      </Link>
    </div>
  );
};

export default Page404;
