import Home from "../components/Home"
import { HashRouter, Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import Login from "../components/Login"
import { useAppStore } from "../store/useAppStore"
import Rooms from "../components/Rooms"
import Page404 from "../components/Page404"
import Profile from "../components/Profile"
import Navbar from "../components/layout/Navbar"
import AdminPanel from "../components/AdminPanel/adminPanel"
import Unauthorized from "../components/Unauthorized"
import Cart from "../components/Cart"
import MyPurchases from "../components/MyPurchases/page"

const AppRouter = () => {
    const { user, hasRole } = useAppStore()

    return (
        <BrowserRouter>
            <Navbar />
            <main>
                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/profile"
                        element={<Profile />}
                    />

                    <Route
                        path="/rooms"
                        element={
                            user === null ?
                                <Navigate to="/login" />
                                :
                                <Rooms />
                        }
                    />

                    <Route
                        path="/reserves"
                        element={
                            user === null ?
                                <Navigate to="/login" />
                                :
                                <MyPurchases />
                        }
                    />

                    <Route
                        path="/panel-admin"
                        element={
                            user === null ?
                                <Navigate to="/login" />
                                :
                                hasRole(["admin", "editor", "manager", "finance", "RRHH"]) ?
                                    <AdminPanel />
                                    :
                                    <Unauthorized />
                        }
                    />

                    <Route
                        path="/cart"
                        element={
                            user === null ?
                                <Navigate to="/login" />
                                :
                                <Cart />
                        }
                    />

                    <Route
                        path="*"
                        element={<Page404 />}
                    />

                </Routes>
            </main>
        </BrowserRouter>
    )
}

export default AppRouter