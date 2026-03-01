import Home from "../components/Home"
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import Navbar from "../components/layout/Navbar"

const AppRouter = () => {

    return (
        <BrowserRouter>
            <Navbar />
            <main>
                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />

                </Routes>
            </main>
        </BrowserRouter>
    )
}

export default AppRouter