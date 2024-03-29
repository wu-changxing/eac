import React, {useState, useEffect} from 'react';
import {HashRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import Login from './components/login';
import Register from './components/register';
import RoomList from './RoomList';
import Room from './Room';
import Logout from './components/Logout';
import Header from './HomePageComponents/Header';
import Footer from './HomePageComponents/Footer';
import {SocketProvider} from './SocketContext';
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import EventsWaterfall from "./EventsWaterfall";
import UserInstructions from "./components/UserInstructions";
import AIChatToggle from "./RoomComponents/AIChatToggle";

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
        <div className="App flex flex-col min-h-screen pt-16 lg:pt-20">
            <Router>
                <SocketProvider>
                    <Header authenticated={authenticated}/>
                    {/*<main className="flex-grow flex flex-col  overflow-auto w-screen">*/}

                    <div className="flex-grow w-screen">
                    <Routes>
                        <Route path="/user-instructions" element={<UserInstructions />} />

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
                            path="/aichat"
                            element={
                                authenticated ? (
                                    <AIChatToggle showIframe={true}/>
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
                            <Route path="/events" element={
                                authenticated ? (
                                        <EventsWaterfall/>)
                                    : (
                                        <Login onLogin={handleLogin}/>
                                    )
                            } />
                        </Routes>
                    </div>
                    <Footer authenticated={authenticated} />

                </SocketProvider>
            </Router>
        </div>
    );
}

export default App;
