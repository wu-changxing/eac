import React, {useState, useEffect} from 'react';
import {HashRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import Login from './components/login';
import Register from './components/register';
import RoomList from './RoomList';
import Room from './Room';
import Logout from './components/Logout';
import Header from './components/Header';
import Footer from './components/Footer';
import {SocketProvider} from './SocketContext';
import Profile from "./Profile";
import EditProfile from "./EditProfile";

function App() {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            console.log('token is ' + localStorage.getItem('token'));
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
        <div className="App flex flex-col min-h-screen text-5xl lg:text-lg">
            <Router>
                <SocketProvider>
                    <Header authenticated={authenticated}/>
                    <main className="flex-grow flex flex-col justify-center overflow-auto">
                            <Routes>
                                <Route
                                    path="/login"
                                    element={
                                        authenticated ? (
                                            <RoomList onLogout={handleLogout}/>
                                        ) : (
                                            <Login onLogin={handleLogin}/>
                                        )
                                    }
                                />
                                <Route
                                    path="/register/*"
                                    element={
                                        authenticated ? (
                                            <RoomList onLogout={handleLogout}/>
                                        ) : (
                                            <Register/>
                                        )
                                    }
                                />

                                <Route
                                    path="/roomlists"
                                    element={
                                        authenticated ? (
                                            <RoomList onLogout={handleLogout}/>
                                        ) : (
                                            <Login onLogin={handleLogin}/>
                                        )
                                    }
                                />
                                <Route
                                    path="/eac/:roomId"
                                    element={
                                        authenticated ? (
                                            <Room onLogout={handleLogout}/>
                                        ) : (
                                            <Login onLogin={handleLogin}/>
                                        )
                                    }
                                />
                                <Route
                                    path="/"
                                    element={
                                        authenticated ? (
                                            <RoomList onLogout={handleLogout}/>
                                        ) : (
                                            <Login onLogin={handleLogin}/>
                                        )
                                    }
                                />
                                <Route path="/logout" element={<Logout onLogout={handleLogout}/>}/>
                                <Route path="/profile" element={
                                    authenticated ? (
                                            <Profile/>)
                                        : (
                                            <Login onLogin={handleLogin}/>

                                        )
                                }/>
                                <Route path="/editprofile" element={
                                    authenticated ? (
                                            <EditProfile/>)
                                        : (
                                            <Login onLogin={handleLogin}/>
                                        )
                                }/>
                            </Routes>
                    </main>
                    <Footer/>

                </SocketProvider>
            </Router>
        </div>
    );
}

export default App;
