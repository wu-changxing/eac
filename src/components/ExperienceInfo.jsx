import React, { useState } from 'react';
import { BsStarFill } from 'react-icons/bs';
import { RiArrowUpSLine } from 'react-icons/ri';

const ExperienceInfo = () => {
    const exp = localStorage.getItem('exp');
    const level = localStorage.getItem('level');
    const levels = [
        { level: 1, name: "等级 1", experience: 20 },
        { level: 2, name: "等级 2", experience: 200 },
        { level: 3, name: "等级 3", experience: "?" },
        { level: 4, name: "等级 4", experience: "?" },
        { level: 5, name: "等级 5", experience: "?" },
    ];

    return (
        <div className="bg-white p-4 rounded shadow-md">
            <div className="my-4">
                我的当前经验值： <p className="text-lg text-sky-600">{exp}</p>
                我的当前等级： <p className="text-lg text-sky-600">{level}</p>
            </div>
            <div className="flex items-center mb-4">
                <RiArrowUpSLine className="text-4xl text-green-500 mr-2" />
                <p className="text-lg text-gray-800">
                    经验越多，你的等级将会提升，解锁更多的功能和特权。
                </p>
            </div>
            <div className="flex items-center mb-4">
                <BsStarFill className="text-yellow-500 text-3xl mr-2" />
                <h2 className="text-2xl font-bold text-gray-800">用户经验</h2>
            </div>
            <div className="mb-4">
                {levels.map((level) => (
                    <div className="flex items-center mb-2" key={level.level}>
                        <div className={`w-10 h-10 rounded-full bg-${level.level === 1 ? "green" : level.level === 2 ? "blue" : level.level === 3 ? "purple" : level.level === 4 ? "yellow" : "red"}-500 flex items-center justify-center text-white`}>
                            {level.level}
                        </div>
                        <div className="ml-4">
                            <p className="font-medium text-lg text-gray-800">{level.name}</p>
                            <p className="text-gray-600">所需经验：{level.experience}</p>
                        </div>
                    </div>
                ))}
            </div>



            <div className="mt-4">
                <div className="font-medium text-lg mb-2">获取经验的方法：</div>
                <div className="flex flex-col space-y-2">
                    <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                            <span className="text-2xl">1</span>
                        </div>
                        <div className="ml-2">
                            <span className="font-medium text-gray-800">创建房间：</span>
                            <span className="text-gray-600 block">创建房间，并在房间内签到获取2经验</span>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                            <span className="text-2xl">2</span>
                        </div>
                        <div className="ml-2">
                            <span className="font-medium text-gray-800">签到：</span>
                            <span className="text-gray-600 block">个人主页签到获取2经验</span>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                            <span className="text-2xl">3</span>
                        </div>
                        <div className="ml-2">
                            <span className="font-medium text-gray-800">赠送礼物：</span>
                            <span className="text-gray-600 block">赠送礼物获取相应的经验数目</span>
                            <span className="text-gray-600 block">该功能目前只对歌手开放</span>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                            <span className="text-2xl">4</span>
                        </div>
                        <div className="ml-2 flex-col">
                            <span className="font-medium text-gray-800">收取礼物：</span>
                            <span className="text-gray-600 block">收取礼物获取相应的经验数目</span>
                            <span className="text-gray-600 block">该功能目前只对歌手开放</span>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default ExperienceInfo;
