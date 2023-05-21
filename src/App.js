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
            </Router>
        </div>
    );
}

export default App;
