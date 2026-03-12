import axios from "axios"
import { useAppStore } from "../store/useAppStore"
import Swal from "sweetalert2"


const TableGeneral = ({ data, tableType }) => {
    const { apiUrl, hasRole } = useAppStore()
    const handledCheckOut = async(item)=>{
        try {
            let jsonCheckOut = {}
            let jsonRoomStatus = {}
            let endpointCheckOut = ""
            let endpointRoomStatus = ""
            
            if (item?.checkOut === "No") {                
                jsonCheckOut = { checkOut: "Si" }
                endpointCheckOut = `${apiUrl}/reserves/${item.id}`            
                jsonRoomStatus = { status: "Disponible" }
                endpointRoomStatus = `${apiUrl}/rooms/${item.roomId}`
            }
            
            const response1 = await axios.patch(endpointCheckOut, jsonCheckOut)
            console.log(response1)
            const response2 = await axios.patch(endpointRoomStatus, jsonRoomStatus)
            console.log(response2)
            
            
            Swal.fire({
                title: 'Check Out registrado; habitación Disponible',
                icon: 'success',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
            })
            
            setTimeout(() => {
                window.location.reload()
            }, 1500)
        } catch (error) {
            console.log("Error:", error)
            Swal.fire({
                title: 'Error',
                text: 'No se pudo procesar el Check Out',
                icon: 'error'
            })
        }
    }
    return (
        <table className="w-full border-collapse text-left">
            <thead>
                <tr className={`border-b border-slate-500 text-slate-600 ${tableType === "panelAdmin" && "bg-slate-900 text-white"}`}>
                    {
                        tableType === "panelAdmin" &&
                        <th className="p-4 font-bold tetx-sm text-left">Cliente(Email)</th>
                    }
                    <th className="p-4 font-bold tetx-sm">Habitación</th>
                    <th className="p-4 font-bold tetx-sm">Fecha de Transacción</th>
                    <th className="p-4 font-bold tetx-sm text-right">Monto Total</th>
                    <th className="p-4 font-bold tetx-sm text-right">Noches Reservadas</th>
                    <th className="p-4 font-bold tetx-sm text-right">Estado</th>
                </tr>
            </thead>
            <tbody>
                {
                    data?.map((item, index) => {
                        return (
                            <tr key={index} className="border-b border-salte-100 hover:bg-slate-50">
                                {
                                    tableType === "panelAdmin" &&
                                    <td className="p-4 font-bold text-indigo-600 text-sm text-left">{item?.userEmail}</td>
                                }
                                <td className="p-4 flex items-center gap-4">
                                    <div>
                                        <img src={item.roomImage} alt="room" className="w-12 h-12 object-cover rounded-xs" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div>
                                            {item.roomCategory}&nbsp;/&nbsp;{item.reservationBeds}
                                        </div>
                                        <div className="text-xs text-slate-500">
                                            Order #{item.id}
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-slate-500">{new Date(item?.date).toLocaleString()}</td>
                                <td className="p-4 font-black text-indigo-600 text-right">S/. {item?.reservationPrice}</td>
                                <td className="p-4 font-black text-indigo-600 text-right">{item?.totalNights}&nbsp;&nbsp;noche(s)</td>
                                <td className="p-4 font-black text-indigo-600 text-right">
                                    <button 
                                        onClick={() => {
                                            if (item?.checkOut === "Si") {
                                                Swal.fire({
                                                    title: 'Reserva completada',
                                                    text: 'Esta reserva ya tiene CheckOut registrado',
                                                    icon: 'info',
                                                    showConfirmButton: false,
                                                    timer: 1500
                                                })
                                                return
                                            }
                                            if (!hasRole(["admin"])) {
                                                Swal.fire({
                                                    title: 'Acceso denegado',
                                                    text: 'Solo los administradores pueden realizar esta acción',
                                                    icon: 'warning',
                                                    showConfirmButton: false,
                                                    timer: 1500
                                                })
                                                return
                                            }
                                            handledCheckOut(item)
                                        }}
                                        disabled={item?.checkOut === "Si" || !hasRole(["admin"])}
                                        className={`font-bold px-3 py-1 rounded ${
                                            item?.checkOut === "Si"
                                                ? "bg-slate-200 text-red-500 cursor-not-allowed opacity-60"
                                                : hasRole(["admin"])
                                                    ? "bg-indigo-600 text-green-400 hover:bg-indigo-700 cursor-pointer" 
                                                    : "bg-slate-200 text-green-500 cursor-not-allowed opacity-60"
                                        }`}
                                    >
                                        {item?.checkOut !== "No" ? "Check Out" : "Check In"}
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default TableGeneral