import React, {useState, useEffect} from "react";
import {AddToCalendarButton} from 'add-to-calendar-button-react';
import EventEdit from './EventEdit';
import {FaEdit, FaTrash} from 'react-icons/fa';
import {GiLoveMystery} from 'react-icons/gi';
import axios from 'axios';
import config from "../config";
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const defaultEventData = {
    "name": "提醒：EAC",
    "startDate": tomorrow.toISOString().split('T')[0],  // tomorrow's date as a default value
    "startTime": "10:10:00",
    "endTime": "10:40:00",
    "recurrence": "weekly",
    "recurrence_interval": 1,
    "recurrence_count": 4,
    "recurrenceByDay": "FR",
    "options": [
        "Apple",
        "Google",
        "iCal",
        "Outlook.com",
        "Microsoft 365",
        "Microsoft Teams"
    ],
    "timeZone": "currentBrowser",
    "location": "web",
    "buttonStyle": "date",
    "size": 15,
    "lightMode": "bodyScheme",
    "description": "[p][strong]提醒：你订阅的时间已到[/strong] 你订阅的朋友 [u]已经[/u] 上线! 🚀[/p][p]💻 [em]点击链接来访问:[/em][br]&rarr; [url]https://eac.aaron404.com/"
}

const AddToCalendarCard = () => {
    const [isEditing, setIsEditing] = useState(false);
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const [message, setMessage] = useState('');
    const [eventsData, setEventsData] = useState([]);
    const [isNewEvent, setIsNewEvent] = useState(false);

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await axios.get(`${config.DJ_END}/eac/api/get-event/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setEventsData(response.data);
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };

        fetchEventData();
    }, []);

    const handleEditClick = (index) => {
        setIsEditing(index);
    };
    const handleDeleteClick = async (index) => {
        try {
            await axios.delete(`${config.DJ_END}/eac/api/delete-event/${eventsData[index].id}/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            // After successful deletion, remove this event from state
            const updatedEvents = [...eventsData];
            updatedEvents.splice(index, 1);
            setEventsData(updatedEvents);
        } catch (error) {
            console.error('Error deleting event data:', error);
        }
    };

    const handleSave = (index, newEventData, message) => {
        const updatedEvents = [...eventsData];
        if (index === -1) { // it's a new event
            updatedEvents.push(newEventData);
        } else { // it's an existing event
            updatedEvents[index] = newEventData;
        }
        setEventsData(updatedEvents);
        setMessage(message);
        setIsEditing(false);
        setIsNewEvent(false);
    };

    const handleNewEventClick = () => { // Step 2
        setIsNewEvent(true);
        setIsEditing(-1);
    };
    return (
        <div className="p-6 my-4 bg-white rounded-lg shadow-xl w-full md:max-w-md lg:max-w-lg text-center">
            {eventsData.map((eventData, index) => (
                <div key={eventData.id} className="relative"> {/* Wrap each event in a relative positioned div */}
                    <div className="action-buttons absolute top-2 right-2 flex gap-2"> {/* Wrap your buttons inside this div */}
                        <button className="hover:bg-sky-600 hover:text-white hover:p-1 text-gray-500 border-2 rounded-4xl font-bold"
                                onClick={() => handleEditClick(index)}>
                            <FaEdit/>
                        </button>
                        <button className="hover:bg-red-600 text-gray-500 hover:p-1 hover:text-white border-2 rounded-4xl font-bold"
                                onClick={() => handleDeleteClick(index)}>
                            <FaTrash/>
                        </button>
                    </div>
                    <div className="flex flex-col justify-evenly text-center border-solid border-t-2 pt-2 ">
                        {isEditing === index ? (
                            <EventEdit eventId={eventData.id} eventData={eventData} onSave={(newData, msg) => handleSave(index, newData, msg)}/>
                        ) : (
                            <div className="flex flex-col items-center justify-between space-x-1 sm:space-x-10 mb-2 sm:mb-0">
                                <div className="py-2 text-sm text-gray-500">{username}：{eventData.name}</div>
                                <div className="flex flex-row items-center">
                                    <AddToCalendarButton {...eventData} />
                                </div>
                                {message && <div className="alert">{message}</div>}
                            </div>
                        )}
                    </div>
                </div>
            ))}
            {isNewEvent ? ( // Step 3
                <EventEdit eventData={defaultEventData} onSave={(newData, msg) => handleSave(-1, newData, msg)}/>
            ) : (
                <button className="bg-sky-400 text-white font-bold mt-4 px-12 py-2 text-xl"
                onClick={handleNewEventClick}>
                Add Event<GiLoveMystery className="inline-block text-rose-500 text-3xl ml-6"/>
                </button>
            )}


        </div>
    );
};

export default AddToCalendarCard;
