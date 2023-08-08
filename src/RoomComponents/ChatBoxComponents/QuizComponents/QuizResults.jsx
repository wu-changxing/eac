import React from 'react';
import ResultsTable from './ResultsTable';
import ScoresChart from './ScoresChart';
import {FaTimes} from "react-icons/fa";

const QuizResults = ({ results, onClose }) => {
    // Ensure results is an array before processing
    if (!results || !Array.isArray(results.stats)) {
        return <div>No results available.</div>;
    }

    console.log('results', results);

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Quiz Results</h2>
                <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
                    <FaTimes className="h-5 w-5" />
                </button>
            </div>
            <ScoresChart scores={results.scores} stats={results.stats} />
            <ResultsTable stats={results.stats} />
        </div>
    );
};

export default QuizResults;
