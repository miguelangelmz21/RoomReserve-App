import { Box, Button, Modal } from "@mui/material"
import axios from "axios";
import { Activity, Eye, Save, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useAppStore } from "../../store/useAppStore";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    bgcolor: "background.paper",
    // border: '1px solid #000',
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
};

const Room = ({ item, handlePopup, handleRoom, addToCart }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
        category: item?.category,
        bedConfiguration: item?.bedConfiguration,
        bedType: item?.bedType,
        pricePerNight: item?.pricePerNight,
        images: item?.images[0],
        maxOccupancy: item?.maxOccupancy,
        },
    });

    const [loading, setLoading] = useState(false);
    const { hasRole, apiUrl, cart } = useAppStore();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onSubmit = async (data) => {
        console.log("data: ", data);
        const objData = {
            category: data?.category,
            bedConfiguration: data?.bedConfiguration,
            bedType: data?.bedType,
            pricePerNight: Number(data?.pricePerNight),
            images: [...item.images, data?.image],
            maxOccupancy: data?.maxOccupancy,
        };

        try {
            setLoading(true);
            const res = await axios.patch(`${apiUrl}/rooms/${item?.id}`, objData);
            console.log("res: ", res);
            if (res?.status === 200) {
                Swal.fire({
                    title: "Producto actualizado con éxito",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                });
                setTimeout(() => {
                    handleClose();
                    reset();
                    window.location.reload();
                }, 1000);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
    <div className="bg-white shadow-lg rounded-lg max-w-75 h-112 overflow-hidden pb-3">
        <div className="relative">
        <img
            src={item?.images[0]}
            alt="room"
            className="w-full h-75 object-cover"
        />
        <button
            className={`absolute top-2 right-2 w-8 h-8 rounded-full font-bold text-white text-xs flex items-center justify-center cursor-pointer ${
            item?.status === "Disponible"
                ? "bg-green-500"
                : item?.status === "Limpieza"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
            title={item?.status}
        ></button>
        </div>
        <div className="p-3">
        <div className="flex justify-start gap-5 items-center">
            <h1 className="truncate font-bold">{item?.category}</h1>
            <span className="text-indigo-500 font-extrabold">
            S/.{item?.pricePerNight}
            </span>
        </div>
        <p className="line-clamp-2">
            {item?.bedConfiguration}{" "}
            {item?.bedConfiguration > 1 ? "Camas" : "Cama"} {item?.bedType}
        </p>
        </div>
        {/* <div className="flex justify-between items-center gap-3 px-3">
                <button
                    className="text-white bg-indigo-800 flex gap-2 items-center justify-center px-4 py-2 rounded-md font-sbold w-full hover:bg-blue-700 cursor-pointer"
                    onClick={() => { */}
        <div className="flex flex-col gap-1 px-3">
            <div
            className={`grid ${hasRole(["admin"]) ? "grid-cols-3" : "grid-cols-2"} items-center gap-1`}
            >
            <button
                className="text-white bg-slate-900 flex gap-1 items-center justify-center px-4 py-2 rounded-md font-bold w-full hover:bg-slate-950 cursor-pointer h-9"
                onClick={() => {
                handlePopup(true);
                handleRoom(item);
                }}
            >
                <Eye className="text-white -mt-[0.05rem]" size={20} /> Detalles
            </button>
            <button
                onClick={() => {
                if (item.status !== "Disponible") {
                    Swal.fire({
                    title: "No disponible",
                    text: `Esta habitación no se puede agregar (${item.status})`,
                    icon: "warning",
                    showConfirmButton: false,
                    timer: 1500,
                    });
                } else if (
                    cart.some((cartItem) => cartItem.room.id === item.id)
                ) {
                    Swal.fire({
                    title: "Ya esta en el carrito",
                    text: "Esta habitación ya está en tu carrito",
                    icon: "info",
                    showConfirmButton: false,
                    timer: 1500,
                    });
                } else {
                    addToCart(item);
                }
                }}
                className="text-white bg-indigo-800 flex gap-2 items-center justify-center px-4 py-2 rounded-md font-sbold w-full hover:bg-blue-700 cursor-pointer"
            >
                <ShoppingCart className="text-white -mt-[0.20rem]" size={20} />{" "}
                Añadir
            </button>
            {hasRole(["admin"]) && (
                <Button onClick={handleOpen} variant="outlined" color="warning">
                Editar
                </Button>
            )}
            </div>
        </div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden relative">
                <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
                    <h2 className="text-xl font-bold text-slate-800">
                    Editar Información
                    </h2>
                    <button
                    onClick={handleClose}
                    className="text-slate-400 hover:text-slate-800 bg-white p-1.5 rounded-full shadow-sm border border-slate-200"
                    >
                    <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                    <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                        Categoria de la Habitación
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none"
                        {...register("category", {
                        required: {
                            value: true,
                            message: "La categoria de la habitación  es requerido",
                        },
                        minLength: {
                            value: 3,
                            message:
                            "El nombre de la categoria debe tener al menos 3 caracteres",
                        },
                        })}
                    />
                    {errors.category && (
                        <span className="text-red-500 text-xs font-bold">
                        {errors.category.message}
                        </span>
                    )}
                    </div>

                    <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                        Cantidad de camas
                    </label>
                    <input
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                        {...register("bedConfiguration", {
                        required: {
                            value: true,
                            message: "La cantidad de camas es requerido",
                        },
                        type: "number",
                        min: {
                            value: 1,
                            message: "La cantidad de camas debe ser mayor a 0",
                        },
                        })}
                    />
                    {errors.bedConfiguration && (
                        <span className="text-red-500 text-xs font-bold">
                        {errors.bedConfiguration.message}
                        </span>
                    )}                    
                    </div>

                    <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                        Tipo de cama
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none"
                        {...register("bedType", {
                        required: {
                            value: true,
                            message: "El tipo de cama es requerido",
                        },
                        minLength: {
                            value: 3,
                            message:
                            "El nombre del tipo de cama debe tener al menos 3 caracteres",
                        },
                        })}
                    />
                    {errors.bedType && (
                        <span className="text-red-500 text-xs font-bold">
                        {errors.bedType.message}
                        </span>
                    )}                    
                    </div>

                    <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                        Precio por noche
                    </label>
                    <input
                        // type="number"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                        {...register("pricePerNight", {
                        required: {
                            value: true,
                            message: "El precio es requerido",
                        },
                        type: "number",
                        min: {
                            value: 1,
                            message: "El precio debe ser mayor a 0",
                        },
                        })}
                    />
                    {errors.pricePerNight && (
                        <span className="text-red-500 text-xs font-bold">
                        {errors.pricePerNight.message}
                        </span>
                    )}
                    </div>

                    <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                        URL de Foto de la habitación
                    </label>
                    <input
                        type="text"
                        placeholder="link de imagen"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-sm"
                        {...register("images", {
                        required: {
                            value: true,
                            message: "La url de la imagen es requerida",
                        },
                        })}
                    />
                    {errors.images && (
                        <span className="text-red-500 text-xs font-bold">
                        {errors.images.message}
                        </span>
                    )}
                    </div>

                    <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                        Descripción de ocupantes permitidos
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                        {...register("maxOccupancy", {
                        required: {
                            value: true,
                            message: "La Descripción de ocupantes es requerida",
                        },
                        })}
                    />
                    {errors.maxOccupancy && (
                        <span className="text-red-500 text-xs font-bold">
                        {errors.maxOccupancy.message}
                        </span>
                    )}
                    </div>

                    <div className="pt-4 flex gap-3">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="w-1/2 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-1/2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white font-bold py-3 rounded-xl transition-all shadow-md flex justify-center items-center gap-2"
                    >
                        {loading ? (
                        <Activity className="animate-spin" size={20} />
                        ) : (
                        <>
                            <Save size={20} /> Guardar Cambios
                        </>
                        )}
                    </button>
                    </div>
                </form>
                </div>
            </div>
            </Box>
        </Modal>
    </div>
    );
};

export default Room;
