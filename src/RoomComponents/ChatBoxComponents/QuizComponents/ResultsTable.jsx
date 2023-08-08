import React from 'react';
import { FaRegUser, FaRegCheckCircle, FaRegTimesCircle, FaRegQuestionCircle ,} from 'react-icons/fa';
import {RiUserStarFill} from "react-icons/ri";
import {SlBadge} from "react-icons/si";
import {HiCheckBadge} from "react-icons/hi2";
import {BsFillTrophyFill} from "react-icons/bs";
import {FiTarget} from "react-icons/fi";
const ResultsTable = ({ stats }) => {
    return (
        <div className="overflow-x-auto my-8">
            <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg">
                <thead className="bg-sky-500">
                <tr>
                    <th scope="col" className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">
                        Item
                    </th>
                    <th scope="col" className="px-6 py-3 text-xl font-medium text-white uppercase tracking-wider">
                        <FiTarget />
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium text-white uppercase tracking-wider">
                        <BsFillTrophyFill className="texl-3xl" />
                    </th>
                    <th scope="col" className="px-6 py-3 text-xl font-medium text-white uppercase tracking-wider">
                        <HiCheckBadge/>
                    </th>
                    <th scope="col" className="px-6 py-3 text-xl font-medium text-white uppercase tracking-wider">
                        <FaRegTimesCircle />
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">
                       comnon wrong answer
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {stats.map((result, index) => (
                    <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">{result.item}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{result.answer}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{result.correct_users.join(', ')}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {result.correct} {result.correct > 0 && <span className="text-green-500">✅</span>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {result.incorrect} {result.incorrect > 0 && <span className="text-red-500">❌</span>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{result.most_wrong_answer}❌</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultsTable;
