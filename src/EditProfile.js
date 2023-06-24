import React, {useState, useEffect} from "react";
import {AiOutlineUser, AiOutlineMail, AiFillPicture, AiOutlineInfoCircle} from "react-icons/ai"; // import necessary icons
import {FaTransgender, FaCalendar} from "react-icons/fa";
import config from "./config";
import {BsFillCalendarFill} from 'react-icons/bs';
import ProfileBio from "./ProfileComponents/ProfileBio";
import {FaArrowRight} from 'react-icons/fa';
import {AiOutlineArrowRight} from "react-icons/ai";

const EditProfile = () => {
    const [profileData, setProfileData] = useState({
        username: "",
        avatar: null,
        bio: "",
        gender: "",
        birthday: "",
    });
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${config.DJ_END}/eac/api/user-profile/`, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            setProfileData((prevData) => ({
                ...prevData,
                username: data.username,
                bio: data.bio,
                gender: data.gender,
                birthday: data.birthday,
                avatar: data.avatar,
            }));
        }
    };

    const handleChange = (event) => {
        const value =
            event.target.name === "avatar"
                ? event.target.files[0]
                : event.target.value;
        setProfileData({
            ...profileData,
            [event.target.name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        Object.entries(profileData).forEach(([key, value]) => {
            // Only append the avatar if it's a File
            if (key === "avatar" && value instanceof File) {
                formData.append(key, value);
            } else if (key !== "avatar" && value !== null) { // Handle other fields
                formData.append(key, value);
            }
        });
        const token = localStorage.getItem("token");
        const response = await fetch(`${config.DJ_END}/eac/api/update-profile/`, {
            method: "PUT",
            headers: {
                Authorization: `Token ${token}`,
            },
            body: formData,
        });

        if (response.ok) {
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
        } else {
            const errorData = await response.json();
            console.log(errorData);
            const errorMessages = Object.values(errorData).flat();
            setErrorMessage(errorMessages || "Failed to update profile");
            setTimeout(() => {
                setErrorMessage("");
            }, 4000);

        }


    };

    return (
        <div className="flex flex-col items-start mt-2 px-4 text-xl lg:items-center lg:text-lg">
            <form onSubmit={handleSubmit} className="w-full lg:max-w-lg mx-auto">
                <div className="my-8 lg:mb-4 text-xl lg:text-2xl">
                    <label className="block">
                        <div className="flex justify-center items-center">
                            <AiOutlineUser className="text-sky-500"/>
                            <AiOutlineArrowRight className="text-sky-500"/>
                            <span className="text-slate-700">{profileData.username}</span>
                        </div>
                    </label>

                </div>
                <div className="flex justify-center mb-10 lg:mb-8">
                    <div className="relative w-2/3 my-4">
                        <div className="absolute left-0 w-full h-0.5 bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-white w-0.5"></div>
                        </div>
                    </div>
                </div>


                <div className="mb-8 lg:mb-10">

                    <label className="block flex items-center flex-col">
                        {profileData.avatar && (
                            <img className="rounded-full w-20 h-20 lg:w-36 lg:h-36"
                                 src={`${config.DJ_END}${profileData.avatar}`} alt={profileData.username}/>
                        )}
                        <label
                            className="mt-2 px-14 lg:py-2  bg-sky-500  rounded-lg shadow-md cursor-pointer  flex items-center"
                        >
                            <AiFillPicture className="mr-2  text-white lg:text-xl"/>

                            <input
                                type="file"
                                name="avatar"
                                onChange={handleChange}
                                className="hidden" // Hide the default file input
                            />
                        </label>
                    </label>

                </div>
                <div className="mb-8 lg:my-4 rounded-2xl shadow-xl">
                    <label className="block">
                        <div className="flex items-center mb-3">
                            <AiOutlineInfoCircle className="mr-4 lg:mr-5 text-sky-500"/>
                            <span className="text-sky-300  lg:texl-xl">Bio:</span>
                        </div>
                        <textarea
                            name="bio"
                            value={profileData.bio}
                            onChange={handleChange}
                            placeholder="Tell something about yourself"
                            className="mt-1 block w-full text-slate-700 bg-sky-50 lg:h-32"
                            rows="3"
                        ></textarea>
                    </label>
                </div>
                <div className="mb-8 lg:my-4 rounded-2xl shadow-xl">
                    <label className="block mb-4">
                        <div className="flex items-center mb-3">
                            <FaTransgender className="mr-4 lg:mr-5 text-sky-500"/>
                            <span className="text-sky-300  lg:texl-xl">Gender:</span>
                        </div>
                        <select
                            name="gender"
                            value={profileData.gender}
                            onChange={handleChange}
                            className="mt-1 block w-full bg-sky-300 lg:h-12 text-white lg:text-2xl"
                        >
                            <option value="">Select...</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="O">Other</option>
                        </select>
                    </label>
                </div>
                <div className="mb-8 lg:mb-4 rounded-2xl shadow-xl">

                    <label className="block">
                        <div className="flex items-center mb-1">
                            <BsFillCalendarFill className="mr-4 my-2 lg:mr-5 text-sky-500"/>
                            <span className="text-sky-300 text-2xl lg:texl-xl">Birth:</span>
                        </div>
                        <input
                            type="date"
                            name="birthday"
                            value={profileData.birthday}
                            onChange={handleChange}
                            className="mt-1 block w-full bg-sky-300 lg:h-12 text-white lg:text-2xl"
                        />
                    </label>
                </div>
                {
                    showSuccessMessage && <div
                        className="bg-sky-500 text-white h-8 lg:h-16 mt-16 flex justify-center items-center text-center mb-2  lg:text-lg">Profile
                        updated successfully</div>
                }
                {
                    errorMessage && <div
                        className="bg-red-500 text-white h-8 lg:h-16 mt-16 flex justify-center items-center text-center mb-2  lg:text-lg">{errorMessage}</div>
                }

                <input
                    type="submit"
                    value="Save"
                    className="py-4 px-4 h-16 lg:h-16 mt-2 lg:mt-10 font-semibold text-white bg-sky-500 rounded-lg shadow-md hover:bg-sky-700 w-full lg:text-2xl"
                />
            </form>
        </div>

    );
};

export default EditProfile;
