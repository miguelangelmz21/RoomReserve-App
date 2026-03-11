import { HashRouter, Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import { useAppStore } from "../store/useAppStore"
import Cart from "../pages/Cart"
import Login from "../pages/Login"
import Home from "../pages/Home"
import Profile from "../pages/Profile"
import Rooms from "../pages/Rooms"
import MyPurchases from "../pages/MyPurchases"
import Unauthorized from "../pages/Unauthorized"
import PanelAdmin from "../pages/panelAdmin"
import Page404 from "../pages/Page404"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import ContactUs from "../pages/ContactUs"

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
                        element={
                            user === null ?
                                <Navigate to="/login" />
                                :
                                <Profile />
                        }
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
                                    <PanelAdmin />
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
                        path="/roomReserve"
                        element={<ContactUs />}
                    />
                    <Route
                        path="*"
                        element={<Page404 />}
                    />

                </Routes>
            </main>
            <Footer/>
        </BrowserRouter>
    )
}

export default AppRouter