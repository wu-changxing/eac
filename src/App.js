import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom';
import './App.css';
import Login from './components/login';
import Register from './components/register';
import RoomList from "./RoomList";
import Room from "./Room";
import Logout from "./components/Logout";
import Header from "./components/Header";
import Footer from "./components/Footer";
function App() {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {

        if (localStorage.getItem('token')) {
            console.log("token is " + localStorage.getItem('token'))
            setAuthenticated(true);
        }
    }, []);

    const handleLogin = () => {
        setAuthenticated(true);
    };

    const handleLogout = () => {
        setAuthenticated(false);
    };

    return (
        <div className="App">
            <Router>
                <div className="flex flex-col min-h-screen">
                    <Header/>
                    <main className="flex-1 flex items-center justify-center">

                    <Routes>
                    <Route
                        path="/login"
                        element={authenticated
                            ? <Navigate to="/roomlists"/>
                            : <Login onLogin={handleLogin}/>}
                    />
                    <Route
                        path="/register"
                        element={authenticated
                            ? <Navigate to="/roomlists"/>
                            : <Register/>}
                    />
                    <Route
                        path="/roomlists"
                        element={authenticated
                            ? <RoomList onLogout={handleLogout}/>
                            : <Navigate to="/login"/>}
                    />
                    <Route path="/eac/:roomId" element={
                        authenticated
                        ?<Room onLogout={handleLogout}/>
                         : <Navigate to="/login"/>}
                    />
                    <Route path="/" element={<Navigate to="/roomlists"/>}/>
                    <Route path="/logout" element={<Logout onLogout={handleLogout}/>}/>
                </Routes>
                    </main>
                    <Footer/>
                </div>
            </Router>

        </div>
    );
}

export default App;
