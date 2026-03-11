import { useAppStore } from "../../store/useAppStore"

const Profile = () => {

    const { user } = useAppStore()

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
                Usuario: {user?.name}
            </h1>
            <h1 className="text-3xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
                Correo: {user?.email}
            </h1>
            <h1 className="text-3xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
                Rol: {user?.role}
            </h1>
            <h1 className="text-3xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
                <img src={user?.avatar} alt="avatar" className="w-24 h-24 rounded-full" />
            </h1>


        </div>
    )
}

export default Profile