import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AddToCalendarButton } from 'add-to-calendar-button-react';
import { FaLevelUpAlt, FaMedal, FaRegCalendarAlt } from 'react-icons/fa';
import config from './config';
import getRandomBackgroundImage from './HomePageComponents/RandomBackgroundImage';

const EventsWaterfall = () => {
    const [events, setEvents] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const token = localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        if (isLoading) {
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(
                `${config.DJ_END}/eac/api/get-all-events/?page=${page}`,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );
            const data = await response.json();
            console.log('response.data.results:', data.results);
            setEvents((prevEvents) => [...prevEvents, ...data.results]);
            if (data.results.length >= 20) {
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
            setHasMore(false);
        }
        setIsLoading(false);
    };

    const getLevelColor = (level) => {
        switch (level) {
            case 1:
                return 'bg-green-500';
            case 2:
                return 'bg-blue-500';
            case 3:
                return 'bg-purple-500';
            case 4:
                return 'bg-yellow-500';
            case 5:
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div className="p-4 flex justify-center">
            <InfiniteScroll
                dataLength={events.length}
                next={loadEvents}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p className="text-center text-gray-500">
                        <b>No more events</b>
                    </p>
                }
            >
                {events.map((event, index) => (
                    <div
                        key={event.id}
                        className="bg-white rounded-xl shadow-lg overflow-hidden mx-auto my-4"
                    >
                        <div
                            className="h-48 bg-cover bg-center rounded-t-xl"
                            style={{
                                backgroundImage: `url(${getRandomBackgroundImage()})`,
                            }}
                        ></div>
                        <div className="px-6 py-3">
                            <div className="flex items-center mb-3">
                                <img
                                    className="h-12 w-12 rounded-full mr-3"
                                    src={`${config.DJ_END}${event.user_profile.avatar}`}
                                    alt={event.user_profile.user.username}
                                />
                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-900">
                                        {event.user_profile.user.username}
                                    </h3>
                                    <div className="flex items-center mt-2">
                                        {event.user_profile.badge ? (
                                            <div className="flex items-center text-sm text-white bg-pink-500 shadow-sm shadow-sky-700 rounded-full px-2 py-1">
                                                <FaMedal className="mr-1" />
                                                {event.user_profile.badge.name}
                                            </div>
                                        ) : (
                                            <div className="rounded-full py-1 px-2 bg-gray-100 text-xs font-semibold text-gray-800">
                                                No Badge
                                            </div>
                                        )}
                                        <div
                                            className={`rounded-full py-1 px-2  ${getLevelColor(
                                                event.user_profile.level
                                            )} text-xs font-semibold text-white ml-2`}
                                        >
                                            <FaLevelUpAlt />
                                            lv{event.user_profile.level}
                                        </div>
                                        <div className="rounded-full py-1 px-2 bg-gray-200 text-xs font-semibold text-gray-800 ml-2">
                                            {event.user_profile.exp}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h2 className="text-xl font-bold mb-2">{event.name}</h2>
                            <p className="text-gray-700 text-base mb-4">
                                <FaRegCalendarAlt className="inline-block mr-1 mb-1" />
                                {event.startDate} -> {event.startTime} - {event.endTime}
                            </p>
                            <AddToCalendarButton
                                buttonsList
                                hideTextLabelButton
                                name={event.name}
                                description={event.description}
                                startDate={event.startDate}
                                startTime={event.startTime}
                                endTime={event.endTime}
                                timeZone={event.timeZone}
                                location={event.location}
                                options="'Apple','Google','iCal','Outlook.com','Microsoft365'"
                            />
                        </div>
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default EventsWaterfall;
