import axios from "axios"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import Swal from 'sweetalert2'

export const useAppStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isLoading: false,
            error: null,
            cart: [],
            apiUrl: "https://70c82087c42a8a50.mokky.dev",
            login: async (email, password) => {
                try {
                    set({
                        isLoading: true
                    })
                    const respuesta = await axios.get(`${get().apiUrl}/users?email=${email}&password=${password}`)

                    console.log("respuesta: ", respuesta)

                    if (respuesta?.data?.length > 0) {
                        set({
                            user: respuesta?.data?.[0]
                        })
                    }
                }
                catch (err) {
                    console.log("err: ", err)
                    Swal.fire({
                        title: 'Error',
                        text: "Error al iniciar sesión, verifique sus credenciales",
                        icon: 'error',
                    })
                }
                finally {
                    set({
                        isLoading: false
                    })
                }
            },
            logout: () => {
                set({
                    user: null,
                    token: null,
                    isLoading: false,
                    error: null
                })
            },
            hasRole: (roles) => {
                const currentRole = get().user
                if (currentRole === null) {
                    return false
                }
                if (Array.isArray(roles)) {
                    const hasRole = roles?.includes(currentRole.role)
                    return hasRole
                }
                return currentRole.role === roles
            },
            updateUser: (newDataUser) => set((state) => ({
                user: { ...state.user, ...newDataUser }
            })),
            addToCart: (room) => {
                set((state) => {
                    const existingItem = state.cart.find(item => item.room.id == room.roomId)
                    if (existingItem) {                    
                        Swal.fire({
                            title: "Ya tienes esta habitación en el carrito",
                            icon: "warning",
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true
                        })
                        return {
                            cart: [...state.cart]
                        }
                    }
                    else {
                        Swal.fire({
                            title: "Agregado al carrito",
                            icon: "success",
                            toast: true,
                            position: "top-center",
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true
                        })
                        return {
                            cart: [...state.cart, { room, quantity: 1 }]
                        }
                    }
                })
            },
            updateQuantity: (roomId, newQuantity) => set((state) => ({
                cart: state.cart.map(item =>
                    item.room.id == roomId ?
                        { ...item, quantity: Math.max(1, newQuantity) }
                        :
                        item
                )
            })),
            removeFromCart: (roomId) => set((state) => ({
                cart: state.cart.filter(item => item.room.id !== roomId)
            })),
            clearCart: () => set(
                {
                    cart: []
                }
            )
        }),
        {
            name: "info-profile",
            storage: createJSONStorage(() => localStorage)
        }
    )
)