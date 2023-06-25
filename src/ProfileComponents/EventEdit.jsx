// src/ProfileComponents/EventEdit.jsx
import React, {useState} from 'react';
import {FaSave, FaClock, FaRedo, FaListUl, FaRegCalendarAlt} from 'react-icons/fa';
import {AiOutlineFieldNumber} from 'react-icons/ai';
import {MdEventNote, MdAccessTime, MdTimer, MdDescription, MdLocationOn} from 'react-icons/md';
import {LuTimerOff} from 'react-icons/lu';
import {BsRepeat1} from 'react-icons/bs';

const daysOfWeek = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
import axios from 'axios';
import config from '../config';

const EventEdit = ({eventId=null, eventData, onSave}) => {
    const {
        name,
        startDate,
        startTime,
        endTime,
        recurrence,
        recurrence_interval,
        recurrence_count,
        recurrence_byDay,
        location,
        description
    } = eventData;

    const [editName, setEditName] = useState(name);
    const [editStartDate, setEditStartDate] = useState(startDate);
    const [editStartTime, setEditStartTime] = useState(startTime);
    const [editEndTime, setEditEndTime] = useState(endTime);
    const [editRecurrence, setEditRecurrence] = useState(recurrence);
    const [editRecurrenceInterval, setEditRecurrenceInterval] = useState(
        recurrence_interval
    );
    const [editRecurrenceCount, setEditRecurrenceCount] = useState(
        recurrence_count
    );
    const [editRecurrenceByDay, setEditRecurrenceByDay] = useState(
        recurrence_byDay ? recurrence_byDay.split(",") : []
    );
    const [editLocation, setEditLocation] = useState(location);
    const [editDescription, setEditDescription] = useState(description);


    console.log("eventData is: ", eventData)
    const handleSave = async () => {
        let newEventData = {
            ...eventData,
            name: editName ? editName : name,
            startDate: editStartDate ? editStartDate : startDate,
            startTime: editStartTime ? editStartTime : startTime,
            endTime: editEndTime ? editEndTime : endTime,
            recurrence: editRecurrence ? editRecurrence : recurrence,
            recurrence_interval: editRecurrenceInterval ? editRecurrenceInterval : recurrence_interval,
            recurrence_count: editRecurrenceCount ? editRecurrenceCount : recurrence_count,
            recurrence_byDay: editRecurrenceByDay.length > 0 ? editRecurrenceByDay.join(",") : recurrence_byDay,
            location: editLocation ? editLocation : location,
            description: editDescription ? editDescription : description
        };

        // Check if calendarType field exists and if not, set it to default options
        if (!newEventData.options || newEventData.options.length === 0) {
            newEventData.options = ['Apple', 'Google', 'iCal', 'Outlook.com', 'Microsoft 365', 'Microsoft Teams'];
        }

        console.log("newEventData is: ", newEventData)
        try {
            if (eventId) { // If ID exists, we update (PUT request)
                await axios.put(`${config.DJ_END}/eac/api/update-event/${eventData.id}/`, newEventData, {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`,
                    },
                });
            } else { // If no ID, we create a new event (POST request)
                const response = await axios.post(`${config.DJ_END}/eac/api/save-event/`, newEventData, {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`,
                    },
                });
                console.log(response);  // Add this line
                // Update the id of newEventData with the id returned from the server
                newEventData.id = response.data.id;
            }


            onSave(newEventData, 'Event saved successfully!');
        } catch (error) {
            console.error('Error saving event data:', error);
        }
    };


    const toggleDay = day => {
        const copy = [...editRecurrenceByDay];
        if (copy.includes(day)) {
            copy.splice(copy.indexOf(day), 1);
        } else {
            copy.push(day);
        }
        setEditRecurrenceByDay(copy);
    };

    return (
        <div className="mb-2 sm:mb-0 space-y-4">
            <div className="flex items-center border-2 rounded-lg border-gray-200 focus-within:border-sky-500">
                <MdEventNote className="m-2 text-sky-500"/>
                <input
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    className="w-full p-2 focus:outline-none"
                    placeholder="Event Name"
                />
            </div>

            <div className="flex items-center border-2 rounded-lg border-gray-200 focus-within:border-sky-500">
                <FaRegCalendarAlt className="m-2 text-sky-500"/>
                <input
                    type="date"
                    value={editStartDate}
                    onChange={e => setEditStartDate(e.target.value)}
                    className="w-full p-2 focus:outline-none"
                    placeholder="Start Date"
                />
            </div>

            <div className="flex items-center border-2 rounded-lg border-gray-200 focus-within:border-sky-500">
                <MdAccessTime className="m-2 text-sky-500"/>
                <input
                    value={editStartTime}
                    onChange={e => setEditStartTime(e.target.value)}
                    className="w-full p-2 focus:outline-none"
                    placeholder="Start Time (hh:mm)"
                />
            </div>

            <div className="flex items-center border-2 rounded-lg border-gray-200 focus-within:border-sky-500">
                <LuTimerOff className="m-2 text-sky-500"/>
                <input
                    value={editEndTime}
                    onChange={e => setEditEndTime(e.target.value)}
                    className="w-full p-2 focus:outline-none"
                    placeholder="End Time (hh:mm)"
                />
            </div>

            <div className="flex hidden items-center border-2 rounded-lg border-gray-200 focus-within:border-sky-500">
                <FaRedo className="m-2 text-sky-500"/>
                <input
                    value={editRecurrence}
                    onChange={e => setEditRecurrence(e.target.value)}
                    className="w-full p-2 focus:outline-none"
                    placeholder="Recurrence"
                />
            </div>

            <div className=" flex hidden items-center border-2 rounded-lg border-gray-200 focus-within:border-sky-500">
                <FaListUl className="m-2 text-sky-500"/>
                <input
                    value={editRecurrenceInterval}
                    onChange={e => setEditRecurrenceInterval(e.target.value)}
                    className="w-full p-2 focus:outline-none"
                    placeholder="Recurrence Interval"
                />
            </div>

            <div className="flex items-center border-2 rounded-lg border-gray-200 focus-within:border-sky-500">
                <BsRepeat1 className="m-2 text-sky-500"/>
                <input
                    value={editRecurrenceCount}
                    onChange={e => setEditRecurrenceCount(e.target.value)}
                    className="w-full p-2 focus:outline-none"
                    placeholder="Recurrence Count"
                />
            </div>

            <div className="flex items-center border-2 rounded-lg border-gray-200 focus-within:border-sky-500">
                <MdLocationOn className="m-2 text-sky-500"/>
                <input
                    value={editLocation}
                    onChange={e => setEditLocation(e.target.value)}
                    className="w-full p-2 focus:outline-none"
                    placeholder="Location"
                />
            </div>

            <div className="flex items-center border-2 rounded-lg border-gray-200 focus-within:border-sky-500">
                <MdDescription className="m-2 text-sky-500"/>
                <textarea
                    value={editDescription}
                    onChange={e => setEditDescription(e.target.value)}
                    className="w-full py-4 h-24 focus:outline-none"
                    placeholder="Description"
                />
            </div>

            <div
                className="flex flex-wrap justify-center border-2 rounded-lg border-gray-200 focus-within:border-sky-500">
                {daysOfWeek.map(day => (
                    <button
                        key={day}
                        className={`flex items-center border py-1 px-1 border-white ${
                            editRecurrenceByDay.includes(day)
                                ? "bg-cyan-400 text-white"
                                : "bg-white text-sky-500"
                        }`}
                        onClick={() => toggleDay(day)}
                    >
                        {day}
                    </button>
                ))}
            </div>

            <button
                onClick={handleSave}
                className="w-full p-2 text-white bg-sky-500 rounded-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-50"
            >
                <FaSave className="mx-auto"/>
                Save
            </button>
        </div>
    );
};

export default EventEdit;
